/**
 * Samruddhi Setu - In-Browser AI Produce Quality Scanner (real ONNX inference)
 *
 * Loads ./models/produce_quality_model.onnx with onnxruntime-web and runs
 * genuine client-side inference — no network round-trip, no server.
 *
 * Two model shapes are supported automatically (inspected from the loaded
 * model's input metadata, so either kind can be dropped into models/
 * without touching this file):
 *   - [1, 7]            -> lightweight color/blemish/skin-tone feature-vector
 *                          model (the model shipped by default; see
 *                          python/train_onnx_model.py). Includes a 4th
 *                          "Invalid Input" class that rejects human/selfie
 *                          and other non-produce photos.
 *   - [1, 3, 224, 224]   -> full image-tensor CNN (e.g. a MobileNetV3 you
 *                          fine-tuned yourself; see
 *                          python/colab_notebook_guide.md)
 *
 * If ONNX Runtime or the model file isn't available (e.g. it hasn't been
 * generated/committed yet), this falls back to a transparent rule-based
 * color/blemish heuristic so the scanner still returns a usable grade —
 * that fallback is clearly labeled as a heuristic, not billed as AI.
 */

class OnnxAgriScanner {
  constructor() {
    this.session = null;
    this.modelLoaded = false;
    this.modelInputMode = null; // "features" | "image" | null
    this.modelPath = "./models/produce_quality_model.onnx";
    this.classNames = [
      "Grade A+ (Export Premium)",
      "Grade A (Fresh Retail Domestic)",
      "Grade B (Processing & Juicing)",
      "Invalid Input (Not Produce Detected)"
    ];
    this.INVALID_CLASS_INDEX = 3;
    this.readyPromise = this.initOnnxSession();
  }

  async initOnnxSession() {
    if (typeof ort === "undefined") {
      console.warn("onnxruntime-web (ort) not found on this page — include ort.min.js before onnx-ai-scanner.js. Using heuristic fallback.");
      return;
    }
    try {
      console.log("ONNX Runtime Web detected. Loading produce quality model...");
      this.session = await ort.InferenceSession.create(this.modelPath, {
        executionProviders: ["wasm"]
      });

      const inputMeta = this.session.inputNames && this.session.inputNames[0]
        ? this.session.inputMetadata?.[this.session.inputNames[0]]
        : null;
      const dims = inputMeta?.dims || this.guessDimsFromSession();

      if (dims && dims.length === 4) {
        this.modelInputMode = "image";
      } else {
        // Default to the feature-vector path (covers [1,5] and any
        // runtime that doesn't expose shape metadata).
        this.modelInputMode = "features";
      }

      this.modelLoaded = true;
      console.log(`✓ ONNX produce quality model loaded (input mode: ${this.modelInputMode}).`);
    } catch (e) {
      console.log("No trained ONNX model found at " + this.modelPath + " — using rule-based heuristic fallback instead. Run python/train_onnx_model.py to generate one.", e.message);
      this.modelLoaded = false;
    }
  }

  guessDimsFromSession() {
    try {
      const name = this.session.inputNames[0];
      return this.session.inputMetadata[name].dims;
    } catch (e) {
      return null;
    }
  }

  /**
   * Classic RGB skin-tone detection heuristic (widely used in real-time
   * face/hand detectors before deep learning). Real per-pixel math, not a
   * guess — used here to flag "a person is in this photo" rather than
   * produce.
   */
  isSkinTonePixel(r, g, b) {
    const maxC = Math.max(r, g, b);
    const minC = Math.min(r, g, b);
    return (
      r > 95 && g > 40 && b > 20 &&
      (maxC - minC) > 15 &&
      Math.abs(r - g) > 15 &&
      r > g && r > b
    );
  }

  /** Extract the 7 hand-engineered color/texture features from a canvas. */
  extractFeatures(canvas, ctx) {
    const targetSize = canvas.width;
    const imgData = ctx.getImageData(0, 0, targetSize, targetSize);
    const pixels = imgData.data;

    let rTotal = 0, gTotal = 0, bTotal = 0;
    let brightnessTotal = 0;
    let blemishPixels = 0;
    let skinPixels = 0;
    let saturationTotal = 0;
    let totalSampled = 0;

    for (let i = 0; i < pixels.length; i += 16) { // Sample grid
      const r = pixels[i];
      const g = pixels[i + 1];
      const b = pixels[i + 2];
      const brightness = (0.299 * r + 0.587 * g + 0.114 * b);

      rTotal += r;
      gTotal += g;
      bTotal += b;
      brightnessTotal += brightness;
      totalSampled++;

      // Detect dark spots / blemish discoloration
      if (brightness < 45 || (r > 150 && g < 40 && b < 40 && brightness < 80)) {
        blemishPixels++;
      }

      // Detect human skin tone (used to reject selfies / hands-in-frame)
      if (this.isSkinTonePixel(r, g, b)) {
        skinPixels++;
      }

      // HSV saturation: how vivid vs. washed-out/grayscale this pixel is
      const maxC = Math.max(r, g, b);
      const minC = Math.min(r, g, b);
      saturationTotal += maxC === 0 ? 0 : (maxC - minC) / maxC;
    }

    return {
      avgR: rTotal / totalSampled,
      avgG: gTotal / totalSampled,
      avgB: bTotal / totalSampled,
      brightness: brightnessTotal / totalSampled,
      blemishRatio: blemishPixels / totalSampled,
      skinRatio: skinPixels / totalSampled,
      saturation: saturationTotal / totalSampled
    };
  }

  /** Build a normalized [1,3,224,224] CHW tensor for an image-tensor CNN. */
  buildImageTensor(canvas, ctx) {
    const size = canvas.width; // assumed 224
    const { data } = ctx.getImageData(0, 0, size, size);
    const mean = [0.485, 0.456, 0.406];
    const std = [0.229, 0.224, 0.225];
    const chw = new Float32Array(3 * size * size);
    const plane = size * size;

    for (let p = 0; p < plane; p++) {
      const r = data[p * 4] / 255;
      const g = data[p * 4 + 1] / 255;
      const b = data[p * 4 + 2] / 255;
      chw[p] = (r - mean[0]) / std[0];
      chw[plane + p] = (g - mean[1]) / std[1];
      chw[2 * plane + p] = (b - mean[2]) / std[2];
    }
    return new ort.Tensor("float32", chw, [1, 3, size, size]);
  }

  softmax(arr) {
    const max = Math.max(...arr);
    const exps = arr.map(v => Math.exp(v - max));
    const sum = exps.reduce((a, b) => a + b, 0);
    return exps.map(v => v / sum);
  }

  /** Turn a predicted class + confidence into the display report object. */
  buildResultFromClass(classIdx, confidence, features) {
    const blemishRatio = features ? features.blemishRatio : 0;
    const configs = [
      {
        grade: this.classNames[0],
        gradeClass: "grade-aplus",
        shelfLife: "10-14 Days",
        blemishIndex: "Near Zero (< 0.5%)",
        priceMultiplier: 1.25,
        recommendation: "Prime quality with superior shelf-life. Command top 20-30% premium over standard mandi price."
      },
      {
        grade: this.classNames[1],
        gradeClass: "grade-a",
        shelfLife: "5-8 Days",
        blemishIndex: "Low (2% - 5%)",
        priceMultiplier: 1.0,
        recommendation: "Healthy fresh harvest suitable for immediate household and restaurant consumption."
      },
      {
        grade: this.classNames[2],
        gradeClass: "grade-b",
        shelfLife: "2-4 Days",
        blemishIndex: "Moderate (~8%)",
        priceMultiplier: 0.85,
        recommendation: "Recommended for bulk food processing, pulp making, or quick wholesale liquidation."
      },
      {
        grade: this.classNames[3],
        gradeClass: "grade-invalid",
        shelfLife: "N/A",
        blemishIndex: "N/A",
        priceMultiplier: 0,
        recommendation: "This doesn't look like a produce photo — a person or unrelated object was detected instead. Please upload a clear, well-lit photo of the actual crop/produce item."
      }
    ];

    const cfg = configs[classIdx] ?? configs[1];
    const isValid = classIdx !== this.INVALID_CLASS_INDEX;
    const freshnessScore = isValid
      ? Math.max(60, Math.min(99, Math.round(75 + confidence * 24 - blemishRatio * 20)))
      : null;

    return {
      isValid,
      grade: cfg.grade,
      gradeClass: cfg.gradeClass,
      freshnessScore,
      blemishIndex: cfg.blemishIndex,
      shelfLife: cfg.shelfLife,
      priceMultiplier: cfg.priceMultiplier,
      recommendation: cfg.recommendation,
      modelConfidence: Math.round(confidence * 100)
    };
  }

  /** Pure rule-based fallback (used only if no ONNX model could be loaded). */
  heuristicGrade(features) {
    const { avgR, avgG, blemishRatio, skinRatio, saturation } = features;

    // Reject non-produce photos before ever assigning a grade: a strong
    // skin-tone signature (selfie/hand-in-frame) or a washed-out/grayscale
    // image (screenshot, document, random object) is not a produce photo.
    if (skinRatio > 0.35 || saturation < 0.12) {
      return this.buildResultFromClass(this.INVALID_CLASS_INDEX, 0.75, features);
    }

    let classIdx;
    if (blemishRatio < 0.04 && (avgR > 90 || avgG > 90)) {
      classIdx = 0;
    } else if (blemishRatio >= 0.04 && blemishRatio < 0.12) {
      classIdx = 1;
    } else {
      classIdx = 2;
    }
    // Fake but bounded "confidence" just for score-scaling purposes on this path.
    return this.buildResultFromClass(classIdx, 0.7, features);
  }

  /**
   * Analyze produce image using ONNX inference (if the model loaded) or a
   * transparent color/blemish heuristic fallback.
   * @param {HTMLImageElement|HTMLCanvasElement|File} imageSource
   * @param {string} cropCategory e.g. 'Tomato', 'Onion', 'Grapes', 'Milk', 'Apple', 'General'
   */
  async scanProduceQuality(imageSource, cropCategory = "General") {
    await this.readyPromise;

    return new Promise((resolve) => {
      let img;
      if (imageSource instanceof File || imageSource instanceof Blob) {
        img = new Image();
        img.src = URL.createObjectURL(imageSource);
      } else if (typeof imageSource === "string") {
        img = new Image();
        img.crossOrigin = "anonymous";
        img.src = imageSource;
      } else {
        img = imageSource;
      }

      img.onload = async () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const targetSize = 224; // Standard PyTorch/ONNX input dimension
        canvas.width = targetSize;
        canvas.height = targetSize;
        ctx.drawImage(img, 0, 0, targetSize, targetSize);

        const features = this.extractFeatures(canvas, ctx);
        let scanResult;
        let usedModel = false;

        if (this.modelLoaded && this.session) {
          try {
            let feeds;
            const inputName = this.session.inputNames[0];

            if (this.modelInputMode === "image") {
              feeds = { [inputName]: this.buildImageTensor(canvas, ctx) };
            } else {
              const vec = new Float32Array([
                features.avgR / 255,
                features.avgG / 255,
                features.avgB / 255,
                features.blemishRatio,
                features.brightness / 255,
                features.skinRatio,
                features.saturation
              ]);
              feeds = { [inputName]: new ort.Tensor("float32", vec, [1, vec.length]) };
            }

            const outputMap = await this.session.run(feeds);
            const outputName = this.session.outputNames[0];
            const logits = Array.from(outputMap[outputName].data);
            const probs = this.softmax(logits);
            const classIdx = probs.indexOf(Math.max(...probs));
            scanResult = this.buildResultFromClass(classIdx, probs[classIdx], features);
            usedModel = true;
          } catch (inferErr) {
            console.warn("ONNX inference failed, using heuristic fallback:", inferErr.message);
            scanResult = this.heuristicGrade(features);
          }
        } else {
          scanResult = this.heuristicGrade(features);
        }

        resolve({
          success: true,
          cropCategory,
          usedModel,
          analysisMethod: usedModel ? "ONNX Neural Model" : "Rule-Based Heuristic (no trained model loaded)",
          ...scanResult,
          colorMetrics: {
            redDominance: Math.round((features.avgR / 255) * 100),
            greenFreshness: Math.round((features.avgG / 255) * 100),
            clarity: Math.round((features.brightness / 255) * 100),
            skinToneSignature: Math.round(features.skinRatio * 100),
            saturation: Math.round(features.saturation * 100)
          },
          timestamp: new Date().toISOString(),
          previewUrl: canvas.toDataURL("image/jpeg", 0.85)
        });
      };

      img.onerror = () => {
        resolve({
          success: false,
          usedModel: false,
          analysisMethod: "Fallback (image failed to load)",
          grade: "Grade A (Default)",
          gradeClass: "grade-a",
          freshnessScore: 85,
          shelfLife: "6-8 Days",
          blemishIndex: "Unknown",
          priceMultiplier: 1.0,
          recommendation: "Could not analyze this image. Please try a clearer, well-lit photo."
        });
      };
    });
  }
}

// Attach to window
window.agriScanner = new OnnxAgriScanner();

/**
 * Samruddhi Setu - Google Gemini AI Agricultural & Coastal Advisory Service
 * Powered directly by Google AI Studio Gemini API (gemini-3.6-flash / gemini-3.5-flash-lite)
 */

class GeminiAgriService {
  constructor() {
    this.apiKey = this.loadStoredApiKey();
    // Current-generation models as of the July 2026 Gemini 3.x GA lineup,
    // tried in order. gemini-2.5-flash / gemini-2.5-flash-lite were closed
    // to new users when Google shipped Gemini 3.6 Flash and Gemini 3.5
    // Flash-Lite to general availability on 2026-07-21 — see
    // https://ai.google.dev/gemini-api/docs/changelog for the live list.
    this.preferredModels = ["gemini-3.6-flash", "gemini-3.5-flash-lite"];
    this.activeModel = "gemini-3.6-flash";
    this.conversationHistory = [];

    this.systemPrompt = `You are AgriMitra (कृषि-मित्र), an empathetic, expert agricultural scientist, marine economist, and direct-trade advisor for the Samruddhi Setu platform.
Your mission:
1. Empower farmers & coastal producers to maximize net earnings by selling directly and utilizing nearby cooperative societies (>50kg consignments).
2. Deliver actionable agronomic & aquaculture advice: pest diagnosis, organic remedies, soil health, and marine cold-chain handling.
3. Guide on government schemes (PM-KISAN, PMFBY, PM-KUSUM, PMMSY, AIF) with practical eligibility rules and step-by-step application guidance.
4. Assist consumers with food freshness grading, seasonal farm produce advice, storage tips, and fair-price Mandi comparison.
5. Provide cold-chain and temperature instructions (e.g. 2°C–4°C for dairy/vegetables, -18°C for marine catch).

Tone & Language:
- Warm, practical, scientifically accurate, and encouraging.
- Always detect and respond in the language used by the user (Hindi, English, Tamil, Telugu, Kannada, Marathi, Bengali).
- Format responses cleanly with bold key points, bullet lists, and clear summaries.`;

    this.isListening = false;
    this.recognition = null;
    this.initSpeechRecognition();
  }

  loadStoredApiKey() {
    // No hardcoded default key here. The string that used to live in this
    // spot ("AQ.Ab8RN6I7...") was NOT a valid Google AI Studio / Gemini API
    // key — real Gemini keys always start with "AIzaSy" and are 39
    // characters long. That fake value looked like a Google OAuth token
    // fragment instead, so every request made with it was rejected by
    // Google with an "API key not valid" (400) error, which is why the AI
    // Studio chat kept failing and silently falling back to the offline
    // knowledge base.
    //
    // Baking a real key into the source is also a security risk (anyone who
    // views the page source or a public copy of this repo could read and
    // use it against your Google account's quota), so instead the app
    // relies entirely on the in-app "🔑 AI Studio Key" field, which stores
    // the key only in the local browser's storage.
    return (
      localStorage.getItem("AQ.Ab8RN6LwDXXKkDrla33sP_NsAG93jAYfAZnYNK7DvpiQLpxMMg") ||
      localStorage.getItem("AQ.Ab8RN6LwDXXKkDrla33sP_NsAG93jAYfAZnYNK7DvpiQLpxMMg") ||
      localStorage.getItem("AQ.Ab8RN6LwDXXKkDrla33sP_NsAG93jAYfAZnYNK7DvpiQLpxMMg") ||
      ""
    ).trim();
  }

  setApiKey(key) {
    this.apiKey = (key || "").trim();
    localStorage.setItem("agrisetu_gemini_api_key", this.apiKey);
    localStorage.setItem("gemini_api_key", this.apiKey);
    localStorage.setItem("samruddhisetu_gemini_api_key", this.apiKey);
    return this.apiKey;
  }

  getApiKey() {
    return this.apiKey || this.loadStoredApiKey();
  }

  hasApiKey() {
    const k = this.getApiKey();
    return !!k && k.length > 10;
  }

  /**
   * Validates an API key against Google AI Studio's models-list endpoint —
   * a free, lightweight call that confirms the key is real and active
   * without spending a generation request. Returns a clear success/failure
   * result the UI can show immediately when the user pastes a key, instead
   * of only finding out it's bad on the first chat message.
   */
  async testApiKey(keyToTest) {
    const key = (keyToTest || this.getApiKey() || "").trim();
    if (!key) {
      return { valid: false, message: "No API key provided." };
    }

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
      if (response.ok) {
        const data = await response.json();
        const modelCount = Array.isArray(data.models) ? data.models.length : 0;
        return {
          valid: true,
          message: `✅ Key is valid — ${modelCount} Gemini models available to this key.`
        };
      }
      const errJson = await response.json().catch(() => ({}));
      const msg = errJson.error?.message || `HTTP ${response.status} ${response.statusText}`;
      return { valid: false, message: `❌ Key rejected by Google AI Studio: ${msg}` };
    } catch (networkErr) {
      return { valid: false, message: `⚠️ Could not reach Google AI Studio: ${networkErr.message}` };
    }
  }

  clearHistory() {
    this.conversationHistory = [];
  }

  initSpeechRecognition() {
    if (typeof window !== "undefined" && ("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
    }
  }

  startVoiceInput(onResultCallback, onErrorCallback) {
    if (!this.recognition) {
      onErrorCallback && onErrorCallback("Voice recognition is not supported in this browser.");
      return;
    }

    const currentLang = window.i18n ? window.i18n.getLanguage() : "en";
    const langMap = {
      en: "en-IN",
      hi: "hi-IN",
      ta: "ta-IN",
      te: "te-IN",
      kn: "kn-IN",
      mr: "mr-IN",
      bn: "bn-IN"
    };

    this.recognition.lang = langMap[currentLang] || "en-IN";

    this.recognition.onstart = () => {
      this.isListening = true;
    };

    this.recognition.onresult = (event) => {
      this.isListening = false;
      const transcript = event.results[0][0].transcript;
      onResultCallback && onResultCallback(transcript);
    };

    this.recognition.onerror = (event) => {
      this.isListening = false;
      onErrorCallback && onErrorCallback(event.error);
    };

    this.recognition.onend = () => {
      this.isListening = false;
    };

    try {
      this.recognition.start();
    } catch (e) {
      console.warn("Speech recognition start warning:", e);
    }
  }

  speakResponse(text) {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const cleanText = text.replace(/[*#_`]/g, "").replace(/<[^>]*>/g, "");
      const utterance = new SpeechSynthesisUtterance(cleanText);
      const currentLang = window.i18n ? window.i18n.getLanguage() : "en";
      const langMap = {
        en: "en-IN",
        hi: "hi-IN",
        ta: "ta-IN",
        te: "te-IN",
        kn: "kn-IN",
        mr: "mr-IN",
        bn: "bn-IN"
      };
      utterance.lang = langMap[currentLang] || "en-IN";
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  }

  /**
   * Sends user prompt to Google AI Studio Gemini API with model fallback
   */
  async sendQuery(userMessage) {
    const key = this.getApiKey();

    if (!key) {
      // Return helpful message guiding user to enter Google AI Studio Key
      return {
        success: false,
        source: "missing_key",
        text: `🔑 **Google AI Studio API Key Required**\n\nTo chat live with Gemini AI, please provide your API key from Google AI Studio:\n1. Open [Google AI Studio (aistudio.google.com)](https://aistudio.google.com/app/apikey) and copy your free Gemini API key.\n2. Click the **"🔑 AI Studio Key"** button at the top of this chat or in **Settings** to paste it.\n\n*Meanwhile, here is an initial answer from our offline agronomic knowledge base:* \n\n${this.getOfflineAgriResponse(userMessage).text}`
      };
    }

    // Build conversation contents conforming to Gemini REST API specs
    const contents = [];
    
    // Add prior turn history
    for (const msg of this.conversationHistory.slice(-8)) {
      contents.push({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.text }]
      });
    }

    // Add current user turn
    contents.push({
      role: "user",
      parts: [{ text: userMessage }]
    });

    let lastErrorMessage = "";

    // Try models in cascade: gemini-3.6-flash -> gemini-3.5-flash-lite
    for (const modelName of this.preferredModels) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${key}`;

        const payload = {
          system_instruction: {
            parts: [{ text: this.systemPrompt }]
          },
          contents: contents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1200
          }
        };

        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          const data = await response.json();
          const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text;

          if (replyText) {
            this.activeModel = modelName;
            // Record history
            this.conversationHistory.push({ role: "user", text: userMessage });
            this.conversationHistory.push({ role: "model", text: replyText });

            return {
              success: true,
              text: replyText,
              source: "gemini_live",
              model: modelName
            };
          }
        }

        const errJson = await response.json().catch(() => ({}));
        lastErrorMessage = errJson.error?.message || `HTTP ${response.status} ${response.statusText}`;

        // If it's a 404 (model not found), try the next model
        if (response.status === 404) {
          console.warn(`Model ${modelName} returned 404, trying next available model...`);
          continue;
        }

        // If it's an authentication or quota error (400, 401, 403), break and report clearly
        if (response.status === 400 || response.status === 401 || response.status === 403) {
          break;
        }
      } catch (networkErr) {
        lastErrorMessage = networkErr.message || "Network error";
      }
    }

    // Return explicit error message with AI Studio key instructions
    return {
      success: false,
      source: "gemini_error",
      text: `⚠️ **Google AI Studio API Notice:**\n${lastErrorMessage}\n\n*Please verify your API key at [aistudio.google.com](https://aistudio.google.com/app/apikey) or update it via the 🔑 button above.*\n\n---\n\n*Offline Agronomic Knowledge Answer:* \n${this.getOfflineAgriResponse(userMessage).text}`
    };
  }

  getOfflineAgriResponse(query) {
    const q = query.toLowerCase();
    const currentLang = window.i18n ? window.i18n.getLanguage() : "en";

    // 1. Cooperative Societies & > 50kg Policy
    if (q.includes("coop") || q.includes("society") || q.includes("50") || q.includes("सहकारी") || q.includes("सोसायटी")) {
      return {
        success: true,
        source: "agri_knowledge_base",
        text: `🏛️ **Cooperative Societies (>50kg Rule) Guidelines:**\n\n• **Harvest > 50 kg:** You can choose to pool through nearby cooperatives (e.g. Sahyadri Co-op in Nashik, Karnal Dairy Union, Gulf of Mannar Marine Co-op) to access refrigerated cold storage and bulk institutional buyer contracts.\n• **Direct Option:** You can also sell directly to consumers on the marketplace without a society.\n• **Apex Hub:** You can inspect member farmers and toggle produce sales status in the [Societies Directory](admin.html).`
      };
    }

    // 2. Tomato & Vegetable Diseases
    if (q.includes("tomato") || q.includes("blight") || q.includes("टमाटर") || q.includes("झुलसा") || q.includes("leaf curl")) {
      if (currentLang === "hi") {
        return {
          success: true,
          source: "agri_knowledge_base",
          text: `🌱 **टमाटर की फसल सलाह एवं रोग निदान:**\n\n1. **अगेती/पिछेती झुलसा:** पत्तियों पर भूरे-काले धब्बे दिखने पर कॉपर ऑक्सीक्लोराइड (2.5g/L) या नीम का तेल (5ml/L) का छिड़काव करें।\n2. **पत्ता मरोड़ विषाणु (Leaf Curl):** पीले चिपचिपे ट्रैप लगाएं तथा सफेद मक्खी नियंत्रण हेतु इमिडाक्लोप्रिड (0.5ml/L) का प्रयोग करें।\n3. **उचित मूल्य सुझाव:** आज का मंडी भाव ₹38/किलो है। सेतु पर ₹28/किलो रखने पर 35% अधिक शुद्ध मुनाफा प्राप्त होगा।`
        };
      }
      return {
        success: true,
        source: "agri_knowledge_base",
        text: `🌱 **Tomato Crop Advisory & Health Diagnosis:**\n\n1. **Early & Late Blight:** Spray Copper Oxychloride (2.5g/L) or organic Neem oil spray (5ml/L) in early morning hours.\n2. **Leaf Curl Virus:** Vectors are whiteflies; install yellow sticky traps (10/acre) and apply Imidacloprid (0.5ml/L) if threshold exceeds.\n3. **Direct Fair Pricing:** Average retail mandi rate is ₹38/kg. Direct listing at ₹28/kg delivers 35% higher net farm profit.`
      };
    }

    // 3. Government Schemes & Subsidies
    if (q.includes("scheme") || q.includes("subsidy") || q.includes("pm kisan") || q.includes("योजना") || q.includes("सब्सिडी") || q.includes("pmfby")) {
      return {
        success: true,
        source: "agri_knowledge_base",
        text: `🏛️ **Key Government Agriculture Schemes & Subsidies:**\n\n1. **PM-KISAN:** ₹6,000/year direct financial support in 3 bank installments for landholding families.\n2. **PM Fasal Bima Yojana (PMFBY):** Comprehensive crop loss shield with nominal 1.5%–2% farmer premium.\n3. **PM-KUSUM:** Up to 60% government subsidy for solar irrigation pumps.\n4. **Agriculture Infrastructure Fund (AIF):** 3% interest subvention up to ₹2 Crore for on-farm cold rooms and sorting units.`
      };
    }

    // 4. Dairy & Livestock
    if (q.includes("milk") || q.includes("dairy") || q.includes("cow") || q.includes("दूध") || q.includes("गाय")) {
      return {
        success: true,
        source: "agri_knowledge_base",
        text: `🐄 **Dairy & Livestock Management Advisory:**\n\n1. **Mastitis Prevention:** Post-milking teat dip with 0.5% povidone-iodine. Keep cows standing for 30 minutes after milking.\n2. **Boosting Fat & SNF:** Provide balanced 60:40 green-to-dry fodder with 50g chelated mineral mixture daily.\n3. **Cold-Chain Preservation:** Chill milk to 4°C within 2 hours of milking to retain Grade A+ purity.`
      };
    }

    // 5. Default General Response
    return {
      success: true,
      source: "agri_knowledge_base",
      text: `🌱 **Hello! I am AgriMitra, your AI Agricultural & Market Advisor.**\n\nI can assist you with:\n• **Crop & Marine Diagnostics:** Pests, organic remedies, soil fertility, and cattle care.\n• **Direct Fair Pricing:** Pricing insights to eliminate middleman markups.\n• **Cooperative Societies:** How to aggregate >50kg lots for cold storage and collective bargaining.\n• **Govt Subsidies:** PM-KISAN, PMFBY, solar pump grants, and AIF loans.\n\n*Tip: Connect your Google AI Studio Gemini API key to enable live AI reasoning across any language!*`
    };
  }
}

// Global Singleton
window.geminiService = new GeminiAgriService();
window.geminiAgriService = window.geminiService;
window.geminiAgriService = window.geminiService;

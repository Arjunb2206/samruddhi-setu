# Upgrade Path: Training a Real Photo-Based CNN in Google Colab

The model shipped in `models/produce_quality_model.onnx` (built by
`train_onnx_model.py`) is a small, genuinely-trained neural net — but it
learns from 5 hand-engineered color/blemish numbers extracted from the photo
in the browser, not from the raw pixels themselves. That's an honest,
fast, ~1KB model that runs anywhere, but it can only be as good as the
color/blemish heuristic it was distilled from.

If you have (or can label) a real dataset of produce photos — e.g. a few
hundred images per grade, gathered from your own farmers/cooperatives, or a
labeled public set such as Kaggle's "Fruit and Vegetable Disease" or
"Fresh and Rotten Classification" datasets — you can fine-tune a real
image-based CNN instead. This guide trains on **actual photos**, not just
color statistics.

---

## Step 1: Open Google Colab

1. Go to [Google Colab](https://colab.research.google.com/).
2. Create a new notebook and set the runtime to **GPU** (`Runtime` -> `Change runtime type` -> `T4 GPU`).

---

## Step 2: Install dependencies

```python
!pip install torch torchvision onnx onnxruntime pillow
```

---

## Step 3: Arrange your dataset

Upload a folder structured like this (standard `ImageFolder` layout — each
sub-folder name becomes a class), e.g. as a zip you extract in Colab:

```
produce_dataset/
  grade_a_plus/   # Export/Premium quality photos
    img001.jpg
    img002.jpg
  grade_a/        # Fresh domestic retail quality photos
    img001.jpg
  grade_b/        # Processing/juicing grade photos
    img001.jpg
```

Aim for at least 100–200 labeled images per class to get a meaningful
fine-tune; more (and more varied lighting/backgrounds) is always better.

---

## Step 4: Fine-tune MobileNetV3 on your labeled photos

This actually trains the classification head (and optionally unfreezes the
backbone) on your images — unlike exporting an untouched ImageNet backbone,
this produces weights that have genuinely learned to tell your grades apart.

```python
import torch
import torch.nn as nn
from torch.utils.data import DataLoader, random_split
from torchvision import datasets, models, transforms

DATA_DIR = "produce_dataset"
NUM_CLASSES = 3  # grade_a_plus, grade_a, grade_b (alphabetical -> ImageFolder order)
EPOCHS = 15
BATCH_SIZE = 32
DEVICE = "cuda" if torch.cuda.is_available() else "cpu"

train_transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.RandomHorizontalFlip(),
    transforms.RandomRotation(15),
    transforms.ColorJitter(brightness=0.15, contrast=0.15),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
])

full_dataset = datasets.ImageFolder(DATA_DIR, transform=train_transform)
print("Classes (alphabetical, matches output index order):", full_dataset.classes)

val_size = max(1, int(0.15 * len(full_dataset)))
train_ds, val_ds = random_split(full_dataset, [len(full_dataset) - val_size, val_size])
train_loader = DataLoader(train_ds, batch_size=BATCH_SIZE, shuffle=True)
val_loader = DataLoader(val_ds, batch_size=BATCH_SIZE)

model = models.mobilenet_v3_small(weights=models.MobileNet_V3_Small_Weights.DEFAULT)
in_features = model.classifier[3].in_features
model.classifier[3] = nn.Sequential(nn.Dropout(p=0.2), nn.Linear(in_features, NUM_CLASSES))
model = model.to(DEVICE)

# Freeze the backbone first, train only the new head (fast + avoids overfitting on small datasets)
for name, param in model.named_parameters():
    param.requires_grad = name.startswith("classifier")

optimizer = torch.optim.Adam(filter(lambda p: p.requires_grad, model.parameters()), lr=1e-3)
criterion = nn.CrossEntropyLoss()

for epoch in range(EPOCHS):
    model.train()
    running_loss, correct, total = 0.0, 0, 0
    for images, labels in train_loader:
        images, labels = images.to(DEVICE), labels.to(DEVICE)
        optimizer.zero_grad()
        outputs = model(images)
        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()
        running_loss += loss.item() * images.size(0)
        correct += (outputs.argmax(1) == labels).sum().item()
        total += labels.size(0)

    model.eval()
    val_correct, val_total = 0, 0
    with torch.no_grad():
        for images, labels in val_loader:
            images, labels = images.to(DEVICE), labels.to(DEVICE)
            val_correct += (model(images).argmax(1) == labels).sum().item()
            val_total += labels.size(0)

    print(f"epoch {epoch+1}/{EPOCHS}  loss={running_loss/total:.4f}  "
          f"train_acc={correct/total:.3f}  val_acc={val_correct/max(1,val_total):.3f}")
```

Watch `val_acc` — if it's not climbing meaningfully above chance (33% for 3
classes), you likely need more/cleaner labeled images before this beats the
lightweight default model.

---

## Step 5: Export to ONNX

```python
model.eval().cpu()
dummy_input = torch.randn(1, 3, 224, 224, requires_grad=False)

torch.onnx.export(
    model,
    dummy_input,
    "produce_quality_model.onnx",
    export_params=True,
    opset_version=14,
    do_constant_folding=True,
    input_names=["input_image"],
    output_names=["quality_logits"],
    dynamic_axes={"input_image": {0: "batch_size"}, "quality_logits": {0: "batch_size"}},
)
print("Exported produce_quality_model.onnx")
```

`js/onnx-ai-scanner.js` inspects the model's input shape at load time: a
`[1, 5]` input runs the feature-vector path (the shipped default model);
a `[1, 3, 224, 224]` input runs the full image-tensor path automatically —
so you can drop either kind of model into `models/` without changing any
JS. Make sure your `full_dataset.classes` order printed above matches
`Grade A+, Grade A, Grade B` (rename/reorder your folders if not).

---

## Step 6: Deploy

1. Download `produce_quality_model.onnx` from Colab's file browser.
2. Replace `models/produce_quality_model.onnx` in this repo with it.
3. Commit and push — GitHub Actions redeploys automatically (see the main
   [README](../README.md#-how-to-deploy-using-github-actions-step-by-step-guide)).

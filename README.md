# Samruddhi Setu (समुद्री सेतु) – Direct Agricultural & Coastal Platform

## 📱 Live Application
- **Website :** https://\<your-username\>.github.io/\<your-repo-name\>/
- **Repository :** https://github.com/\<your-username\>/\<your-repo-name\>

*(Replace the placeholders above with your actual GitHub username and repo name once you've deployed — see the Deployment section below.)*

## 🎯 What It Does
Samruddhi Setu is a direct-to-consumer agricultural & coastal marine platform that:

- Connects farmers and coastal producers directly with consumers, cutting out middlemen
- Routes produce over 50 kg through nearby cooperative societies for pooled cold-chain aggregation, or lets farmers sell independently
- Grades produce freshness/quality in-browser using a real ONNX computer-vision model
- Gives farmers, consumers, and logistics partners a live dispatch and delivery view on an interactive map
- Answers farming, government-scheme, and cold-chain questions through a multilingual AI assistant (AgriMitra)
- Runs a full order lifecycle — cart, checkout (Razorpay test mode or Cash on Delivery), dispatch, and delivery — with live status sync

## 🛠️ Technologies Used

### 1. Firebase (Firestore + Storage)
- Cloud Firestore – shared, real-time NoSQL database for cooperatives, users, products, orders, and forums
- Firebase Storage – hosts farmer-uploaded produce photos when live mode is connected
- **Local Reactive Firestore fallback** – if no live Firebase project is configured, the app runs entirely on `localStorage` with the same API shape, so it works out of the box with zero setup

### 2. Google Gemini (Google AI Studio)
- Powers **AgriMitra**, the in-app AI advisor, via `js/gemini-service.js`
- Tries `gemini-3.5-flash` → `gemini-2.5-flash` → `gemini-2.5-flash-lite` in order
- Built-in **Test Key** button validates a pasted key against the live API before saving it

### 3. ONNX Runtime Web
- Client-side produce quality scanner (`js/onnx-ai-scanner.js`) that runs real inference against `models/produce_quality_model.onnx` — no server round-trip
- Falls back to a clearly-labeled rule-based heuristic only if the model file is missing

### 4. Other Technologies & Services
- Leaflet.js – live delivery/dispatch map on the Logistics Dashboard
- Razorpay Checkout (Test Mode) – simulated online payments in the consumer marketplace
- GitHub Pages – free static hosting

## 💻 Technical Stack

### Frontend
- HTML5 – page structure across every screen (landing, dashboards, marketplace, admin)
- CSS3 (`css/style.css`) – shared stylesheet, theming, and animations
- Vanilla JavaScript – all logic, interactivity, and Firebase/Gemini/ONNX integration (no framework/build step)
- `js/i18n.js` – multilingual UI strings (English, Hindi, Tamil, Telugu, Kannada, Marathi, Bengali)

### Backend & Database
- Firebase v10 (compat SDK) – Firestore + Storage, no custom backend server needed
- Firestore real-time listeners (`onSnapshot`) – live order/status updates without a page refresh
- Dual-mode data layer (`js/firebase-config.js`) – automatically switches between live Firestore and local demo storage based on whether a real config is saved

### Map & Logistics
- Leaflet.js – reefer truck / EV bike delivery map on `logistics-dashboard.html`

### State Management
- `SamruddhiAuth` (in `js/app.js`) – session/role guard, persists the active user in `localStorage` and redirects by role (farmer / consumer / logistics / admin)
- `SamruddhiCart` (in `js/app.js`) – shopping cart synced across pages via `localStorage`
- Firestore / local reactive store – all persistent app data (users, products, orders, cooperatives, forums)

## 🏗️ Architecture

```
User → Frontend (HTML/CSS/JS) → firebase-config.js (Live Firestore OR Local Reactive Store)
                                        ↓
                         Real-time Firestore listeners / local listeners
                                        ↓
                         Role-based dashboards (Farmer / Consumer / Logistics / Admin)
```

Flow:
1. User picks a role on `onboarding.html`, then registers or logs in
2. `SamruddhiAuth` stores the active session and redirects to the right dashboard
3. Dashboards load cooperative, product, and order data from Firestore (or local storage in demo mode)
4. Farmers list produce (auto-routed through a cooperative if > 50 kg); consumers browse, cart, and checkout
5. Orders sync live to the Logistics Dashboard for dispatch, and back to Consumer Orders for status tracking

## 📁 Project Structure

```
samruddhi-setu/
├── index.html                  # Landing page + Settings modal (Firebase/Gemini keys)
├── onboarding.html              # Role selection (Farmer / Consumer / Logistics)
├── login.html                   # Sign in
├── register.html                # Create account (role-specific forms)
├── farmer-dashboard.html        # 🌾 Farmer produce listing, stock, schemes, forums
├── consumer-marketplace.html    # 🛒 Household + bulk marketplace, cart, checkout
├── consumer-orders.html         # 📦 Order tracking & cancellation
├── consumer-analytics.html      # 📊 Consumer spend & savings analytics
├── logistics-dashboard.html     # 🚚 Fleet dispatch, live map, delivery status
├── payment-history.html         # 💳 Payment/order history
├── admin.html                   # 🏛️ Cooperative society directory & governance
├── profile.html                 # My Profile (Firestore read/write)
├── seed.html                    # 🌱 Database seeder (populates Firestore/local store)
├── js/firebase-config.js        # 🔑 Dual-mode data layer (Live Firestore + Local Reactive Store)
├── js/gemini-service.js         # 🤖 AgriMitra AI assistant (Gemini API)
├── js/onnx-ai-scanner.js        # 🔬 ONNX produce quality scanner
├── js/razorpay-checkout.js      # 💳 Test-mode payment sheet
├── js/i18n.js                   # 🌐 Multilingual strings
├── js/app.js                    # Shared session, cart, toast, and dashboard helpers
├── css/style.css                # Complete shared stylesheet
├── models/produce_quality_model.onnx   # Trained quality-grading model
├── python/train_onnx_model.py   # Script to retrain the ONNX model
├── firestore.rules              # Firestore security rules (demo: open read/write)
├── storage.rules                # Storage security rules (demo: open read/write)
└── README.md                    # This file
```

## 🔐 Features

### User System
- Role-based registration (Farmer / Consumer / Logistics) with dynamic form fields per role
- Session persisted across all pages via `SamruddhiAuth`
- Automatic redirect to the right dashboard on login/register, and back to the landing page on sign-out
- Profile management (name, contact, location, bank/UPI details)

> **Note:** Login/Register is backed by real **Firebase Authentication** (email + password). Sign-up creates a Firebase Auth account and a matching Firestore `users` profile document keyed by that account's `uid`; login authenticates against Firebase Auth, then loads the profile. If no live Firebase project is configured, the app falls back to an equivalent local (`localStorage`) auth adapter so the demo still works with zero backend setup — see "Connecting Live Firebase" below.

### Farmer Tools
- List produce with photos, AI-assisted quality grading, and auto-detected selling channel:
  - **≤ 50 kg** → Direct retail sale
  - **> 50 kg** → Choice of cooperative-pooled cold chain or independent direct sale
- Track stock, orders, government schemes, and community forums

### Consumer Marketplace
- Toggle between household retail and bulk/commercial buying
- Fair-price Mandi comparison, cart, and checkout (Razorpay test mode or Cash on Delivery)
- Order tracking and spend analytics

### Logistics Dispatch
- Live Leaflet map of pickups/deliveries
- Reefer temperature tracking and route waypoints
- Order status updates synced in real time to consumers

### Cooperative Admin Hub
- Directory of registered cooperative societies with cold storage, fleet, and scheme details
- Real-time toggle for produce lot sales status (Available / Sold Out)

### AgriMitra AI Assistant
- Multilingual chat (7 Indian languages) with voice input via the Web Speech API
- Agronomic, cold-chain, and government-scheme guidance
- In-app key testing before saving your Google AI Studio key

## 🚀 Deployment

Hosted On: GitHub Pages

Steps to Deploy:
1. Push this code to your GitHub repository
2. Go to **Repository → Settings → Pages**
3. Under **Build and deployment → Source**, select **Deploy from a branch**, then pick the `main` branch and `/ (root)` folder
4. Save — your site is live at `https://<your-username>.github.io/<your-repo-name>/`
5. Visit `.../seed.html` and click **Click to Seed Database** to populate cooperatives, products, and demo orders

### Connecting Live Firebase (optional but recommended)
By default the app runs on a local, zero-config data store (`localStorage`) so it works instantly with no setup. To share data across every visitor's device instead:
1. Open **Settings** on the landing page (`index.html`)
2. Paste your Firebase Web App config (API Key, Project ID, Auth Domain, Storage Bucket, Messaging Sender ID, App ID) — all 6 fields are required to activate live mode
3. In the [Firebase Console](https://console.firebase.google.com/), create a Firestore database and paste in the rules from [`firestore.rules`](firestore.rules); do the same for Storage using [`storage.rules`](storage.rules)
4. Re-run the seeder at `seed.html` so your live project has starting data

**Security note:** `firestore.rules` now scopes `users/{uid}` writes to `request.auth.uid` (each person can only create/edit their own profile), and every other collection requires a signed-in Firebase Authentication user to write, while reads stay open for public browsing (marketplace, cooperative directory, etc.). `storage.rules` still ships with open access — review and tighten it the same way (e.g. restrict uploads to `request.auth != null`) before a real production launch.

### Connecting AgriMitra (Gemini)
Get a free key from [Google AI Studio](https://aistudio.google.com/app/apikey), then paste it into the **Add Key** panel on the AI chat widget (or the Settings modal) and click **Test** to confirm it's valid. Keys are stored per-browser in `localStorage`, not committed to source — this keeps your key out of your public GitHub repository, which matters because a key embedded in site source can be read and reused by anyone visiting the page.

## 🔗 Navigation Flow

```
onboarding.html
       ↓
login.html / register.html
       ↓ (session stored via SamruddhiAuth)
   ┌───────────────┬──────────────────────┬─────────────────────┐
farmer-dashboard   consumer-marketplace    logistics-dashboard    admin.html
       │                    │                       │
       └── Firestore: products / orders / cooperatives / users ──┘
```

## 📊 Data Model

### Firestore Collections
| Collection | Description |
|---|---|
| `users` | User profiles — role, contact, location, bank/UPI details |
| `cooperatives` | Cooperative society directory, capacity, and schemes |
| `products` | Direct & cooperative-channel produce listings |
| `bulkProducts` | Bulk/commercial lots for wholesale buyers |
| `orders` | Consumer orders, status, and payment method |
| `schemes` | Government scheme reference data shown to farmers |
| `forums` | Farmer community forum posts |

## 🌐 Browser Support
- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge

## 🔮 Future Enhancements
- Phone/OTP-based Firebase Authentication as an alternative to email/password
- Firebase Cloud Messaging for order/dispatch push notifications
- Photo-based CNN upgrade for the ONNX produce scanner (`python/colab_notebook_guide.md`)
- Server-side Razorpay order creation + signature verification for real payments
- Admin controls for scheme and cooperative data management

## Credits

Technologies:
- Firebase v10 by Google (Firestore + Storage)
- Google Gemini (Google AI Studio) for AgriMitra
- ONNX Runtime Web for on-device produce grading
- Leaflet.js for interactive maps
- Razorpay Checkout (Test Mode)
- GitHub Pages for hosting

---

Maintained by:
- https://github.com/\<your-username\>

# Samruddhi Setu (समुद्री सेतु) – Direct Agricultural & Coastal Platform

## 📱 Live Application
- **Website :** https://arjunb2206.github.io/samruddhi-setu
- **Repository :** https://github.com/Arjunb2206/samruddhi-setu


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
├── index.html                  # Landing page + Settings modal 
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
├── profile.html                 # My Profile 
├── seed.html                    # 🌱 Database seeder 
├── js/firebase-config.js        # 🔑 Dual-mode data layer 
├── js/gemini-service.js         # 🤖 AgriMitra AI assistant 
├── js/onnx-ai-scanner.js        # 🔬 ONNX produce quality scanner
├── js/razorpay-checkout.js      # 💳 Test-mode payment sheet
├── js/i18n.js                   # 🌐 Multilingual strings
├── js/app.js                    # Shared session, cart, toast, and dashboard helpers
├── css/style.css                # Complete shared stylesheet
├── models/produce_quality_model.onnx   # Trained quality-grading model
├── python/train_onnx_model.py   # Script to retrain the ONNX model 
└── README.md                    # This file
```

## 🔐 Features

### User System
- Role-based registration (Farmer / Consumer / Logistics) with dynamic form fields per role
- Session persisted across all pages via `SamruddhiAuth`
- Automatic redirect to the right dashboard on login/register, and back to the landing page on sign-out
- Profile management (name, contact, location, bank/UPI details)

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
- Real Firebase Authentication behind Login/Register (replacing the current client-side session demo)
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

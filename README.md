# KrishiRakshak AI — Smart Farming Assistant for Karnataka

> **"Identify Early. Protect Crops. Discover Farmer Benefits."**  
> An agricultural technology web application designed for Karnataka farmers to identify crop leaf diseases, adopt safe crop protection measures, and navigate government agricultural assistance schemes in both **Kannada (ಕನ್ನಡ)** and **English**.

---

## 🌾 Project Architecture & Overview

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        KrishiRakshak AI Client                        │
│          (React 19, TypeScript, Tailwind CSS, Lucide Icons)            │
└──────────────────┬─────────────────────────────────┬───────────────────┘
                   │                                 │
     User Actions: Leaf Photo                  Scheme Questionnaire,
       & Diagnosis Request                       History & Advisories
                   │                                 │
                   ▼                                 ▼
┌───────────────────────────────────┐    ┌───────────────────────────────┐
│       Node.js / Express API       │    │     Local Browser Storage     │
│       `POST /api/analyze-crop`     │    │   (Non-sensitive history,     │
└──────────────────┬────────────────┘    │     offline farmer notes)     │
                   │                     └───────────────────────────────┘
                   ▼
┌──────────────────────────────────────────────┐
│  Gemini AI Multimodal Vision (`@google/genai`)│
│  - System Instructions: Distinguish observed │
│    symptoms vs inferred causes               │
│  - Never prescribe hazardous dosages         │
│  - Raitha Samparka Kendra (RSK) consultation │
│  - Offline illustrative fallback mode        │
└──────────────────────────────────────────────┘
```

---

## 🌟 Core Features

### 1. Crop Disease Detection (AI Crop Doctor)
- **Supported Crops**: Tomato (*Solanum lycopersicum*), Potato (*Solanum tuberosum*), and Maize (*Zea mays*).
- **Unsupported Crops Handling**: Explicit notification for uncalibrated crops to prevent misdiagnosis.
- **Image Validation**: Accepts JPEG, PNG, WebP up to 10MB; checks quality, blurriness, and leaf presence.
- **Scientific Diagnostic Output**:
  - Distinguishes directly observed visual symptoms from inferred pathogen causes.
  - Highlights whether an image is conclusive or inconclusive.
  - Safe cultural field sanitation and IPM bio-control measures (NSKE 5%, Trichoderma, yellow/blue traps).
  - Explicit warning never to apply hazardous chemicals without local Raitha Samparka Kendra (RSK) or KVK agronomist verification.
- **Offline / Educational Demo Mode**: Fully functional illustrative simulations for testing without an active API key.

### 2. Government Scheme Navigator
- **Verified Catalog**:
  - **PM-KISAN** (Income support ₹6,000/yr).
  - **PMFBY / Samrakshane** (Crop insurance and localized damage intimation).
  - **Karnataka Parihara** (Direct input subsidy for officially declared drought/flood taluks).
  - **Karnataka Krishi Bhagya** (Farm pond / Krishi Honda, pump set, and shade net subsidies).
  - **PMKSY Micro-Irrigation** (75% to 90% subsidy on Drip and Sprinkler systems in Karnataka).
  - **Karnataka Raitha Siri** (₹10,000/ha incentive for cultivating 6 notified millets).
  - **Kisan Credit Card (KCC)** (Low-interest crop loan with 0% interest up to ₹3 lakh in cooperative banks).
  - **PM-KMY** (Farmer old-age social security pension).
- **Farmer Eligibility Questionnaire**:
  - Asks only non-confidential agricultural parameters (District, Taluk, Crop, Land size, Insurance status, Damage type).
  - **Zero Sensitive Data**: NEVER asks for Aadhaar numbers, bank account credentials, OTPs, or passwords.
  - Computes Match Score %, transparent explanation of why it applies, unverified requirements, and missing documents checklist.

### 3. Comprehensive Kannada & English Localization
- Full dual-language interface (ಕನ್ನಡ / English) across all headers, cards, diagnostic outputs, alerts, checklists, and legal notices.
- Retains official scheme identifiers while providing plain Kannada explanations.

### 4. Firebase Authentication & Firestore Data Persistence
- **Secure Google Sign-In**: Integrated with Firebase Authentication to identify users.
- **Persistent Cloud Storage**: User crop screening records and saved schemes sync seamlessly to Firebase Firestore under `/users/{userId}/cropHistory`.
- **Hybrid Storage & Offline Cache**: Works in offline local storage mode for unregistered guests, and automatically syncs local screenings to the user's Firestore cloud account upon login.
- **Hardened Security Rules (`firestore.rules`)**: Deployed with default-deny, strict user-ownership validation (`request.auth.uid == userId`), and data boundary guards.

### 5. Google Maps Grounding (RSK & Mandi Locator)
- Grounded via **`gemini-3.5-flash`** with the **`googleMaps`** tool.
- Pinpoints real-world locations, addresses, landmarks, and navigation links for:
  - **Raitha Samparka Kendras (RSK)** in every Karnataka Hobli
  - **Krishi Vigyan Kendras (KVK)** and university plant pathology clinics
  - **APMC Mandis** (Agricultural Produce Market Committees)
  - Soil & water testing laboratories

### 6. Krishi Mitra AI Multi-Turn Chatbot
- **Conversational Agricultural Agent**: Fluent in Unicode Kannada and English.
- **Multi-Turn Chat History**: Preserves context across queries in a scrollable thread with quick-action prompt chips.
- **Model Task Routing**:
  - `gemini-3.5-flash`: General advisory and Google Maps grounded location search.
  - `gemini-3.1-flash-lite`: Fast-response agricultural Q&A and translation.
  - `gemini-3.1-pro-preview`: Complex agronomic calculations, soil nutrient balancing, and rotation schedules.
- **Grounding Metadata Chips**: Directly surfaces verified Google Maps links and place citations inside the chat stream.

### 5. Local Crop Alerts & Seasonal Advisories
- Research-backed educational advisories for Karnataka agro-climatic zones (e.g. Fall Armyworm in Maize, Early Blight in Tomato, Late Blight in Potato).
- Sourced from University of Agricultural Sciences (UAS) Dharwad, UAS Bangalore, and Karnataka Department of Agriculture packages of practices.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS, Lucide React icons.
- **Backend**: Express 4, Node.js, `tsx` runner with Vite middleware integration.
- **AI SDK**: `@google/genai` (v2.4.0) calling `gemini-3.8-flash` on the server-side.
- **Hosting / Preview Port**: Port 3000.

---

## 🚀 Setup & Local Execution

### 1. Prerequisites
- Node.js (version 20 or higher recommended).
- npm or pnpm.

### 2. Environment Configuration
Create a `.env` file in the project root (see `.env.example`):
```bash
GEMINI_API_KEY="your-google-gemini-api-key"
PORT=3000
```
> *Note*: If `GEMINI_API_KEY` is not provided, KrishiRakshak AI automatically operates in illustrative demonstration mode with scientifically curated Karnataka crop cases.

### 3. Installation
```bash
npm install
```

### 4. Running the Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:3000`.

### 5. Building for Production
```bash
npm run build
npm start
```

---

## 🧪 Testing Checklist

| Test Item | Status | Verification Detail |
|---|---|---|
| Application Startup | Passed | Full-stack server starts on port 3000 |
| Navigation Flow | Passed | Navigates across Home, Doctor, Schemes, Alerts, History, and IPM Tips |
| Language Switching | Passed | Instant toggle between Kannada (ಕನ್ನಡ) and English across all views |
| Image Upload & Validation | Passed | Rejects non-image types, enforces size bounds, generates instant preview |
| Crop Doctor Diagnosis | Passed | Distinguishes visual observations from inferred causes; provides safe IPM |
| Fallback Demo Mode | Passed | Clear illustrative disclaimer; no random or unvalidated predictions |
| Scheme Questionnaire | Passed | Calculates matching schemes with transparent criteria; zero Aadhaar asked |
| Local History | Passed | Persists in localStorage, supports field notes editing, print, and deletion |
| Progressive Web App & Offline Caching | Passed | Service worker caches core assets, scheme catalog, and Google fonts for rural low-connectivity areas; in-app install prompt enabled |
| Responsive Layout | Passed | Tested across mobile, tablet, and desktop viewports |

---

## ⚠️ Scientific Limitations & Safety Disclaimer

1. **Independent Advisory Tool**: KrishiRakshak AI is an independent software application and is **not an official government portal** of the Department of Agriculture, Government of Karnataka.
2. **Preliminary Visual Screening**: Computer vision leaf assessments cannot detect internal vascular bacterial infections or root nematodes. Never purchase or apply hazardous synthetic pesticides without on-site confirmation by a certified agricultural officer at your local **Raitha Samparka Kendra (RSK)**.
3. **Emergency Numbers**:
   - Kisan Call Centre: **1800-180-1551**
   - Karnataka Agriculture Department Helpline: **155251** / **080-22212861**

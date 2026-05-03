# CivicAI - Election Process Education

## Problem Statement Alignment
**Problem Statement:** Election Process Communication
**Goal:** To build a technology-driven solution that simplifies and clearly communicates the election process to citizens, promoting informed voter participation.

CivicAI perfectly aligns with this problem statement by providing:
1. **Interactive Voter Education:** A step-by-step Timeline breaking down the complex election cycle into easy-to-understand milestones.
2. **Actionable Resources:** A dedicated Resources hub with direct links to register, check status, and locate polling stations.
3. **Non-Partisan Guidance:** An AI Assistant powered by Google Gemini, heavily prompted to *only* provide objective, non-partisan educational facts about the voting process.
4. **Inclusive Communication:** Built-in Google Translate for multi-language support, ensuring the election process is communicated effectively to non-native speakers.
5. **Universal Accessibility:** Semantic HTML, ARIA landmarks, and high-contrast support to ensure voters with disabilities can access critical election information.

## Challenge Evaluation Focus Areas

### 1. Code Quality
- **Structure:** Modular React components organized logically (`components`, `pages`, `styles`).
- **Readability:** Clean, documented code utilizing modern ES6+ features and hooks.

### 2. Security
- **API Key Handling:** The Gemini API key is *never* hardcoded. Users must provide their own key via the Assistant page to ensure secure, client-side session storage only.
- **Input Sanitization:** User inputs and AI HTML outputs are sanitized using `DOMPurify` to prevent XSS attacks.

### 3. Efficiency
- **React Optimizations:** Fast client-side routing using `react-router-dom`.
- **Lightweight Animations:** `framer-motion` manages GPU-accelerated animations for a smooth 60fps experience.

### 4. Testing
- **Vitest Setup:** Unit tests are configured using Vitest and React Testing Library to ensure component reliability. Run them with `npm run test`.

### 5. Accessibility
- **Standards Compliant:** UI utilizes semantic HTML elements.
- **High Contrast Mode:** Native CSS `@media (prefers-contrast: high)` provides fallbacks for users requiring high contrast.

### 6. Google Services
- **Google GenAI SDK:** Meaningful integration of `@google/genai` to drive the core educational chat functionality of the app.

## How to Run Locally

### Prerequisites
- Node.js (v18+ recommended)
- A Google Gemini API Key

### Setup
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open the provided localhost link in your browser.
5. Navigate to the **"Ask AI"** page and enter your Gemini API key to interact with the assistant.

## Assumptions Made
- The evaluator has a valid Google Gemini API key to test the assistant functionality.
- The user is seeking general, non-partisan election information applicable in standard democratic processes.

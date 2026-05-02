# CivicAI - Election Process Education

## Overview
CivicAI is a smart, dynamic web assistant designed for the **Election Process Education** vertical. It empowers citizens by providing clear, accessible, and non-partisan information about the democratic process—from voter registration to Election Day.

This project was built to meet the rigorous standards of the submission challenge, focusing on code quality, security, efficiency, testing, accessibility, and meaningful integration of Google Services.

## Features
- **Smart Assistant (Powered by Google Gemini):** A conversational AI that provides non-partisan election information.
- **Interactive Timeline:** A beautifully animated guide to the election process.
- **Accessible Design:** High-contrast support, semantic HTML, and ARIA labels.
- **Glassmorphism UI:** A modern, dynamic user interface with fluid animations using Framer Motion.

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

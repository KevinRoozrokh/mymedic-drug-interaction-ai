# 🧠 MyMedic — AI-Powered Drug Interaction & Medical Assistant

> *A modern AI web app for safer medications and smarter health decisions.*
> ⚠️ **Disclaimer:** MyMedic is for educational purposes only. Always consult a licensed healthcare professional for medical advice.

---

**MyMedic** is an advanced AI-driven web application designed to revolutionize **drug safety** and **medication management** for patients, clinicians, and pharmacies.
Powered by **Google’s Gemini API**, it interprets prescriptions, identifies drug interactions, and delivers personalized medication insights through an intuitive chat interface.

🔗 **Live Demo:** [https://mymedic.dev/](https://mymedic.dev/) <br>
💡 **SEO Keywords:** AI drug interaction checker • Gemini AI medical app • prescription analyzer • medication comparison tool

---

## Table of Contents  
- [Features](#features)  
- [App Menu Overview](#app-menu-overview)  
- [Tech Stack](#tech-stack)  
- [Prerequisites](#prerequisites)  
- [Getting Started](#getting-started)  
- [License](#license)

---

## Features   
- Extensive medication knowledge base – search by brand or generic, view indications, side-effects, dose ranges, costs.  
- Side-by-side comparison of medications – compare efficacy, forms (tablet/injection), side-effect profiles and cost.  
- Interaction checker – identify possible drug-drug interactions, dietary/food conflicts and get mitigation guidance.  
- Natural-language chat assistant – ask questions like “Is Lipitor safe with metformin?” or “What are the side effects of lisinopril?” and get context-aware answers.  
- Personalized health profile – store allergies, current meds, BMI, and let the system tailor warnings/alerts accordingly.  
- Dark-mode first UI, mobile-friendly, offline bookmarks and smooth UX built for diverse users (patients, clinics, pharmacies).

---

## App Menu Overview  
Here are the main menu items in the application and what they do:

- **MyMedic** – Home dashboard with quick actions and recent activities.  
- **MyMedic Chat** – Converse with the AI assistant about medications and health questions.  
- **Dashboard** – Overview of your account: saved meds, recent interactions, bookmarks.  
- **Medications** – Browse/search the medication database and view detailed drug profiles.  
- **Compare** – Compare multiple medications side-by-side.  
- **Interaction Checker** – Select medications to scan for potential interactions & risk levels.  
- **Condition Guidance** – Get AI guidance related to health conditions and medication context.  
- **Python Analytics** – For advanced users: analytics section (e.g., usage data, trends).  
- **AI Lab Analyzer** – Upload lab/test results and get interpretation related to medications or conditions.  
- **Patient Account** – Manage your account details, saved items and history.  
- **Health Profile** – Input allergies, active medications, health metrics to personalize the tool.  
- **User Settings** – Preferences: theme, notifications, account settings.  
- **Help & FAQ** – Documentation, FAQs and support resources.  
- **Switch Theme** – Toggle between dark and light modes.  
- **Collapse** – Collapse/expand the menu for streamlined view.

---

## Tech Stack  
- **Frontend**: React + TypeScript, styled with Tailwind CSS.  
- **Backend**: Node.js + Express (API layer, file uploads, AI integration).  
- **AI Core**: Google Gemini API (or alternative LLM) for text & image analysis.  
- **Database**: MongoDB (storing user profiles, bookmarks, meds data).  
- **Auth/Security**: JWT authentication, HTTPS, encrypted data where required.

---

## Prerequisites  
Before running locally, ensure you have:  
- Node.js (v18 or later)  
- npm or yarn  
- MongoDB instance (local or MongoDB Atlas)  
- API key for AI (Gemini or other)  
- Git installed

---

## Getting Started  
```bash
# 1) Clone the repository  
git clone https://github.com/KevinRoozrokh/mymedic-drug-interaction-ai.git  
cd mymedic-drug-interaction-ai  

# 2) Install dependencies  
npm install  
# or  
yarn  

# 3) Copy env sample and set variables  
cp .env.example .env  
# Inside .env:  
# GEMINI_API_KEY=your_key_here  
# MONGODB_URI=your_connection_string  

# 4) Start the development server  
npm run dev  
# or  
yarn dev  

# 5) Open in browser:  
Then visit [http://localhost:3000](http://localhost:3000) to launch MyMedic locally.

---

## 👨‍💻 Author

Coded by [**Kevin Roozrokh**](http://kevinroozrokh.com) 
Connect on [LinkedIn](https://linkedin.com/in/kevin-roozrokh) or [GitHub](https://github.com/kevinroozrokh).


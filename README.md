# 🤖 AI-Powered Interview Preparation Platform

An AI-powered interview preparation platform that analyzes a candidate's resume, self-description, and target job description to generate a personalized interview preparation strategy.

The platform uses AI to generate technical questions, behavioral questions, skill-gap analysis, a match score, and a personalized preparation plan.

---

## 🚀 Features

- 🔐 User Registration & Login
- 🔑 JWT-based Authentication
- 🍪 HTTP-only Cookie Authentication
- 📄 Resume Upload
- 🧠 AI-powered Resume & Job Description Analysis
- 📊 Candidate-Job Match Score
- 💻 Technical Interview Questions
- 🗣️ Behavioral Interview Questions
- 📌 Skill Gap Analysis
- 📚 Personalized Interview Preparation Plan
- 📋 Previous Interview Reports
- 📄 AI-generated ATS-friendly Resume
- 🖨️ Resume HTML to PDF generation
- 🔒 Protected API Routes

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router
- Axios
- SCSS
- Vite

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Cookie Parser
- Multer

### AI
- Groq
- Vercel AI SDK
- Zod
- GPT-OSS-20B

### PDF & Resume Processing
- Puppeteer
- PDF text extraction

---

## 🏗️ Project Architecture

```text
React Frontend
      │
      │ Axios
      ▼
Express / Node.js Backend
      │
      ├──────────────► MongoDB
      │
      ├──────────────► Groq AI
      │                    │
      │                    ▼
      │              Interview Report
      │
      └──────────────► Puppeteer
                           │
                           ▼
                       Resume PDF

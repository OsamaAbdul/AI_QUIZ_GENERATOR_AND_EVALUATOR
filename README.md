# 🎓 AI Quiz Generator and Evaluator

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
![Repo Size](https://img.shields.io/github/repo-size/OsamaAbdul/AI_QUIZ_GENERATOR_AND_EVALUATOR)
![Last Commit](https://img.shields.io/github/last-commit/OsamaAbdul/AI_QUIZ_GENERATOR_AND_EVALUATOR)

Welcome to **AI Quiz Generator and Evaluator**, an innovative web app that transforms learning into an interactive and personalized experience — powered by state-of-the-art AI APIs. Upload your PDFs, auto-generate quizzes, evaluate answers in real-time, and get smarter feedback instantly.

Whether you're a student, teacher, or lifelong learner — this tool is your smart study partner.

---

## ✨ Features

- 📄 **PDF Text Extraction** — Upload PDFs and extract clean, structured content.
- 🤖 **AI-Generated Quizzes** — Generate dynamic MCQs using **Gemini** or **OpenAI** based on extracted text.
- 🧠 **Instant Evaluation** — Get immediate feedback, scores, and explanations.
- 🔐 **Secure Auth System** — JWT-based login/registration to protect your content and results.
- ⚛️ **Modern React UI** — Smooth, responsive frontend with routing, quiz-taking screens, and loading states.
- 🛠️ **Robust Backend** — Built with **Express.js** and **MongoDB**, supporting scalable deployment.
- 🚀 **Ready for Deployment** — Deploy frontend on Netlify, backend on Render/Heroku.

---

## 🧰 Tech Stack

| Component         | Technology                             |
|------------------|----------------------------------------|
| Frontend         | React, React Router, CSS               |
| Backend          | Express.js, Node.js                    |
| Database         | MongoDB                                |
| AI APIs          | Gemini API, OpenAI API                 |
| Authentication   | JSON Web Tokens (JWT)                  |
| File Upload      | Multer                                 |
| Env Management   | dotenv                                 |


---

## 🚀 Getting Started

> Set up the project locally in just a few steps!

### ✅ Prerequisites

- Node.js (v16+)
- MongoDB (local or Atlas)
- Git
- API Keys:
  - Gemini API
  - OpenAI API

---

### 🔧 Installation

#### 1. Clone the Repo

```bash
git clone https://github.com/OsamaAbdul/AI_QUIZ_GENERATOR_AND_EVALUATOR.git
cd AI_QUIZ_GENERATOR_AND_EVALUATOR
```

---

#### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file from `.env.example`:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/ai-quiz-db
JWT_SECRET=your_jwt_secret
PORT=5000
GEMINI_API_KEY=your_gemini_api_key
OPENAI_KEY=your_openai_api_key
```

Start the server:

```bash
nodemon server.js
```

---

#### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file:

```env
REACT_APP_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

---

### 🌐 Access the App

- Frontend: http://localhost:3000  
- Backend API: http://localhost:5000  

---

## 🧪 How to Use

1. **Register/Login**  
2. **Upload PDF** via `/upload-pdf` (protected route)
3. **Generate Quiz** — AI creates questions based on your content
4. **Take Quiz** on `/take-quiz`
5. **View Results** with AI feedback and scores

---

## 📘 Example Workflow

- Upload: `Biology_Chapter1.pdf`
- AI Quiz Example:  
  *"What is the primary source of energy for Earth's climate system?"*
- Take Quiz → Submit →  
  *"🎯 Score: 90% — Great job! Review photosynthesis for improvement."*

---

## 📦 Deployment

### 🔹 Frontend (Netlify)

```bash
npm run build
netlify deploy --prod
```

Add a `_redirects` file in `public/`:

```
/*    /index.html   200
```

---

### 🔸 Backend (Render/Heroku)

- Push to GitHub
- Set environment variables in dashboard
- Use build command:  
```bash
npm install && npm start
```

---

## 🔐 Security Tips

- **DO NOT** commit `.env` files. Keep API keys private.
- Rotate `GEMINI_API_KEY` and `OPENAI_KEY` if exposed.
- Use a strong `JWT_SECRET` — avoid weak/guessable tokens.

---

## 🤝 Contributing

We welcome all contributions!

```bash
# Fork and clone
git checkout -b feature/YourFeature
# Make your changes
git commit -m "Add YourFeature"
git push origin feature/YourFeature
# Open a Pull Request 🚀
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- 🛠️ React & Express.js for the dev framework  
- 🧠 Gemini & OpenAI APIs for quiz generation and feedback  
- 🗃️ MongoDB for reliable data storage  

---

## ⭐ Support the Project

If you like this project, **give it a ⭐ on GitHub** and share it with others!

For questions or bugs, open an [Issue](https://github.com/OsamaAbdul/AI_QUIZ_GENERATOR_AND_EVALUATOR/issues) or reach out directly.

---

**Happy Quizzing!** 🎉📚💡

# 💬 Poki-Toki

![chat](/frontend/ui.jpeg)

**A lightweight, real-time chat application powered by React, Node.js, and Google Gemini AI.**

[![React](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Node](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Socket.IO](https://img.shields.io/badge/Realtime-Socket.IO-010101?style=for-the-badge&logo=socket.io&logoColor=white)](https://socket.io/)
[![Gemini](https://img.shields.io/badge/AI-Google%20Gemini-8E75B2?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-architecture">Architecture</a>
</p>

</div>

---

## 📖 Overview

**Poki-Toki** is a modern chat demonstration that bridges the gap between real-time communication and Generative AI. It connects a high-performance **React + Vite** frontend to a **Node/Express** backend via **Socket.IO**.

Instead of chatting with a human, the backend acts as a conduit, forwarding your chat history to **Google's Generative AI (Gemini)** and streaming the AI's intelligent responses back to the UI instantly.

---

## 🚀 Features

- **⚡ Real-time Communication:** Powered by `socket.io` for instant, bidirectional message passing.
- **🤖 AI Integration:** Seamlessly integrates with Google Generative AI to provide context-aware replies.
- **🛠️ Minimalist Starter:** A clean, unopinionated codebase perfect for learning or forking.
- **🔄 Chat History:** The backend maintains conversation context (in-memory) for smarter AI responses.

---

## 🛠 Tech Stack

| Component      | Technology           | Description                                                |
| :------------- | :------------------- | :--------------------------------------------------------- |
| **Frontend**   | React, Vite          | Fast, modern UI development                                |
| **Networking** | Socket.IO Client     | Real-time event-based communication                        |
| **Backend**    | Node.js, Express     | REST API and Socket server                                 |
| **AI Engine**  | Google Generative AI | Large Language Model integration (`@google/generative-ai`) |

---

**Quick summary:** The frontend (React + Vite) runs on `http://localhost:5173` and communicates with the backend (Express + Socket.IO) on port `3000`. The backend forwards chat history to Google Generative AI (Gemini) to generate responses.

**Features**

- **Realtime chat:** Uses `socket.io` to send/receive messages instantly.
- **AI responses:** Backend calls Google Generative AI to generate replies based on chat history.
- **Minimal starter:** Ready-to-run frontend and backend with simple setup instructions.

**Tech stack**

- **Frontend:** React, Vite, `socket.io-client`
- **Backend:** Node.js, Express, Socket.IO, `@google/generative-ai`

**Repository structure**

- `frontend/` — React + Vite app. Run with `npm run dev` inside this folder.
- `Backend/` — Express server and Socket.IO integration. Run with `npm start` inside this folder.
- `Backend/src/services/ai.service.js` — Wraps calls to the Google Generative AI client. Expects `GOOGLE_GENAI_API_KEY` in environment.

**Prerequisites**

- Node.js (v18+ recommended)
- npm (or pnpm/yarn)
- A Google Generative AI API key (set as `GOOGLE_GENAI_API_KEY` in the backend `.env`)

**Environment variables**

- `GOOGLE_GENAI_API_KEY` — API key for the Google Generative AI client used by the backend.

**Setup & Run (local)**

1. Start the backend

```bash
cd Backend
npm install
# create a .env file with: GOOGLE_GENAI_API_KEY=your_api_key_here
npm start
```

The backend listens on port `3000` by default and allows CORS requests from `http://localhost:5173`.

2. Start the frontend

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173` in your browser. The client will connect to the backend at `http://localhost:3000` using Socket.IO.

**Usage**

- Type a message in the frontend chat UI; the client emits an `ai-message` event to the server.
- The backend appends user messages to an internal `chatHistory`, calls the Google Generative AI model, emits `ai-response` back to the client, and the UI displays the reply.

**Notes & troubleshooting**

- Ensure your Google API key is enabled for the Generative AI service and has appropriate quota.
- If CORS errors occur, confirm the frontend origin and backend CORS config (`Backend/server.js`) match.
- The backend uses `process.env.GOOGLE_GENAI_API_KEY` in `Backend/src/services/ai.service.js`.

**Next steps / Development**

- Add authentication if you want per-user chat history.
- Persist chat history to a database if you want to maintain conversation state across restarts.

If you'd like, I can also add a small `.env.example`, update `package.json` scripts to include a `dev` script for the backend, or add a short CONTRIBUTING section.

## 👨‍💻 Developer

<div align="center">

### **Sameer Khan**

_Full Stack Developer (MERN)_

[![Portfolio](https://img.shields.io/badge/Portfolio-FF5722?style=for-the-badge&logo=google-chrome&logoColor=white)](https://portfolio-coral-two-16.vercel.app/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/sameer-khan2210)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/sameer2210)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:sameerkhan27560@gmail.com)

📱 **Mobile:** +91 9691709556

</div>

### 🎓 Education

- **B.Tech in Computer Science** - RGPV, Bhopal (2022-2025) | CGPA: 7.3/10
- **Polytechnic Diploma** - Computer Science (2019-2022) | CGPA: 7.1/10

### 💼 Technical Skills

**Frontend:** React.js, Next.js, Redux, Tailwind CSS, Bootstrap, Framer Motion, Recharts

**Backend:** Node.js, Express.js, MongoDB, MySQL, JWT, Socket.io, Redis

**DevOps:** Docker, Git, Postman, Vercel, Render, Cloudinary

### 🏆 Certifications

- MERN Full Stack Development
- Core Java
- Data Structures & Algorithms
- DBMS with SQL

---

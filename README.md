# Poki-Toki

Poki-Toki is a simple real-time chat demo that connects a React + Vite frontend to a Node/Express backend using Socket.IO and the Google Generative AI library to produce AI responses.


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

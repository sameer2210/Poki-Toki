// import { useEffect, useRef, useState } from 'react';
// import { io } from 'socket.io-client';
// import './App.css';

// // const SOCKET_URL =  'http://localhost:3000';

// function App() {
//   const [socket, setSocket] = useState(null);
//   const [connected, setConnected] = useState(false);
//   const [messages, setMessages] = useState([
//     { id: 0, sender: 'bot', text: 'Hello! I am your AI assistant. Ask me anything.' },
//   ]);
//   const [input, setInput] = useState('');
//   const [sending, setSending] = useState(false);
//   const messagesEndRef = useRef(null);
//   const idRef = useRef(1);

//   useEffect(() => {
//     const socket = io('http://localhost:3000');
//     setSocket(socket);

//     socket.on('connect', () => setConnected(true));
//     socket.on('disconnect', () => setConnected(false));

//     socket.on('ai-response', data => {
//       const text = data?.response || data?.message || JSON.stringify(data || '');
//       setMessages(m => [...m, { id: idRef.current++, sender: 'bot', text }]);
//       setSending(false);
//     });

//     socket.on('connect_error', () => setConnected(false));

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   function handleSend() {
//     const text = input.trim();
//     if (!text || !socket) return;
//     setMessages(m => [...m, { id: idRef.current++, sender: 'user', text }]);
//     setInput('');
//     setSending(true);
//     socket.emit('ai-message', text);
//   }

//   function handleKeyDown(e) {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSend();
//     }
//   }

//   return (
//     <div className="app-root">
//       <header className="app-header">
//         <h1>AI Chat</h1>
//         <div className={`status ${connected ? 'connected' : 'disconnected'}`}>
//           {connected ? 'Connected' : 'Disconnected'}
//         </div>
//       </header>

//       <main className="chat-container">
//         <div className="messages" id="messages">
//           {messages.map(m => (
//             <div key={m.id} className={`message ${m.sender}-message`}>
//               <div className="message-content">{m.text}</div>
//             </div>
//           ))}
//           <div ref={messagesEndRef} />
//         </div>

//         <div className="input-area">
//           <textarea
//             className="message-input"
//             placeholder="Type a message..."
//             value={input}
//             onChange={e => setInput(e.target.value)}
//             onKeyDown={handleKeyDown}
//             rows={2}
//           />
//           <button className="send-button" onClick={handleSend} disabled={sending || !connected}>
//             {sending ? 'Sending...' : 'Send'}
//           </button>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default App;




import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import './App.css';

// --- BUILT-IN SOUND SYNTHESIZER (No external files needed) ---
const playSound = (type) => {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  if (type === 'send') {
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(400, audioCtx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.1);
    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.1);
  } else if (type === 'receive') {
    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(600, audioCtx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.2);
    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.2);
  }
};

// --- FUNNY PLACEHOLDERS ---
const PLACEHOLDERS = [
  "Ask me why the chicken crossed the road...",
  "Summoning digital demons...",
  "Type something intelligent (or don't)...",
  "Calculating the meaning of life...",
  "Beep boop? Beep boop!",
];

function App() {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState([
    { id: 0, sender: 'bot', text: 'Hello, human! I am meow AI of SAM.', seed: 'bot-start' },
  ]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);
  const idRef = useRef(1);
  const [placeholder, setPlaceholder] = useState(PLACEHOLDERS[0]);

  // Cycle placeholders on click/focus
  const cyclePlaceholder = () => {
    const random = PLACEHOLDERS[Math.floor(Math.random() * PLACEHOLDERS.length)];
    setPlaceholder(random);
  };

  useEffect(() => {
    const newSocket = io('http://localhost:3000');
    setSocket(newSocket);

    newSocket.on('connect', () => setConnected(true));
    newSocket.on('disconnect', () => setConnected(false));

    newSocket.on('ai-response', data => {
      playSound('receive');
      const text = data?.response || data?.message || JSON.stringify(data || '');
      setMessages(m => [...m, {
        id: idRef.current++,
        sender: 'bot',
        text,
        seed: Math.random().toString() // Random seed for unique bot face
      }]);
      setSending(false);
    });

    newSocket.on('connect_error', () => setConnected(false));

    return () => newSocket.disconnect();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, sending]);

  function handleSend() {
    const text = input.trim();
    if (!text || !socket) return;

    playSound('send');
    setMessages(m => [...m, {
      id: idRef.current++,
      sender: 'user',
      text,
      seed: 'user' // Constant seed for user
    }]);

    setInput('');
    setSending(true);
    socket.emit('ai-message', text);
    cyclePlaceholder();
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="app-root">
      <div className="background-animation"></div>

      <header className="app-header">
        <div className="logo-glitch" data-text="AI CHAT">AI CHAT</div>
        <div className={`status-pill ${connected ? 'connected' : 'disconnected'}`}>
          <span className="dot"></span>
          {connected ? 'CONNECTED' : 'DISCONNECTED'}
        </div>
      </header>

      <main className="chat-container">
        <div className="messages">
          {messages.map(m => (
            <div key={m.id} className={`message-row ${m.sender}-row`}>
              {/* Generate Cute Robot Avatars */}
              <img
                className="avatar"
                src={`https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${m.sender === 'user' ? 'Felix' : m.seed}`}
                alt="avatar"
              />
              <div className={`message-bubble ${m.sender}-bubble`}>
                {m.text}
              </div>
            </div>
          ))}

          {/* Animated Typing Indicator */}
          {sending && (
            <div className="message-row bot-row">
              <img
                className="avatar"
                src="https://api.dicebear.com/9.x/bottts-neutral/svg?seed=thinking"
                alt="thinking"
              />
              <div className="message-bubble bot-bubble typing">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="input-zone">
          <textarea
            className="magic-input"
            placeholder={placeholder}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={cyclePlaceholder}
            rows={1}
          />
          <button
            className="send-btn"
            onClick={handleSend}
            disabled={sending || !connected}
          >
            <span className="material-icon">➤</span>
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
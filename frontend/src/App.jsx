import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import './App.css';

// const SOCKET_URL =  'http://localhost:3000';

function App() {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState([
    { id: 0, sender: 'bot', text: 'Hello! I am your AI assistant. Ask me anything.' },
  ]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);
  const idRef = useRef(1);

  useEffect(() => {
    const socket = io('http://localhost:3000');
    setSocket(socket);

    socket.on('connect', () => setConnected(true));
    socket.on('disconnect', () => setConnected(false));

    socket.on('ai-response', data => {
      const text = data?.response || data?.message || JSON.stringify(data || '');
      setMessages(m => [...m, { id: idRef.current++, sender: 'bot', text }]);
      setSending(false);
    });

    socket.on('connect_error', () => setConnected(false));

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  function handleSend() {
    const text = input.trim();
    if (!text || !socket) return;
    setMessages(m => [...m, { id: idRef.current++, sender: 'user', text }]);
    setInput('');
    setSending(true);
    socket.emit('ai-message', text);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="app-root">
      <header className="app-header">
        <h1>AI Chat</h1>
        <div className={`status ${connected ? 'connected' : 'disconnected'}`}>
          {connected ? 'Connected' : 'Disconnected'}
        </div>
      </header>

      <main className="chat-container">
        <div className="messages" id="messages">
          {messages.map(m => (
            <div key={m.id} className={`message ${m.sender}-message`}>
              <div className="message-content">{m.text}</div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="input-area">
          <textarea
            className="message-input"
            placeholder="Type a message..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={2}
          />
          <button className="send-button" onClick={handleSend} disabled={sending || !connected}>
            {sending ? 'Sending...' : 'Send'}
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;

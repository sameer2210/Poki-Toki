const socket = io('http://localhost:3000');

const chatMessages = document.getElementById('chatMessages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const statusEl = document.getElementById('status');
const loadingEl = document.getElementById('loading');

// Connection status
socket.on('connect', () => {
    console.log('Connected to server');
    updateStatus('Connected', 'connected');
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
    updateStatus('Disconnected', 'disconnected');
});

socket.on('connect_error', (error) => {
    console.error('Connection error:', error);
    updateStatus('Connection Error', 'disconnected');
});

// Receive AI response
socket.on('ai-response', (data) => {
    hideLoading();
    if (data && data.response) {
        addMessage(data.response, 'bot');
    } else {
        addMessage('Sorry, no response received.', 'bot');
    }
});

// Send message on button click
sendButton.addEventListener('click', sendMessage);

// Send message on Enter key
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

function sendMessage() {
    const message = messageInput.value.trim();
    
    if (!message) return;
    
    // Add user message to chat
    addMessage(message, 'user');
    
    // Clear input
    messageInput.value = '';
    messageInput.focus();
    
    // Disable send button and show loading
    sendButton.disabled = true;
    showLoading();
    
    // Emit to server
    socket.emit('ai-message', message);
}

function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.textContent = text;
    
    messageDiv.appendChild(contentDiv);
    chatMessages.appendChild(messageDiv);
    
    // Auto-scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Re-enable send button
    sendButton.disabled = false;
}

function showLoading() {
    loadingEl.style.display = 'flex';
}

function hideLoading() {
    loadingEl.style.display = 'none';
}

function updateStatus(text, className) {
    statusEl.textContent = text;
    statusEl.className = `status ${className}`;
}

require('dotenv').config();
const app = require('./src/app');
const { createServer } = require('http');
const { Server } = require('socket.io');
const genrateResponse = require('./src/services/ai.service');

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

let chatHistory = [
  // {
  //   role: "user",
  //   parts: "who is SRK give me ans in 20 words"
  // },
  // {
  //   role: "model",
  //   parts: "Shah Rukh Khan (SRK) is a legendary Indian actor and producer..."
  // }
];

io.on('connection', socket => {
  console.log('user connected ');

  // socket.on("msg", (data) => {
  //   console.log("mesg mil gya ");
  //   console.log(data);

  socket.on('ai-message', async data => {
    console.log('Ai message recived ', data);

    chatHistory.push({
      role: 'user',
      parts: [{ text: data }],
    });

    const response = await genrateResponse(chatHistory);

    chatHistory.push({
      role: 'model',
      parts: [{ text: response }],
    });
    console.log('AI resposne ', response);
    socket.emit('ai-response', { response });
  });

  socket.on('disconnect', () => {
    console.log('user disconnect ');
  });
});

httpServer.listen(3000, () => {
  console.log('Server is running ');
});

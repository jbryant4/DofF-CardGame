import { createServer } from 'http';
import cors from 'cors';
import express from 'express';
import { Server } from 'socket.io';

const app = express();

// Use cors middleware
app.use(cors());

const httpServer = createServer(app);

// Adjust the cors settings for socket.io
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000', // or wherever your frontend is hosted
    methods: ['GET', 'POST']
  }
});

// Import and use your event handling modules here
import createGameHandler from './eventHandlers/createGame';
import joinGameHandler from './eventHandlers/joinGame';
import playerReadyHandler from './eventHandlers/playerReady';
import { GameRoom } from './room';

const rooms: Record<string, GameRoom> = {}; // Object to store game rooms

io.on('connection', socket => {
  console.log('a user connected', socket.id);

  // Use your event handling modules here
  createGameHandler(socket, rooms);
  joinGameHandler(socket, rooms);
  playerReadyHandler(socket, rooms, io);
  // verify function run on landing /id

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const PORT = 3001;
httpServer.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});

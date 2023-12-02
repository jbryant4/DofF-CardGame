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
import boardHandlers from './boardHandlers';
import preGameHandlers from './preGameHandlers';
import { GameRoom } from './room';
const rooms: Record<string, GameRoom> = {}; // Object to store game rooms

io.on('connection', socket => {
  console.log('a user connected');

  // Disconnect and Reconnect Handlers
  preGameHandlers(socket, rooms, io);

  // GAME Handlers
  boardHandlers(socket, rooms, io);

  //Effect Handlers

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const PORT = 3001;
httpServer.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
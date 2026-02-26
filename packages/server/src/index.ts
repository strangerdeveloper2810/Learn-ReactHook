import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import type {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
} from '@baucua/shared';
import { setupSocketHandlers } from './socket/index.js';

const PORT = process.env.PORT || 3001;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';

// Express app
const app = express();
app.use(cors({ origin: CLIENT_URL }));
app.use(express.json());

// Health check
app.get('/health', (_, res) => {
  res.json({ status: 'ok', timestamp: Date.now() });
});

// HTTP server
const httpServer = createServer(app);

// Socket.IO server
const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(httpServer, {
  cors: {
    origin: CLIENT_URL,
    methods: ['GET', 'POST'],
  },
});

// Setup socket handlers
setupSocketHandlers(io);

// Start server
httpServer.listen(PORT, () => {
  console.log(`
  ===============================
   Bau Cua Server
  ===============================
   HTTP:   http://localhost:${PORT}
   Socket: ws://localhost:${PORT}
   Client: ${CLIENT_URL}
  ===============================
  `);
});

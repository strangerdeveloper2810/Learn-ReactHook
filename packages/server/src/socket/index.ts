import type { Server } from 'socket.io';
import type {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
} from '@baucua/shared';
import { registerRoomHandlers } from './handlers/roomHandler.js';
import { registerGameHandlers, cleanupIntervals } from './handlers/gameHandler.js';

type GameServer = Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;

export function setupSocketHandlers(io: GameServer): void {
  io.on('connection', (socket) => {
    console.log(`[Socket] Connected: ${socket.id}`);

    // Initialize socket data
    socket.data.playerId = socket.id;
    socket.data.playerName = '';
    socket.data.roomCode = null;

    // Register handlers
    registerRoomHandlers(io, socket);
    registerGameHandlers(io, socket);
  });

  // Cleanup on server shutdown
  process.on('SIGINT', () => {
    cleanupIntervals();
    io.close();
    process.exit(0);
  });

  process.on('SIGTERM', () => {
    cleanupIntervals();
    io.close();
    process.exit(0);
  });
}

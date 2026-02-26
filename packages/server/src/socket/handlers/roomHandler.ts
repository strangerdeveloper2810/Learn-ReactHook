import type { Server, Socket } from 'socket.io';
import type {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
} from '@baucua/shared';
import * as roomService from '../../services/roomService.js';

type GameSocket = Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;
type GameServer = Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;

export function registerRoomHandlers(io: GameServer, socket: GameSocket): void {
  // Tạo phòng
  socket.on('room:create', ({ playerName }) => {
    // Leave any existing room
    if (socket.data.roomCode) {
      socket.leave(socket.data.roomCode);
    }

    const room = roomService.createRoom(socket.id, playerName);

    socket.data.playerId = socket.id;
    socket.data.playerName = playerName;
    socket.data.roomCode = room.code;

    socket.join(room.code);

    socket.emit('room:created', { room });
    console.log(`[Room] ${playerName} created room ${room.code}`);
  });

  // Vào phòng
  socket.on('room:join', ({ code, playerName }) => {
    const room = roomService.joinRoom(code, socket.id, playerName);

    if (!room) {
      socket.emit('error', {
        message: 'Không tìm thấy phòng hoặc tên đã được sử dụng',
        code: 'ROOM_NOT_FOUND',
      });
      return;
    }

    socket.data.playerId = socket.id;
    socket.data.playerName = playerName;
    socket.data.roomCode = room.code;

    socket.join(room.code);

    // Notify the joining player
    socket.emit('room:joined', { room });

    // Notify others in the room
    const player = room.players.find((p) => p.id === socket.id);
    if (player) {
      socket.to(room.code).emit('room:player-joined', { player });
    }

    console.log(`[Room] ${playerName} joined room ${room.code}`);
  });

  // Rời phòng
  socket.on('room:leave', () => {
    handlePlayerLeave(io, socket);
  });

  // Disconnect
  socket.on('disconnect', () => {
    handlePlayerLeave(io, socket);
    console.log(`[Socket] ${socket.data.playerName || socket.id} disconnected`);
  });
}

function handlePlayerLeave(io: GameServer, socket: GameSocket): void {
  const roomCode = socket.data.roomCode;
  if (!roomCode) return;

  const { room, wasHost, newHostId, roomClosed } = roomService.leaveRoom(socket.id);

  socket.leave(roomCode);
  socket.data.roomCode = null;

  if (roomClosed) {
    io.to(roomCode).emit('room:closed', { reason: 'Phòng đã đóng' });
    console.log(`[Room] Room ${roomCode} closed`);
    return;
  }

  if (room) {
    io.to(roomCode).emit('room:player-left', {
      playerId: socket.id,
      newHostId,
    });

    if (wasHost && newHostId) {
      console.log(`[Room] New host in ${roomCode}: ${newHostId}`);
    }
  }
}

import type { Server, Socket } from 'socket.io';
import type {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
} from '@baucua/shared';
import { SHAKE_DURATION, RESULT_DISPLAY_TIME, DEFAULT_SCORE, HOST_SCORE } from '@baucua/shared';
import * as roomService from '../../services/roomService.js';
import * as gameService from '../../services/gameService.js';

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

// Track countdown intervals per room
const countdownIntervals = new Map<string, NodeJS.Timeout>();

export function registerGameHandlers(io: GameServer, socket: GameSocket): void {
  // Host bắt đầu round
  socket.on('game:start-round', () => {
    const room = roomService.getPlayerRoom(socket.id);
    if (!room) {
      socket.emit('error', { message: 'Không tìm thấy phòng' });
      return;
    }

    if (!roomService.isHost(room, socket.id)) {
      socket.emit('error', { message: 'Chỉ nhà cái mới có thể bắt đầu' });
      return;
    }

    const started = gameService.startRound(room);
    if (!started) {
      socket.emit('error', { message: 'Không thể bắt đầu round lúc này' });
      return;
    }

    // Emit round started
    io.to(room.code).emit('game:round-started', {
      countdown: room.countdown,
      roundNumber: room.currentRound,
    });

    console.log(`[Game] Round ${room.currentRound} started in ${room.code}`);

    // Start countdown
    startCountdown(io, room.code);
  });

  // Player đặt cược
  socket.on('game:bet', ({ bets }) => {
    const room = roomService.getPlayerRoom(socket.id);
    if (!room) {
      socket.emit('error', { message: 'Không tìm thấy phòng' });
      return;
    }

    const result = gameService.placeBet(room, socket.id, bets);
    if (!result.success) {
      socket.emit('error', { message: result.error || 'Đặt cược thất bại' });
      return;
    }

    // Calculate total bet for this player
    const totalBet = bets.reduce((sum, b) => sum + b.amount, 0);

    // Notify all players that this player has bet (including bet details for host)
    io.to(room.code).emit('game:bet-placed', {
      playerId: socket.id,
      playerName: socket.data.playerName || 'Unknown',
      bets,
      totalBet,
    });

    console.log(`[Game] ${socket.data.playerName} placed bet ${totalBet}$ in ${room.code}`);
  });

  // Player/Host rebuy (vay thêm tiền)
  socket.on('game:rebuy', () => {
    const room = roomService.getPlayerRoom(socket.id);
    if (!room) {
      socket.emit('error', { message: 'Không tìm thấy phòng' });
      return;
    }

    const player = roomService.getPlayer(room, socket.id);
    if (!player) {
      socket.emit('error', { message: 'Không tìm thấy người chơi' });
      return;
    }

    // Host gets more money when rebuy
    const rebuyAmount = player.isHost ? HOST_SCORE : DEFAULT_SCORE;

    // Add rebuy amount to player score
    roomService.updatePlayerScore(room, socket.id, player.score + rebuyAmount);

    // Notify all players about the update
    io.to(room.code).emit('room:updated', { room });

    console.log(`[Game] ${socket.data.playerName} rebuy +${rebuyAmount}$ in ${room.code}`);
  });
}

function startCountdown(io: GameServer, roomCode: string): void {
  // Clear existing interval if any
  const existingInterval = countdownIntervals.get(roomCode);
  if (existingInterval) {
    clearInterval(existingInterval);
  }

  const interval = setInterval(() => {
    const room = roomService.getRoom(roomCode);
    if (!room || room.state !== 'betting') {
      clearInterval(interval);
      countdownIntervals.delete(roomCode);
      return;
    }

    const countdown = gameService.decrementCountdown(room);

    // Emit countdown update
    io.to(roomCode).emit('game:countdown', { countdown });

    if (countdown <= 0) {
      clearInterval(interval);
      countdownIntervals.delete(roomCode);

      // End betting and start shaking
      gameService.endBetting(room);
      io.to(roomCode).emit('game:shaking');

      console.log(`[Game] Shaking dice in ${roomCode}`);

      // After shake duration, reveal results
      setTimeout(() => {
        const currentRoom = roomService.getRoom(roomCode);
        if (!currentRoom) return;

        const result = gameService.shakeDice(currentRoom);

        io.to(roomCode).emit('game:result', {
          result,
          room: currentRoom,
        });

        console.log(`[Game] Results in ${roomCode}:`, result.diceResults);

        // After result display time, reset room for next round
        setTimeout(() => {
          const r = roomService.getRoom(roomCode);
          if (r) {
            gameService.finishRound(r);
            io.to(roomCode).emit('room:updated', { room: r });
          }
        }, RESULT_DISPLAY_TIME);
      }, SHAKE_DURATION);
    }
  }, 1000);

  countdownIntervals.set(roomCode, interval);
}

// Cleanup intervals when server shuts down
export function cleanupIntervals(): void {
  for (const interval of countdownIntervals.values()) {
    clearInterval(interval);
  }
  countdownIntervals.clear();
}

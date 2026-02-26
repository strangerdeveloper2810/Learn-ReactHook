import type { Room, Player, RoomConfig } from '@baucua/shared';
import { DEFAULT_ROOM_CONFIG, ROOM_CODE_LENGTH, DEFAULT_SCORE, HOST_SCORE } from '@baucua/shared';

// In-memory storage
const rooms = new Map<string, Room>();

// Generate random room code
function generateRoomCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Removed confusing chars: I,O,0,1
  let code = '';
  for (let i = 0; i < ROOM_CODE_LENGTH; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  // Ensure unique
  if (rooms.has(code)) {
    return generateRoomCode();
  }
  return code;
}

export function createRoom(
  hostId: string,
  hostName: string,
  config: Partial<RoomConfig> = {}
): Room {
  const roomConfig = { ...DEFAULT_ROOM_CONFIG, ...config };
  const code = generateRoomCode();

  const host: Player = {
    id: hostId,
    name: hostName,
    score: HOST_SCORE, // Nhà cái cần nhiều tiền hơn để cover người chơi
    isHost: true,
    isConnected: true,
  };

  const room: Room = {
    code,
    players: [host],
    state: 'waiting',
    currentRound: 0,
    bets: {},
    countdown: 0,
    hostId,
    createdAt: Date.now(),
  };

  rooms.set(code, room);
  return room;
}

export function joinRoom(
  code: string,
  playerId: string,
  playerName: string
): Room | null {
  const room = rooms.get(code.toUpperCase());
  if (!room) return null;

  // Check if player already in room (reconnect)
  const existingPlayer = room.players.find((p) => p.id === playerId);
  if (existingPlayer) {
    existingPlayer.isConnected = true;
    return room;
  }

  // Check if name already taken
  const nameTaken = room.players.some(
    (p) => p.name.toLowerCase() === playerName.toLowerCase()
  );
  if (nameTaken) {
    return null; // Should throw error with message
  }

  const player: Player = {
    id: playerId,
    name: playerName,
    score: DEFAULT_SCORE,
    isHost: false,
    isConnected: true,
  };

  room.players.push(player);
  return room;
}

export function leaveRoom(playerId: string): {
  room: Room | null;
  wasHost: boolean;
  newHostId?: string;
  roomClosed: boolean;
} {
  for (const [code, room] of rooms) {
    const playerIndex = room.players.findIndex((p) => p.id === playerId);
    if (playerIndex === -1) continue;

    const wasHost = room.players[playerIndex].isHost;
    room.players.splice(playerIndex, 1);

    // Room empty → close
    if (room.players.length === 0) {
      rooms.delete(code);
      return { room: null, wasHost, roomClosed: true };
    }

    // Host left → assign new host
    let newHostId: string | undefined;
    if (wasHost && room.players.length > 0) {
      room.players[0].isHost = true;
      room.hostId = room.players[0].id;
      newHostId = room.hostId;
    }

    return { room, wasHost, newHostId, roomClosed: false };
  }

  return { room: null, wasHost: false, roomClosed: false };
}

export function getRoom(code: string): Room | undefined {
  return rooms.get(code.toUpperCase());
}

export function getPlayerRoom(playerId: string): Room | undefined {
  for (const room of rooms.values()) {
    if (room.players.some((p) => p.id === playerId)) {
      return room;
    }
  }
  return undefined;
}

export function getPlayer(room: Room, playerId: string): Player | undefined {
  return room.players.find((p) => p.id === playerId);
}

export function isHost(room: Room, playerId: string): boolean {
  return room.hostId === playerId;
}

export function updatePlayerScore(
  room: Room,
  playerId: string,
  newScore: number
): void {
  const player = room.players.find((p) => p.id === playerId);
  if (player) {
    player.score = newScore;
  }
}

export function resetRoomForNewRound(room: Room): void {
  room.bets = {};
  room.state = 'waiting';
  room.countdown = 0;
}

// Cleanup old rooms (call periodically)
export function cleanupOldRooms(maxIdleTime: number): void {
  const now = Date.now();
  for (const [code, room] of rooms) {
    if (room.state === 'waiting' && now - room.createdAt > maxIdleTime) {
      rooms.delete(code);
    }
  }
}

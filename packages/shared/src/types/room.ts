import type { BetItem } from './game';

// Player trong phòng
export interface Player {
  id: string; // socket.id
  name: string;
  score: number; // mặc định 1000
  isHost: boolean; // true = nhà cái
  isConnected: boolean;
}

// Trạng thái phòng
export type RoomState = 'waiting' | 'betting' | 'shaking' | 'result';

// Room data
export interface Room {
  code: string; // "ABC123"
  players: Player[];
  state: RoomState;
  currentRound: number;
  bets: Record<string, BetItem[]>; // playerId → bets
  countdown: number; // seconds còn lại khi betting
  hostId: string;
  createdAt: number;
}

// Room config
export interface RoomConfig {
  bettingTime: number; // seconds - mặc định 15
  startingScore: number; // mặc định 1000
}

export const DEFAULT_ROOM_CONFIG: RoomConfig = {
  bettingTime: 15,
  startingScore: 1000,
};

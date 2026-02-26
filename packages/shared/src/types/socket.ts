import type { BetItem, RoundResult } from './game';
import type { Player, Room } from './room';

// ===== Client → Server Events =====
export interface ClientToServerEvents {
  // Room management
  'room:create': (data: { playerName: string }) => void;
  'room:join': (data: { code: string; playerName: string }) => void;
  'room:leave': () => void;

  // Game actions
  'game:start-round': () => void; // chỉ host
  'game:bet': (data: { bets: BetItem[] }) => void;
  'game:rebuy': () => void; // vay thêm tiền khi hết
}

// ===== Server → Client Events =====
export interface ServerToClientEvents {
  // Room events
  'room:created': (data: { room: Room }) => void;
  'room:joined': (data: { room: Room }) => void;
  'room:updated': (data: { room: Room }) => void;
  'room:player-joined': (data: { player: Player }) => void;
  'room:player-left': (data: { playerId: string; newHostId?: string }) => void;
  'room:closed': (data: { reason: string }) => void;

  // Game events
  'game:round-started': (data: { countdown: number; roundNumber: number }) => void;
  'game:countdown': (data: { countdown: number }) => void;
  'game:bet-placed': (data: { playerId: string; playerName: string; bets: BetItem[]; totalBet: number }) => void;
  'game:shaking': () => void;
  'game:result': (data: { result: RoundResult; room: Room }) => void;

  // Error
  'error': (data: { message: string; code?: string }) => void;
}

// ===== Inter-server Events (nếu cần scale) =====
export interface InterServerEvents {
  ping: () => void;
}

// ===== Socket data =====
export interface SocketData {
  playerId: string;
  playerName: string;
  roomCode: string | null;
}

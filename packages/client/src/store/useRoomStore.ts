import { create } from 'zustand';
import type { Room, Player } from '@baucua/shared';

interface RoomState {
  room: Room | null;
  error: string | null;
  isLoading: boolean;

  // Actions
  setRoom: (room: Room) => void;
  updateRoom: (room: Room) => void;
  addPlayer: (player: Player) => void;
  removePlayer: (playerId: string, newHostId?: string) => void;
  clearRoom: () => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
}

export const useRoomStore = create<RoomState>((set) => ({
  room: null,
  error: null,
  isLoading: false,

  setRoom: (room) => set({ room, error: null }),

  updateRoom: (room) => set({ room }),

  addPlayer: (player) =>
    set((state) => {
      if (!state.room) return state;
      // Avoid duplicate
      if (state.room.players.some((p) => p.id === player.id)) return state;
      return {
        room: {
          ...state.room,
          players: [...state.room.players, player],
        },
      };
    }),

  removePlayer: (playerId, newHostId) =>
    set((state) => {
      if (!state.room) return state;
      const players = state.room.players
        .filter((p) => p.id !== playerId)
        .map((p) => ({
          ...p,
          isHost: newHostId ? p.id === newHostId : p.isHost,
        }));
      return {
        room: {
          ...state.room,
          players,
          hostId: newHostId || state.room.hostId,
        },
      };
    }),

  clearRoom: () => set({ room: null }),

  setError: (error) => set({ error }),

  clearError: () => set({ error: null }),

  setLoading: (isLoading) => set({ isLoading }),
}));

// Selectors
export const selectRoom = (state: RoomState) => state.room;
export const selectPlayers = (state: RoomState) => state.room?.players || [];
export const selectIsHost = (playerId: string) => (state: RoomState) =>
  state.room?.hostId === playerId;
export const selectRoomCode = (state: RoomState) => state.room?.code;

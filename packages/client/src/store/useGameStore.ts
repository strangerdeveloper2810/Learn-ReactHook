import { create } from 'zustand';
import type { RoundResult, DiceFace, BetItem } from '@baucua/shared';
import { DICE_FACES, DEFAULT_SCORE, BET_UNIT } from '@baucua/shared';

type GameState = 'idle' | 'betting' | 'shaking' | 'result';

interface BetState {
  face: DiceFace;
  amount: number;
}

interface PlayerBet {
  id: string;
  name: string;
  bets: BetItem[];
  totalBet: number;
}

interface GameStore {
  // Round state
  gameState: GameState;
  countdown: number;
  roundNumber: number;
  roundResult: RoundResult | null;
  bettedPlayers: PlayerBet[];

  // Local betting state (for UI)
  localBets: BetState[];
  localScore: number;

  // Actions
  setGameState: (state: GameState) => void;
  setCountdown: (countdown: number) => void;
  setRoundNumber: (roundNumber: number) => void;
  setRoundResult: (result: RoundResult | null) => void;
  addBettedPlayer: (id: string, name: string, bets: BetItem[], totalBet: number) => void;
  resetGameState: () => void;

  // Local bet actions
  initLocalScore: (score: number) => void;
  increaseBet: (face: DiceFace) => void;
  decreaseBet: (face: DiceFace) => void;
  resetLocalBets: () => void;
  getTotalBet: () => number;
  getBetsForSubmit: () => BetItem[];
}

const createInitialBets = (): BetState[] =>
  DICE_FACES.map((face) => ({ face: face as DiceFace, amount: 0 }));

export const useGameStore = create<GameStore>((set, get) => ({
  // Initial state
  gameState: 'idle',
  countdown: 0,
  roundNumber: 0,
  roundResult: null,
  bettedPlayers: [],
  localBets: createInitialBets(),
  localScore: DEFAULT_SCORE,

  // Actions
  setGameState: (gameState) => set({ gameState }),

  setCountdown: (countdown) => set({ countdown }),

  setRoundNumber: (roundNumber) => set({ roundNumber }),

  setRoundResult: (roundResult) => set({ roundResult }),

  addBettedPlayer: (id, name, bets, totalBet) =>
    set((state) => {
      if (state.bettedPlayers.some((p) => p.id === id)) return state;
      return { bettedPlayers: [...state.bettedPlayers, { id, name, bets, totalBet }] };
    }),

  resetGameState: () =>
    set({
      gameState: 'idle',
      countdown: 0,
      roundResult: null,
      bettedPlayers: [],
      localBets: createInitialBets(),
    }),

  // Local bet actions
  initLocalScore: (score) => set({ localScore: score }),

  increaseBet: (face) =>
    set((state) => {
      const totalBet = state.localBets.reduce((sum, b) => sum + b.amount, 0);
      if (totalBet + BET_UNIT > state.localScore) return state;

      return {
        localBets: state.localBets.map((b) =>
          b.face === face ? { ...b, amount: b.amount + BET_UNIT } : b
        ),
      };
    }),

  decreaseBet: (face) =>
    set((state) => ({
      localBets: state.localBets.map((b) =>
        b.face === face && b.amount >= BET_UNIT
          ? { ...b, amount: b.amount - BET_UNIT }
          : b
      ),
    })),

  resetLocalBets: () => set({ localBets: createInitialBets() }),

  getTotalBet: () => get().localBets.reduce((sum, b) => sum + b.amount, 0),

  getBetsForSubmit: () =>
    get()
      .localBets.filter((b) => b.amount > 0)
      .map((b) => ({ face: b.face, amount: b.amount })),
}));

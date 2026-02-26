import { create } from 'zustand';

const STORAGE_KEY = 'baucua_score';

interface BetItem {
  id: string;
  img: string;
  scoreBet: number;
}

interface DiceItem {
  id: string;
  img: string;
}

type ResultType = 'win' | 'lose' | 'draw';

interface RoundResult {
  amount: number;
  type: ResultType;
}

interface BauCuaState {
  arrBet: BetItem[];
  totalScore: number;
  diceRound: number;
  isRevealed: boolean;
  isShaking: boolean;
  arrDice: DiceItem[];
  roundResult: RoundResult | null;
  betScore: (itemClick: BetItem, number: number) => void;
  shakeDice: () => void;
  revealDice: () => void;
  clearResult: () => void;
  playAgain: () => void;
}

const getSavedScore = (): number => {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? Number(saved) : 1000;
};

const saveScore = (score: number): void => {
  localStorage.setItem(STORAGE_KEY, String(score));
};

const initialState = {
  arrBet: [
    { id: 'ga', img: './gameBauCua/ga.png', scoreBet: 0 },
    { id: 'bau', img: './gameBauCua/bau.png', scoreBet: 0 },
    { id: 'ca', img: './gameBauCua/ca.png', scoreBet: 0 },
    { id: 'nai', img: './gameBauCua/nai.png', scoreBet: 0 },
    { id: 'cua', img: './gameBauCua/cua.png', scoreBet: 0 },
    { id: 'tom', img: './gameBauCua/tom.png', scoreBet: 0 },
  ],
  totalScore: getSavedScore(),
  diceRound: 0,
  isRevealed: false,
  isShaking: false,
  arrDice: [
    { id: 'nai', img: './gameBauCua/nai.png' },
    { id: 'cua', img: './gameBauCua/cua.png' },
    { id: 'tom', img: './gameBauCua/tom.png' },
  ],
  roundResult: null,
};

const useBauCuaStore = create<BauCuaState>((set, get) => ({
  ...initialState,

  betScore: (itemClick: BetItem, number: number) => {
    const { isShaking } = get();
    if (isShaking) return;

    set((state) => {
      const arrBet = state.arrBet.map((item) => {
        if (item.id === itemClick.id) {
          if (number === 1 && state.totalScore > 0) {
            return { ...item, scoreBet: item.scoreBet + 100 };
          }
          if (number === -1 && item.scoreBet > 0) {
            return { ...item, scoreBet: item.scoreBet - 100 };
          }
        }
        return item;
      });

      const currentBet = state.arrBet.find((i) => i.id === itemClick.id);
      const diff =
        number === 1 && state.totalScore > 0
          ? -100
          : number === -1 && currentBet && currentBet.scoreBet > 0
            ? 100
            : 0;

      const newScore = state.totalScore + diff;
      saveScore(newScore);
      return { arrBet, totalScore: newScore };
    });
  },

  // Phase 1: Xốc - đậy nắp, roll dice, chạy animation
  shakeDice: () => {
    const { isShaking } = get();
    if (isShaking) return;

    set((state) => {
      const arrDiceRandom: DiceItem[] = [];
      for (let i = 0; i < 3; i++) {
        const numberRandom = Math.floor(Math.random() * 6);
        arrDiceRandom.push(state.arrBet[numberRandom]);
      }

      return {
        arrDice: arrDiceRandom,
        diceRound: state.diceRound + 1,
        isRevealed: false,
        isShaking: true,
      };
    });
  },

  // Phase 2: Mở nắp - tính điểm thưởng
  revealDice: () => {
    set((state) => {
      const scoreBefore = state.totalScore;
      let totalScore = state.totalScore;
      const totalBet = state.arrBet.reduce((sum, i) => sum + i.scoreBet, 0);

      state.arrBet.forEach((betItem) => {
        if (betItem.scoreBet <= 0) return;

        const matchCount = state.arrDice.filter(
          (d) => d.id === betItem.id
        ).length;

        if (matchCount > 0) {
          totalScore += betItem.scoreBet + betItem.scoreBet * matchCount;
        }
      });

      const net = totalScore - scoreBefore;
      const roundResult: RoundResult | null =
        totalBet === 0
          ? null
          : {
              amount: Math.abs(net),
              type: net > 0 ? 'win' : net < 0 ? 'lose' : 'draw',
            };

      const arrBet = state.arrBet.map((item) => ({ ...item, scoreBet: 0 }));

      saveScore(totalScore);
      return {
        arrBet,
        totalScore,
        isRevealed: true,
        isShaking: false,
        roundResult,
      };
    });
  },

  clearResult: () => set({ roundResult: null }),

  playAgain: () => {
    saveScore(1000);
    set((state) => ({
      totalScore: 1000,
      arrBet: state.arrBet.map((item) => ({ ...item, scoreBet: 0 })),
      isRevealed: false,
    }));
  },
}));

export default useBauCuaStore;

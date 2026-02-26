import { BET_SCORE, PLAY_GAME, PLAY_AGAIN } from '../types/BauCuaTypes';

export interface BetItem {
  id: string;
  img: string;
  scoreBet: number;
}

export interface DiceItem {
  id: string;
  img: string;
}

export interface BauCuaState {
  arrBet: BetItem[];
  totalScore: number;
  arrDice: DiceItem[];
}

export interface BauCuaAction {
  type: string;
  itemClick?: BetItem;
  number?: number;
}

const initialState: BauCuaState = {
  arrBet: [
    { id: 'ga', img: './gameBauCua/ga.png', scoreBet: 0 },
    { id: 'bau', img: './gameBauCua/bau.png', scoreBet: 0 },
    { id: 'ca', img: './gameBauCua/ca.png', scoreBet: 0 },
    { id: 'nai', img: './gameBauCua/nai.png', scoreBet: 0 },
    { id: 'cua', img: './gameBauCua/cua.png', scoreBet: 0 },
    { id: 'tom', img: './gameBauCua/tom.png', scoreBet: 0 },
  ],
  totalScore: 1000,
  arrDice: [
    { id: 'nai', img: './gameBauCua/nai.png' },
    { id: 'cua', img: './gameBauCua/cua.png' },
    { id: 'tom', img: './gameBauCua/tom.png' },
  ],
};

const BauCuaReducer = (
  state = initialState,
  action: BauCuaAction
): BauCuaState => {
  switch (action.type) {
    case BET_SCORE: {
      const arrBetUpdate = [...state.arrBet];
      const index = arrBetUpdate.findIndex(
        (item) => item.id === action.itemClick?.id
      );

      let newTotalScore = state.totalScore;

      if (index !== -1) {
        if (action.number === 1 && state.totalScore > 0) {
          arrBetUpdate[index] = {
            ...arrBetUpdate[index],
            scoreBet: arrBetUpdate[index].scoreBet + 100,
          };
          newTotalScore -= 100;
        } else if (action.number === -1 && arrBetUpdate[index].scoreBet > 0) {
          arrBetUpdate[index] = {
            ...arrBetUpdate[index],
            scoreBet: arrBetUpdate[index].scoreBet - 100,
          };
          newTotalScore += 100;
        }
      }

      return {
        ...state,
        arrBet: arrBetUpdate,
        totalScore: newTotalScore,
      };
    }

    case PLAY_GAME: {
      const arrDiceRandom: DiceItem[] = [];
      for (let index = 0; index < 3; index++) {
        const numberRandom = Math.floor(Math.random() * 6);
        const diceRandom = state.arrBet[numberRandom];
        arrDiceRandom.push(diceRandom);
      }

      let newTotalScore = state.totalScore;

      // Xử lý tăng điểm thưởng
      arrDiceRandom.forEach((diceRandom) => {
        const indexOfArrBet = state.arrBet.findIndex(
          (diceBet) => diceBet.id === diceRandom.id
        );

        if (indexOfArrBet !== -1) {
          newTotalScore += state.arrBet[indexOfArrBet].scoreBet;
        }
      });

      // Xử lý hoàn tiền
      state.arrBet.forEach((diceBet) => {
        const indexDiceRandom = arrDiceRandom.findIndex(
          (diceRandom) => diceRandom.id === diceBet.id
        );
        if (indexDiceRandom !== -1) {
          newTotalScore += diceBet.scoreBet;
        }
      });

      // Làm mới game
      const arrBetReset = state.arrBet.map((diceBet) => ({
        ...diceBet,
        scoreBet: 0,
      }));

      return {
        ...state,
        arrBet: arrBetReset,
        arrDice: arrDiceRandom,
        totalScore: newTotalScore,
      };
    }

    case PLAY_AGAIN: {
      const arrBetReset = state.arrBet.map((diceBet) => ({
        ...diceBet,
        scoreBet: 0,
      }));

      return {
        ...state,
        totalScore: 1000,
        arrBet: arrBetReset,
      };
    }

    default:
      return state;
  }
};

export default BauCuaReducer;

import { BET_SCORE, PLAY_GAME } from "../types/BauCuaTypes";
const initialState = {
  arrBet: [
    { id: "ga", img: "./gameBauCua/ga.png", scoreBet: 0 },
    { id: "bau", img: "./gameBauCua/bau.png", scoreBet: 0 },
    { id: "ca", img: "./gameBauCua/ca.png", scoreBet: 0 },
    { id: "nai", img: "./gameBauCua/nai.png", scoreBet: 0 },
    { id: "cua", img: "./gameBauCua/cua.png", scoreBet: 0 },
    { id: "tom", img: "./gameBauCua/tom.png", scoreBet: 0 },
  ],
  totalScore: 1000,
  arrDice: [
    { id: "nai", img: "./gameBauCua/nai.png" },
    { id: "cua", img: "./gameBauCua/cua.png" },
    { id: "tom", img: "./gameBauCua/tom.png" },
  ],
};

const BauCuaReducer = (state = initialState, action) => {
  switch (action.type) {
    case BET_SCORE: {
      let arrBetUpdate = [...state.arrBet];
      const index = arrBetUpdate.findIndex(
        (item) => item.id === action.itemClick.id
      );

      if (index !== -1) {
        if (action.number === 1 && state.totalScore > 0) {
          arrBetUpdate[index].scoreBet += 100;
          state.totalScore -= 100;
        } else {
          if (arrBetUpdate[index].scoreBet > 0) {
            arrBetUpdate[index].scoreBet -= 100;
            state.totalScore += 100;
          }
        }
      }
      state.arrBet = arrBetUpdate;
      return { ...state };
    }

    case PLAY_GAME: {
      const arrDiceRandom = [];
      for (let index = 0; index < 3; index++) {
        let numberRandom = Math.floor(Math.random() * 6);
        const diceRandom = state.arrBet[numberRandom];
        arrDiceRandom.push(diceRandom);
      }
      //  Xử lý tăng điểm thưởng
      arrDiceRandom.forEach((diceRandom, index) => {
        let indexOfArrBet = state.arrBet.findIndex(
          (diceBet) => diceBet.id === diceRandom.id
        );

        if (index !== -1) {
          state.totalScore += state.arrBet[indexOfArrBet].scoreBet;
        }
      });

      state.arrDice = arrDiceRandom;
      return { ...state };
    }

    default:
      return state;
  }
};

export default BauCuaReducer;

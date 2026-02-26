import { BET_SCORE, PLAY_GAME, PLAY_AGAIN } from '../types/BauCuaTypes';

interface BetItem {
  id: string;
  img: string;
  scoreBet: number;
}

export const betScoreActions = (itemClick: BetItem, number: number) => ({
  type: BET_SCORE,
  itemClick,
  number,
});

export const playgameAction = () => ({
  type: PLAY_GAME,
});

export const playagainAction = () => ({
  type: PLAY_AGAIN,
});

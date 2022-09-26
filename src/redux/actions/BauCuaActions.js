import {BET_SCORE,PLAY_GAME,PLAY_AGAIN} from "../types/BauCuaTypes"
export const betScoreActions = (itemClick, number)=>({
    type: BET_SCORE,
    itemClick,
    number
});

export const playgameAction = () => ({
    type: PLAY_GAME
});

export const playagainAction = () => ({
    type: PLAY_AGAIN
});
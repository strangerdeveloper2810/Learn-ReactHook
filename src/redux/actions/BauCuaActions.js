import {BET_SCORE,PLAY_GAME} from "../types/BauCuaTypes"
export const betScoreActions = (itemClick, number)=>({
    type: BET_SCORE,
    itemClick,
    number
});

export const playgameAction = () => ({
    type: PLAY_GAME
});


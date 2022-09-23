import {BET_SCORE} from "../types/BauCuaTypes"
export const betScoreActions = (itemClick, number)=>({
    type: BET_SCORE,
    itemClick,
    number
});
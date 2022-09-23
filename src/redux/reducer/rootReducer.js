import {combineReducers} from "redux";
import AppReducer from "./AppReducer";
import BauCuaReducer from "./BauCuaReducer";
export const rootReducer = combineReducers({
    AppReducer,
    BauCuaReducer
});
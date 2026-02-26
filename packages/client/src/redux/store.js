import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from '@redux-devtools/extension';
import AppReducer from "./reducer/AppReducer";
import BauCuaReducer from "./reducer/BauCuaReducer";
const rootReducer = combineReducers({
    AppReducer,
    BauCuaReducer
});

const store = createStore(rootReducer, composeWithDevTools())

export default store;
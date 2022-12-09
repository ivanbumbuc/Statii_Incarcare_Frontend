import { StatsBase } from "fs";
import { combineReducers } from "redux";
import statieReducer from "./statie/reducer";


export interface StartState {
    statieReducer: StatieState,
}

const startReducer = combineReducers({
    statieReducer,
});

export default startReducer;
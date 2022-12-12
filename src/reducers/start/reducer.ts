import { StatsBase } from "fs";
import { combineReducers } from "redux";
import statieReducer from "./statie/reducer";
import userReducer from "./user/reducer"

export interface StartState {
    statieReducer: StatieState,
    userReducer: UserState
}

const startReducer = combineReducers({
    statieReducer,
    userReducer
});

export default startReducer;
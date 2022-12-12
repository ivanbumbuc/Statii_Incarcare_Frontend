import { combineReducers } from 'redux';
import startReducer from './start/reducer';



export const createRootReducer = (history: History | null) =>
  combineReducers({
    startReducer
  });


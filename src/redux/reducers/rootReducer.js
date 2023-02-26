import { all } from "redux-saga/effects";
import { combineReducers } from 'redux';
import * as reducer from './Reducer';

export default combineReducers({
  reducer: reducer.reducer,  
});

export function* rootSaga() {
  yield all([
    reducer.saga(), 
    ]);
}


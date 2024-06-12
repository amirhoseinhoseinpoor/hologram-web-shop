import { createStore , combineReducers } from "redux";
const Reducers = {};

const rootRducer = combineReducers(Reducers);

export const configureStore = () => createStore(rootRducer)
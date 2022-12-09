import { createStore, applyMiddleware, combineReducers } from 'redux';
import axios from 'axios';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import auth from './auth';
import venues from './venues';
import caterers from './caterer';
import singleCaterer from './singleCaterer';
import singleVenue from './singleVenue';
import startFormReducer from './startForm';
import events from './events';
import favorites from './favorites';
import singleEvent from './singleEvent';

const reducer = combineReducers({
  auth,
  venues,
  singleVenue,
  caterers,
  startFormReducer,
  singleCaterer,
  events,
  favorites,
  singleEvent,
  // other subreducers
});

const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware, createLogger())
);

export default store;
// export all reducers below:
export * from './auth';
export * from './venues';
export * from './singleVenue';
export * from './caterer';
export * from './startForm';
export * from './singleCaterer';
export * from './events';
export * from './favorites';

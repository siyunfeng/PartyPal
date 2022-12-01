import { createStore, applyMiddleware, combineReducers } from 'redux';
import auth from './auth';
import venues from './venues';
import caterers from './caterer';
import singleCaterer from './singleCaterer';
import axios from 'axios';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

const reducer = combineReducers({
  auth,
  venues,
  caterers,
  singleCaterer,
  // other subreducers
});

const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware.withExtraArgument({ axios }), createLogger())
);

export default store;

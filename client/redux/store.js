import { createStore, applyMiddleware, combineReducers } from 'redux';
import auth from './auth';
import venues from './venues';
import caterers from './caterer';
import axios from 'axios';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import singleVenue from './singleVenue'

const reducer = combineReducers({
  auth,
  venues,
  singleVenue, 
  caterers,
  // other subreducers
});

const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware.withExtraArgument({ axios }), createLogger())
);

export default store;

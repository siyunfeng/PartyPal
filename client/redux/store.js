import { createStore, applyMiddleware, combineReducers } from 'redux';
import auth from './auth';
import venues from './venues';
import caterers from './caterer';
import singleCaterer from './singleCaterer';
import axios from 'axios';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import singleVenue from './singleVenue'
import startFormReducer from './startForm';


const reducer = combineReducers({
  auth,
  venues,
  singleVenue, 
  caterers,
  startFormReducer,
  singleCaterer,
  // other subreducers
});

const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware, createLogger())
);

export default store;

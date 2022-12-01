import { createStore, applyMiddleware, combineReducers } from 'redux';
import auth from './auth';
import venues from './venues';
import axios from 'axios'
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';


const reducer = combineReducers({
  auth,
  venues,
  // other subreducers
});

const store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware.withExtraArgument({ axios }),
    createLogger()
  )
);

export default store;
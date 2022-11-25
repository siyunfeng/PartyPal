import { createStore, applyMiddleware, combineReducers } from 'redux';
import reducer from './redux/auth';
import axios from 'axios'
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

// let middleware = [
//   thunkMiddleware.withExtraArgument({ axios }),
// ]

const store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware.withExtraArgument({ axios }),
    createLogger()
  )
);

export default store;
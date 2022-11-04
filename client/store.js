import { createStore, applyMiddleware } from 'redux';
import reducer from './redux/auth';
// if using combine reducers import here
import axios from 'axios'
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

let middleware = [
  thunkMiddleware.withExtraArgument({ axios }),
]

const store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware,
    createLogger()
  )
);

export default store;
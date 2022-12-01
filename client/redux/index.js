import axios from 'axios';
// potentially add combine reducer later
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import auth from './auth';
import venues from './venues';

export const reducer = combineReducers({
  auth,
  venues
  // other subreducers
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

const store = createStore(reducer, middleware);

export default store;
// export other sub redux file
export * from './auth';

/* code from boilerplate */
// const DUMMY = 'DUMMY';

// const dummyActionCreator = (data) => {
//   return {
//     type: DUMMY,
//     data,
//   };
// };

// export const dummyThunk = () => {
//   return async (dispatch) => {
//     try {
//       //can do AJAX requests here and dispatch to reducer
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };

// const intitialState = [];
// export default function dummyReducer(state = intitialState, actionObj) {
//   return state;
// }

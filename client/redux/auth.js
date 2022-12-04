import axios from 'axios';

const TOKEN = 'token';

/**
 * ACTION TYPES
 */

const SET_AUTH = 'SET_AUTH';

/**
 * ACTION CREATORS
 */
const setAuth = (auth) => ({ type: SET_AUTH, auth });

/**
 * THUNK CREATORS
 */
export const me = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    const { data } = await axios.get('/auth/me', {
      headers: {
        authorization: token,
      },
    });
    return dispatch(setAuth(data));
  }
};

export const authenticate =
  (history, username, password, method, firstName, lastName, email) =>
  async (dispatch) => {
    try {
      const urlVisting = window.localStorage.pathVisting;
      const res = await axios.post(`/auth/${method}`, {
        username,
        password,
        firstName,
        lastName,
        email,
      });
      window.localStorage.setItem(TOKEN, res.data.token);
      dispatch(me());
      if (method === 'login' && urlVisting) {
        window.localStorage.removeItem(window.localStorage.pathVisting);
        history.push(`${urlVisting}`);
      } else if (method === 'login')
        method === 'login' ? history.push('/account') : history.push('/login');
      else {
        return;
      }
    } catch (authError) {
      return dispatch(setAuth({ error: authError }));
    }
  };

export const logout = () => {
  window.localStorage.removeItem(TOKEN);
  // console.log('User is logging out');
  return {
    type: SET_AUTH,
    auth: {},
  };
};

/**
 * REDUCER
 */
export default function reducer(state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    default:
      return state;
  }
}

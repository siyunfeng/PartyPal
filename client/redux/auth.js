import axios from 'axios';
import history from '../history';

const TOKEN = 'token';

const SET_AUTH = 'SET_AUTH';

const setAuth = (auth) => ({ type: SET_AUTH, auth });

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
      const urlVisiting = window.localStorage.pathVisiting;
      const res = await axios.post(`/auth/${method}`, {
        username,
        password,
        firstName,
        lastName,
        email,
      });
      window.localStorage.setItem(TOKEN, res.data.token);
      dispatch(me());
      if (method === 'login' && urlVisiting) {
        window.localStorage.removeItem('pathVisiting');
        history.push(`${urlVisiting}`);
      } else if (method === 'login') {
        history.push('/account');
      } else if (method === 'signup' && urlVisiting) {
        window.localStorage.removeItem('pathVisiting');
        history.push(`${urlVisiting}`);
      } else if (method === 'signup') {
        history.push('/account');
      } else {
        return;
      }
    } catch (authError) {
      return dispatch(setAuth({ error: authError }));
    }
  };

export const logout = () => {
  window.localStorage.removeItem(TOKEN);
  history.push('/');
  history.go(0);
  return {
    type: SET_AUTH,
    auth: {},
  };
};

export default function reducer(state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    default:
      return state;
  }
}

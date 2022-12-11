import axios from 'axios';
const TOKEN = 'token';

const GET_SINGLE_EVENT = 'GET_SINGLE_EVENT';

const _getSingleEvent = (event) => ({ type: GET_SINGLE_EVENT, event });

export const getSingleEvent = (eventId) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      const { data: event } = await axios.get(`/api/events/single/${eventId}`, {
        headers: {
          authorization: token,
        },
      });
      dispatch(_getSingleEvent(event));
    } catch (error) {
      console.error('redux/events.js getSingleEvent error >>>>', error);
      // throw error;
    }
  };
};

const singleEvent = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_EVENT:
      return action.event;
    default:
      return state;
  }
};

export default singleEvent;

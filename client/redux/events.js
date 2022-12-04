import axios from 'axios';

const GET_EVENTS = 'GET_EVENTS';

const _getEvents = (events) => ({ type: GET_EVENTS, events });

export const getEvents = (userId) => {
  return async (dispatch) => {
    try {
      // console.log('redux/event.js userId =', userId);
      const { data: events } = await axios.get(`/api/events/${userId}`);
      // console.log('getEvents data =', events);
      dispatch(_getEvents(events));
    } catch (error) {
      console.error('redux/events.js getEvents error >>>>', error);
      // throw error;
    }
  };
};

const events = (state = [], action) => {
  switch (action.type) {
    case GET_EVENTS:
      return action.events;
    default:
      return state;
  }
};

export default events;

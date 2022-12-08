import axios from 'axios';
const TOKEN = 'token';

const GET_EVENTS = 'GET_EVENTS';
const CREATE_NEW_EVENT = 'CREATE_NEW_EVENT';

const _getEvents = (events) => ({ type: GET_EVENTS, events });
const _createNewEvent = (event) => ({ type: CREATE_NEW_EVENT, event });

export const getEvents = (userId) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      const { data: events } = await axios.get(`/api/events/${userId}`, {
        headers: {
          authorization: token,
        },
      });
      dispatch(_getEvents(events));
    } catch (error) {
      console.error('redux/events.js getEvents error >>>>', error);
      // throw error;
    }
  };
};

export const createNewEvent = (newEventInput) => {
  return async (dispatch) => {
    try {
      const {
        userId,
        eventName,
        eventNote,
        venueOption,
        catererOption,
        dateOption,
        timeOption,
      } = newEventInput;

      const { data: newEvent } = await axios.post('/api/events', {
        userId: userId,
        name: eventName,
        venue: venueOption.name,
        venueYelpId: venueOption.yelp_reference_id,
        catering: catererOption.name,
        cateringYelpId: catererOption.yelp_reference_id,
        notes: eventNote,
        date: dateOption,
        time: timeOption,
        // NOTE: not sure if we should pass req.headers.authorization instead because we need to put requireToken to protect the route
      });
      dispatch(_createNewEvent(newEvent));
    } catch (error) {
      console.error('redux/events.js createNewEvent error >>>>', error);
    }
  };
};

const events = (state = [], action) => {
  switch (action.type) {
    case GET_EVENTS:
      return action.events;
    case CREATE_NEW_EVENT:
      return [...state, action.event];
    default:
      return state;
  }
};

export default events;

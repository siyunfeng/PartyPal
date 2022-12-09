import axios from 'axios';
const TOKEN = 'token';

const GET_EVENTS = 'GET_EVENTS';
const CREATE_NEW_EVENT = 'CREATE_NEW_EVENT';
const DELETE_EVENT = 'DELETE_EVENT';

const _getEvents = (events) => ({ type: GET_EVENTS, events });
const _createNewEvent = (event) => ({ type: CREATE_NEW_EVENT, event });
const _deleteEvent = (event) => ({ type: DELETE_EVENT, event });

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
    }
  };
};

export const createNewEvent = (newEventInput) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
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

      const { data: newEvent } = await axios.post(
        '/api/events',
        {
          userId: userId,
          name: eventName,
          venue: venueOption.name,
          venueYelpId: venueOption.yelp_reference_id,
          catering: catererOption.name,
          cateringYelpId: catererOption.yelp_reference_id,
          notes: eventNote,
          date: dateOption,
          time: timeOption,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );
      dispatch(_createNewEvent(newEvent));
    } catch (error) {
      console.error('redux/events.js createNewEvent error >>>>', error);
    }
  };
};

export const deleteEvent = (eventId) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      const { data: event } = await axios.delete(`/api/events/${eventId}`, {
        headers: {
          authorization: token,
        },
      });
      dispatch(_deleteEvent(event));
    } catch (error) {
      console.error('redux/events.js deleteEvent error >>>>', error);
    }
  };
};

const events = (state = [], action) => {
  switch (action.type) {
    case GET_EVENTS:
      return action.events;
    case CREATE_NEW_EVENT:
      return [...state, action.event];
    case DELETE_EVENT:
      return state.filter((event) => event.id !== action.event.id);
    default:
      return state;
  }
};

export default events;

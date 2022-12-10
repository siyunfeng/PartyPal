import axios from 'axios';
const TOKEN = 'token';

const GET_EVENTS = 'GET_EVENTS';
const CREATE_NEW_EVENT = 'CREATE_NEW_EVENT';
const DELETE_EVENT = 'DELETE_EVENT';
const EDIT_EVENT = 'EDIT_EVENT';

const _getEvents = (events) => ({ type: GET_EVENTS, events });
const _createNewEvent = (event) => ({ type: CREATE_NEW_EVENT, event });
const _deleteEvent = (event) => ({ type: DELETE_EVENT, event });
const _editEvent = (event) => ({ type: EDIT_EVENT, event });

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

export const editEvent = (eventInfo, history) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
        const eventInfoToSend = {
          name: eventInfo.eventNameOption,
          venue: eventInfo.venueOption.name,
          venueYelpId: eventInfo.venueOption.yelp_reference_id,
          catering: eventInfo.catererOption.name,
          cateringYelpId: eventInfo.catererOption.yelp_reference_id,
          notes: eventInfo.noteOption,
          date: eventInfo.dateOption,
          time: eventInfo.timeOption,
        };
        const { data } = await axios.put(
          `/api/events/${eventInfo.eventId}`,
          eventInfoToSend,
          {
            headers: {
              authorization: token,
            },
          }
        );
        dispatch(_editEvent(data));
        history.push('/account');
      }
    } catch (error) {
      console.error(error);
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
    case EDIT_EVENT:
      return action.event;
    default:
      return state;
  }
};

export default events;

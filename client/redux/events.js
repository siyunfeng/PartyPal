import axios from 'axios';
const TOKEN = 'token';

const GET_EVENTS = 'GET_EVENTS';
const CREATE_NEW_EVENT = 'CREATE_NEW_EVENT';

const _getEvents = (events) => ({ type: GET_EVENTS, events });
const _createNewEvent = (event) => ({ type: CREATE_NEW_EVENT, event });

export const getEvents = (userId) => {
  return async (dispatch) => {
    try {
      // console.log('redux/event.js userId =', userId);
      const token = window.localStorage.getItem(TOKEN);
      const { data: events } = await axios.get(`/api/events/${userId}`, {
        headers: {
          authorization: token,
        },
      });
      // console.log('getEvents data =', events);
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
      const { userId, eventName, eventNote, venueOption, catererOption } =
        newEventInput;
      // console.log('createNewEvent THUNK newEventInput =', newEventInput);
      // console.log(
      //   'userId =',
      //   userId,
      //   'venueOption name =',
      //   venueOption.name,
      //   'venueYelpId =',
      //   venueOption.yelp_reference_id,
      //   'catererOption name =',
      //   catererOption.name,
      //   'yelpId =',
      //   catererOption.yelp_reference_id,
      //   'eventName =',
      //   eventName,
      //   'eventNote =',
      //   eventNote
      // );
      const { data: newEvent } = await axios.post('/api/events', {
        name: eventName,
        venue: venueOption.name,
        venueYelpId: venueOption.yelp_reference_id,
        catering: catererOption.name,
        cateringYelpId: catererOption.yelp_reference_id,
        notes: eventNote,
        userId: userId,
        // NOTE: not sure if we should pass req.headers.authorization instead because we need to put requireToken to protect the route
      });
      // console.log('{date: newEvent} newEvent =', newEvent);
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
      console.log('case CREATE_NEW_EVENT action.event =', action.event);
      return [...state, action.event];
    default:
      return state;
  }
};

export default events;

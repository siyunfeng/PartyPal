import axios from 'axios';
// import { useHistory } from 'react-router-dom';
// import history from '../history';

const GET_SINGLE_VENUE = 'GET_SINGLE_VENUE';

const getSingleVenueCreator = (venue) => {
  return {
    type: GET_SINGLE_VENUE,
    venue,
  };
};

export const getSingleVenueThunk = (yelpId) => {
  console.log('yelpId', yelpId);
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`/api/venues/${yelpId}`, yelpId);
      console.log('response from POST -------->', data);
      dispatch(getSingleVenueCreator(data));
    } catch (error) {
      console.error(error);
    }
  };
};

const singleVenue = (state = {}, action) => {
  console.log('action obj in store', action);
  switch (action.type) {
    case GET_SINGLE_VENUE:
      return action.venue;
    default:
      return state;
  }
};

export default singleVenue
import axios from 'axios';

const GET_SINGLE_VENUE = 'GET_SINGLE_VENUE';

const getSingleVenueCreator = (venue) => {
  return {
    type: GET_SINGLE_VENUE,
    venue,
  };
};

export const getSingleVenueThunk = (yelpId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`/api/venues/${yelpId}`, yelpId);
      dispatch(getSingleVenueCreator(data));
    } catch (error) {
      console.error(error);
    }
  };
};

const singleVenue = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_VENUE:
      return action.venue;
    default:
      return state;
  }
};

export default singleVenue
import axios from 'axios';

const GET_VENUES = 'GET_VENUES';

const getVenuesCreator = (venues) => {
  return {
    type: GET_VENUES,
    venues,
  };
};

export const getVenuesThunk = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post('/api/venues');
      const businessArray = data.data.search.business;
      dispatch(getVenuesCreator(businessArray));
    } catch (error) {
      console.error(error);
    }
  };
};

const venues = (state = [], action) => {
  switch (action.type) {
    case GET_VENUES:
      return action.venues;
    default:
      return state;
  }
};

export default venues;

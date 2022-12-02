import axios from 'axios';

const GET_SINGLE_CATERER = 'GET_SINGLE_CATERER';

const setCaterer = (caterer) => {
  return {
    type: GET_SINGLE_CATERER,
    caterer,
  };
};

export const fetchSingleCaterer = (yelpId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`/api/caterers/${yelpId}`);
      console.log('this is the post result', data);
      // const businessArray = data.data.search.business;
      dispatch(setCaterer(data));
    } catch (error) {
      console.error(error);
    }
  };
};

const singleCaterer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_CATERER:
      return action.caterer;
    default:
      return state;
  }
};

export default singleCaterer;

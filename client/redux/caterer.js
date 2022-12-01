import axios from 'axios';

const GET_CATERERS = 'GET_CATERERS';
const GET_SINGLE_CATERER = 'GET_SINGLE_CATERER';

const setCaterers = (caterers) => {
  return {
    type: GET_CATERERS,
    caterers,
  };
};

const setCaterer = (caterer) => {
  return {
    type: GET_SINGLE_CATERER,
    caterer,
  };
};

export const fetchAllCaterers = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post('/api/caterers');
      const businessArray = data.data.search.business;
      dispatch(setCaterers(businessArray));
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchSingleCaterer = (yelpId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`/api/caterers/${yelpId}`);
      // const businessArray = data.data.search.business;
      dispatch(setCaterer(data));
    } catch (error) {
      console.error(error);
    }
  };
};

const caterers = (state = [], action) => {
  switch (action.type) {
    case GET_CATERERS:
      return action.caterers;
    case GET_SINGLE_CATERER:
      return action.caterer;
    default:
      return state;
  }
};

export default caterers;

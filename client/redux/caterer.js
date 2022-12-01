import axios from 'axios';

const GET_CATERERS = 'GET_CATERERS';

const setCaterers = (caterers) => {
  return {
    type: GET_CATERERS,
    caterers,
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

const caterers = (state = [], action) => {
  switch (action.type) {
    case GET_CATERERS:
      return action.caterers;
    default:
      return state;
  }
};

export default caterers;

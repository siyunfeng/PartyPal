import axios from 'axios';

const GET_CATERERS = 'GET_CATERERS';

const setCaterers = (products) => {
  return {
    type: GET_CATERERS,
    products,
  };
};

export const fetchAllCaterers = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post('/api/caterers');
      dispatch(setCaterers(data));
    } catch (error) {
      console.error(error);
    }
  };
};

const allCatererReducer = (state = [], action) => {
  switch (action.type) {
    case GET_CATERERS:
      return action.products;
    default:
      return state;
  }
};

export default allCatererReducer;

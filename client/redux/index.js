import axios from "axios";
// potentially add combine reducer later 

const DUMMY = "DUMMY";

const dummyActionCreator = (data) => {
  return {
    type: DUMMY,
    data,
  };
};

export const dummyThunk = () => {
  return async (dispatch) => {
    try {
      //can do AJAX requests here and dispatch to reducer
    } catch (error) {
      console.log(error);
    }
  };
};

const intitialState = []
export default function dummyReducer(state = intitialState, actionObj) {
  return state;
}

const SEND_INITIAL_QUERY = 'SEND_INITIAL_QUERY';

export const sendInitialQuery = (initialQuery) => ({
  type: SEND_INITIAL_QUERY,
  initialQuery,
});

// const sendInitialQuery = (initialQuery) =>

const startFormReducer = (state = {}, action) => {
  switch (action.type) {
    case SEND_INITIAL_QUERY:
      console.log(
        'startFormReducer - action.initialQuery =',
        action.initialQuery
      );
      return action.initialQuery;
    default:
      return state;
  }
};

export default startFormReducer;

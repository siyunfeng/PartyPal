import React from 'react';
import { connect } from 'react-redux';
import { getSingleVenueThunk } from '../redux/singleVenue';
import { useEffect } from 'react';

const SingleVenue = (props) => {
  console.log('venue in single venue', props.venue);

  useEffect()
  return (
    <div>
      <h1>I AM SINGLE VENUE</h1>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state)
  return {
    venue: state.venue,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getSingleVenue: (yelpId) => {
      dispatch(getSingleVenueThunk(yelpId));
    },
  };
};

export default connect(mapStateToProps, mapDispatch)(SingleVenue);

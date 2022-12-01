import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { getVenuesThunk } from '../redux/venues';

const AllVenues = (props) => {
  const [venueName, setVenueName] = useState('');
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState('');
  const [rating, setRating] = useState('');
  const [hoursOfOperation, setHoursOfOperation] = useState('');

  useEffect(() => {
    console.log('in use effect');
    return props.getVenues();
  }, []);
  
  return (
    <div>
      <img></img>
      <p>Name: {venueName}</p>
      <p>Address: {address}</p>
      <p>Price: {price}</p>
      <p>Rating: {rating}</p>
      <p>Hours of Operation:{hoursOfOperation}</p>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    venues: state.venues,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getVenues: () => {
      console.log('in map dispatch');
      dispatch(getVenuesThunk());
    },
  };
};

export default connect(mapStateToProps, mapDispatch)(AllVenues);

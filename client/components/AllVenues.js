import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getVenuesThunk } from '../redux/venues';
import { getSingleVenueThunk } from '../redux/singleVenue';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export const AllVenues = (props) => {
  const [venueName, setVenueName] = useState('');
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState('');
  const [rating, setRating] = useState('');
  const [hoursOfOperation, setHoursOfOperation] = useState('');

  useEffect(() => {
    const { location, service } = props.startForm;
    return props.getVenues({ location, service });
  }, [venueName, address, price, rating, hoursOfOperation]);

  const allVenues = props.venues;

  return (
    <div>
      <h1>Search results for {props.startForm.location}: </h1>
      <p>Results length: {allVenues.length}</p>
      {allVenues.map((venue) => {
        return (
          <div key={venue.id}>
            <Card className='mb-4' style={{ width: '25rem' }}>
              <Card.Img variant='top' src={venue.photos[0]} />
              <Card.Body>
                <Card.Title>
                  {venue.name ? venue.name : 'No venue name available'}
                </Card.Title>
                <Card.Text>
                  <strong>Address: </strong>
                  {venue.location.address1
                    ? venue.location.address1
                    : 'No address available'}
                </Card.Text>
                <Card.Text>
                  <strong>Price: </strong>
                  {venue.price ? venue.price : 'Price not available'}
                </Card.Text>
                <Link to={`/singleVenue/${venue.id}`}>
                  <Button variant='primary' name={venue.id}>
                    See More
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log('state', state);
  return {
    venues: state.venues,
    venue: state.venue,
    startForm: state.startFormReducer,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getVenues: ({ location, service }) => {
      dispatch(getVenuesThunk({ location, service }));
    },
    getSingleVenue: (yelpId) => {
      dispatch(getSingleVenueThunk(yelpId));
    },
  };
};

export default connect(mapStateToProps, mapDispatch)(AllVenues);

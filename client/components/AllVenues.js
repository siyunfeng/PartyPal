import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import history from '../history';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { getVenuesThunk } from '../redux/venues';
import { getSingleVenueThunk } from '../redux/singleVenue';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { findDayOfWeek, convert } from '../../helperFunctions';

export const AllVenues = (props) => {
  const [venueName, setVenueName] = useState('');
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState('');
  const [rating, setRating] = useState('');
  const [hoursOfOperation, setHoursOfOperation] = useState('');

  useEffect(() => {
    return props.getVenues();
  }, [venueName, address, price, rating, hoursOfOperation]);

  const allVenues = props.venues;

  return (
    <div>
      {allVenues.map((venue) => {
        return (
          <div key={venue.id}>
            <Card className='mb-4' style={{ width: '18rem' }}>
              <Card.Img variant='top' src={venue.photos[0]} />
              <Card.Body>
                <Card.Title>{venue.name}</Card.Title>
                <Card.Text><strong>Address: </strong>{venue.location.address1}</Card.Text>
                {/* <Card.Text>{venue.phone}</Card.Text> */}
                <Card.Text><strong>Price: </strong>{venue.price}</Card.Text>
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
  };
};

const mapDispatch = (dispatch) => {
  return {
    getVenues: () => {
      dispatch(getVenuesThunk());
    },
    getSingleVenue: (yelpId) => {
      dispatch(getSingleVenueThunk(yelpId));
    },
  };
};

export default connect(mapStateToProps, mapDispatch)(AllVenues);

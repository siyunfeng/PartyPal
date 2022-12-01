import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { getVenuesThunk } from '../redux/venues';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { findDayOfWeek, convert } from '../../helperFunctions';

const AllVenues = (props) => {
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
                <Card.Text>{venue.location.address1}</Card.Text>
                <Card.Text>{venue.phone}</Card.Text>
                <Card.Text>{venue.price}</Card.Text>
                <Card.Text>Overall Rating: {venue.rating}</Card.Text>
                <Card.Text>
                  Days Open:{' '}
                  {venue.hours[0].open.map((day) => {
                    return `${findDayOfWeek(day.day)}, `;
                  })}
                </Card.Text>
                <Card.Text>
                  Open: {convert(venue.hours[0].open[0].start)}
                </Card.Text>
                <Card.Text>
                  Closes: {convert(venue.hours[0].open[0].end)}
                </Card.Text>
                <Link to='/singleVenue/:id'>
                  <Button variant='primary'>See More</Button>
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
  return {
    venues: state.venues,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getVenues: () => {
      dispatch(getVenuesThunk());
    },
  };
};

export default connect(mapStateToProps, mapDispatch)(AllVenues);

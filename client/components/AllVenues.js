import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getVenuesThunk } from '../redux/venues';
import { getSingleVenueThunk } from '../redux/singleVenue';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { default as Select } from 'react-select';

export const AllVenues = (props) => {
  const [price, setPrice] = useState('');
  const [rating, setRating] = useState('');
  const [hoursOfOperation, setHoursOfOperation] = useState('');

  useEffect(() => {
    const { location, service } = props.startForm;
    return props.getVenues({ location, service, price });
  }, [price, rating, hoursOfOperation]);

  const handlePriceSelect = (priceOptions) => {
    if (priceOptions.value) {
      if (priceOptions.value !== 'all') {
        setPrice(priceOptions.value);
      } else {
        setPrice('');
      }
    }
  };

  const priceOptions = [
    { value: '1', label: '$' },
    { value: '2', label: '$$' },
    { value: '3', label: '$$$' },
    { value: '4', label: '$$$$' },
    { value: 'all', label: 'All' },
  ];

  const allVenues = props.venues;

  return (
    <div>
      <form style={{ width: '100px' }} onSubmit={handlePriceSelect(price)}>
        <Select
          defaultValue={priceOptions[4]}
          // isMulti
          name="price"
          options={priceOptions}
          menuPlacement="auto"
          menuPosition="fixed"
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={handlePriceSelect}
        />
      </form>
      {allVenues.map((venue) => {
        return (
          <div key={venue.id}>
            <Card className="mb-4" style={{ width: '25rem' }}>
              <Card.Img variant="top" src={venue.photos[0]} />
              <Card.Body>
                <Card.Title>{venue.name}</Card.Title>
                <Card.Text>
                  <strong>Address: </strong>
                  {venue.location.address1}
                </Card.Text>
                <Card.Text>
                  <strong>Price: </strong>
                  {venue.price ? venue.price : 'Price not avaliable'}
                </Card.Text>
                <Link to={`/singleVenue/${venue.id}`}>
                  <Button variant="primary" name={venue.id}>
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
    getVenues: ({ location, service, price }) => {
      dispatch(getVenuesThunk({ location, service, price }));
    },
    getSingleVenue: (yelpId) => {
      dispatch(getSingleVenueThunk(yelpId));
    },
  };
};

export default connect(mapStateToProps, mapDispatch)(AllVenues);

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getVenuesThunk } from '../redux/venues';
import { getSingleVenueThunk } from '../redux/singleVenue';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { default as Select } from 'react-select';
import FlexBoxForAllView from './Styled-Components/FlexBoxForAllView.styled';
import FlexBoxForSearchResults from './Styled-Components/FlexBoxForSearchResults.styled';
import LoadingState from './Spinner';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export const AllVenues = (props) => {
  const [price, setPrice] = useState(() => {
    const priceValue = window.localStorage.getItem('price');
    return priceValue !== null ? JSON.parse(priceValue) : '';
  });
  const [hoursOfOperation, setHoursOfOperation] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  window.localStorage.removeItem('pathVisiting');

  useEffect(() => {
    const { location, service } = props.startForm;
    const fetchData = async () => {
      await props.getVenues({ location, service, price });
    };
    fetchData();
    setTimeout(() => setIsLoaded(true), 3000);
    window.localStorage.setItem('price', JSON.stringify(price));
  }, [price, hoursOfOperation]);

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

  const allVenues = props.venues.filter((venue) => {
    return venue.is_claimed === true && venue.rating >= 3.5;
  });

  return (
    <div className='all-venue-container'>
      <br></br>
      <FlexBoxForSearchResults>
        <h4>Venue search results for {props.startForm.location}: </h4>
        <p>{allVenues.length} venues found</p>
        <div className='cateres-filter-container'>
          <div>
            <form
              style={{
                width: '150px',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onSubmit={handlePriceSelect(price)}
            >
              <label>Filter by Price</label>
              <Select
                defaultValue={priceOptions[4]}
                name='price'
                options={priceOptions}
                menuPlacement='auto'
                menuPosition='fixed'
                className='basic-multi-select'
                classNamePrefix='select'
                onChange={handlePriceSelect}
              />
            </form>
          </div>
        </div>
        <br></br>
      </FlexBoxForSearchResults>
      <br></br>
      <br></br>
      <FlexBoxForAllView>
        {isLoaded ? (
          allVenues.map((venue) => {
            return (
              <div key={venue.id}>
                <Card className='mb-4' style={{ width: '25rem' }}>
                  <Card.Img
                    variant='top'
                    src={venue.photos[0]}
                    className='allViews single-img'
                  />
                  <Card.Body>
                    <Card.Title style={{ fontFamily: 'DM Serif Display' }}>
                      {venue.name ? venue.name : 'No venue name available'}
                    </Card.Title>
                    <Card.Text>
                      <strong>Price: </strong>
                      {venue.price ? venue.price : 'Price not available'}
                    </Card.Text>
                    <div>
                      <Typography component='legend'>
                        <strong>Ratings: {venue.rating}</strong>
                      </Typography>
                      <Rating
                        name='read-only'
                        precision={0.5}
                        value={venue.rating}
                        readOnly
                      />
                    </div>
                    <br></br>
                    <Link to={`/singleVenue/${venue.id}`}>
                      <Button
                        variant='primary'
                        name={venue.id}
                        style={{ fontFamily: 'Cardo' }}
                      >
                        <strong>See more</strong>
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
              </div>
            );
          })
        ) : (
          <LoadingState />
        )}
      </FlexBoxForAllView>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    venues: state.venues,
    venue: state.venue,
    startForm: state.startFormReducer,
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    getVenues: ({ location, service, price }) => {
      dispatch(getVenuesThunk({ location, service, price }, history));
    },
    getSingleVenue: (yelpId) => {
      dispatch(getSingleVenueThunk(yelpId));
    },
  };
};

export default connect(mapStateToProps, mapDispatch)(AllVenues);

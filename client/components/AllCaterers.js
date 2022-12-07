import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllCaterers } from '../redux/caterer';
import { fetchSingleCaterer } from '../redux/singleCaterer';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { default as Select } from 'react-select';
import FlexBoxForSearchResults from './Styled-Components/FlexBoxForSearchResults.styled';
import FlexBoxForAllView from './Styled-Components/FlexBoxForAllView.styled';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function AllCaterers(props) {
  const [price, setPrice] = useState(() => {
    const priceValue = window.localStorage.getItem('price');
    return priceValue !== null ? JSON.parse(priceValue) : '';
  });
  const [term, setTerm] = useState(() => {
    const termValue = window.localStorage.getItem('term');
    return termValue !== null ? JSON.parse(termValue) : '';
  });
  const [isLoaded, setIsLoaded] = useState(false);

  window.localStorage.removeItem('pathVisiting');

  useEffect(() => {
    const { location } = props.startForm;
    const fetchData = async () => {
      await props.fetchAllCaterers({ location, term, price });
    };
    fetchData();
    setTimeout(() => setIsLoaded(true), 3000);
    window.localStorage.setItem('price', JSON.stringify(price));
    window.localStorage.setItem('term', JSON.stringify(term));
  }, [price, term]);

  let allCaterers = props.caterers.filter((caterer) => {
    return caterer.is_claimed === true && caterer.rating >= 3.5;
  });

  const handleClick = (e) => {
    const yelpId = e.target.name;
    props.fetchSingleCaterer(yelpId);
  };

  const handlePriceSelect = (priceOptions) => {
    if (priceOptions.value) {
      if (priceOptions.value !== 'all') {
        setPrice(priceOptions.value);
      } else {
        setPrice('');
      }
    }
  };

  const handleCuisineSelect = (cuisineOptions) => {
    if (cuisineOptions.value) {
      if (cuisineOptions.value !== 'All') {
        setTerm(cuisineOptions.value);
      } else {
        setTerm('');
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

  const cuisineOptions = [
    { value: 'American', label: 'American' },
    { value: 'Mexican', label: 'Mexican' },
    { value: 'Italian', label: 'Italian' },
    { value: 'Asian', label: 'Asian' },
    { value: 'all', label: 'All' },
  ];

  return (
    <>
      <FlexBoxForSearchResults>
        <h1>Caterer search results for {props.startForm.location}: </h1>
        <p>{allCaterers.length} caterers found</p>
        <form
          style={{ width: '150px' }}
          onSubmit={handlePriceSelect(priceOptions)}
        >
          <Select
            defaultValue={priceOptions[4]}
            // isMulti
            name='price'
            options={priceOptions}
            className='basic-multi-select'
            classNamePrefix='select'
            onChange={handlePriceSelect}
          />
        </form>
        <form
          style={{ width: '150px' }}
          onSubmit={handleCuisineSelect(cuisineOptions)}
        >
          <Select
            defaultValue={priceOptions[4]}
            // isMulti
            name='cuisine'
            options={cuisineOptions}
            className='basic-multi-select'
            classNamePrefix='select'
            onChange={handleCuisineSelect}
          />
        </form>
        <br></br>
      </FlexBoxForSearchResults>
      <br></br>
      <br></br>
      <FlexBoxForAllView>
        {isLoaded ? (
          allCaterers.map((caterer) => {
            return (
              <div key={caterer.id}>
                <Card className='mb-4' style={{ width: '18rem' }}>
                  <Card.Img
                    variant='top'
                    src={caterer.photos[0]}
                    className='allViews'
                  />
                  <Card.Body>
                    <Card.Title>
                      {caterer.name
                        ? caterer.name
                        : 'No caterer name available'}
                    </Card.Title>
                    <Card.Text>
                      {caterer.price ? caterer.price : 'No price available'}
                    </Card.Text>
                    <Box component='fieldset' mb={3} borderColor='transparent'>
                      <Typography component='legend'>Ratings</Typography>
                      <Rating
                        name='read-only'
                        precision={0.5}
                        value={caterer.rating}
                        readOnly
                      />
                    </Box>
                    <Link to={`/singleCaterer/${caterer.id}`}>
                      <Button
                        variant='primary'
                        name={caterer.id}
                        onClick={(e) => {
                          handleClick(e);
                        }}
                      >
                        See More
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
              </div>
            );
          })
        ) : (
          <p>Loading</p>
        )}
      </FlexBoxForAllView>
    </>
  );
}

const mapState = (state) => ({
  caterers: state.caterers,
  caterer: state.singleCaterer,
  startForm: state.startFormReducer,
});

const mapDispatch = (dispatch, { history }) => {
  return {
    fetchAllCaterers: ({ location, term, price }) => {
      dispatch(fetchAllCaterers({ location, term, price }, history));
    },
    fetchSingleCaterer: (yelpId) => {
      dispatch(fetchSingleCaterer(yelpId));
    },
  };
};
export default connect(mapState, mapDispatch)(AllCaterers);

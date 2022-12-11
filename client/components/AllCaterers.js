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
import LoadingState from './Spinner';
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
    <div className='all-caterer-container'>
      <br></br>
      <FlexBoxForSearchResults>
        <h4>Caterer search results for {props.startForm.location}: </h4>
        <p>{allCaterers.length} caterers found</p>
        <div className='cateres-filter-container'>
          <div>
            <form
              style={{
                width: '150px',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onSubmit={handlePriceSelect(priceOptions)}
            >
              <label>Filter by Price</label>
              <Select
                defaultValue={priceOptions[4]}
                name='price'
                options={priceOptions}
                className='basic-multi-select'
                classNamePrefix='select'
                onChange={handlePriceSelect}
              />
            </form>
          </div>
          <div>
            <form
              style={{ width: '150px' }}
              onSubmit={handleCuisineSelect(cuisineOptions)}
            >
              <label>Filter by Cuisine</label>
              <Select
                defaultValue={cuisineOptions[4]}
                name='cuisine'
                options={cuisineOptions}
                className='basic-multi-select'
                classNamePrefix='select'
                onChange={handleCuisineSelect}
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
          allCaterers.map((caterer) => {
            return (
              <div key={caterer.id}>
                <Card className='mb-4 all-results-card'>
                  <Card.Img
                    variant='top'
                    src={caterer.photos[0]}
                    className='all-results-img'
                  />
                  <Card.Body>
                    <Card.Title className='DM-Serif-display-font'>
                      {caterer.name
                        ? caterer.name
                        : 'No caterer name available'}
                    </Card.Title>
                    <Card.Text>
                      {caterer.price ? caterer.price : 'No price available'}
                    </Card.Text>
                    <div>
                      <Typography component='legend'>
                        <strong>Ratings: {caterer.rating}</strong>
                      </Typography>
                      <Rating
                        name='read-only'
                        precision={0.5}
                        value={caterer.rating}
                        readOnly
                      />
                    </div>

                    <Link to={`/singleCaterer/${caterer.id}`}>
                      <Button
                        variant='primary'
                        className='cardo-font'
                        name={caterer.id}
                        onClick={(e) => {
                          handleClick(e);
                        }}
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
          <div className='height'>
            <LoadingState />
          </div>
        )}
      </FlexBoxForAllView>
    </div>
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

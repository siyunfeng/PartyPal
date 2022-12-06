import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllCaterers } from '../redux/caterer';
import { fetchSingleCaterer } from '../redux/singleCaterer';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { default as Select } from 'react-select';

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
    console.log('======', isLoaded);

    const { location } = props.startForm;
    const fetchData = async () => {
      await props.fetchAllCaterers({ location, term, price });
      setIsLoaded(!isLoaded);
    };
    fetchData();
    console.log('======', isLoaded);
    window.localStorage.setItem('price', JSON.stringify(price));
    window.localStorage.setItem('term', JSON.stringify(term));
  }, [price, term]);

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

  let allCaterers = props.caterers.filter((caterer) => {
    return caterer.is_claimed === true && caterer.rating >= 3.5;
  });

  return (
    <>
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
      <div>
        <form
          style={{ width: '150px' }}
          onSubmit={handleCuisineSelect(cuisineOptions)}
        >
          <Select
            defaultValue={cuisineOptions[4]}
            // isMulti
            name='cuisine'
            options={cuisineOptions}
            className='basic-multi-select'
            classNamePrefix='select'
            onChange={handleCuisineSelect}
          />
        </form>
      </div>
      <h1>Caterer search results for {props.startForm.location}: </h1>
      <p>{allCaterers.length} caterers found</p>
      {isLoaded ? (
        allCaterers?.length ? (
          allCaterers.map((caterer) => {
            return (
              <div key={caterer.id}>
                <Card className='mb-4' style={{ width: '18rem' }}>
                  <Card.Img variant='top' src={caterer.photos[0]} />
                  <Card.Body>
                    <Card.Title>{caterer.name}</Card.Title>
                    <Card.Text>
                      {caterer.price ? caterer.price : 'No price available'}
                    </Card.Text>
                    <Card.Text>Overall Rating: {caterer.rating}</Card.Text>
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
          <p>no result</p>
        )
      ) : (
        <p>loading</p>
      )}
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

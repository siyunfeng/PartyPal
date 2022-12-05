import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllCaterers } from '../redux/caterer';
import { fetchSingleCaterer } from '../redux/singleCaterer';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { default as Select } from 'react-select';

function AllCaterers(props) {
  const [price, setPrice] = useState('');
  const [rating, setRating] = useState('');
  const [term, setTerm] = useState('');

  window.localStorage.removeItem('pathVisiting');

  useEffect(() => {
    const { location } = props.startForm;
    return props.fetchAllCaterers({ location, term, price });
  }, [price, rating, term]);

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
    if (priceOptions.value) {
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

  // window.localStorage.setItem('userSelectedFilter', priceToSend);

  let allCaterers = props.caterers.filter((caterer) => {
    return caterer.is_claimed === true && caterer.rating >= 3.5;
  });

  return (
    <>
      <form style={{ width: '100px' }} onSubmit={handlePriceSelect(price)}>
        <Select
          defaultValue={priceOptions[4]}
          // isMulti
          name="price"
          options={priceOptions}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={handlePriceSelect}
        />
      </form>
      <div>
        {/* <form onSubmit={handleCuisineSelect(price)}>
          <Select
            defaultValue={cuisineOptions[4]}
            // isMulti
            name="cuisine"
            options={cuisineOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleCuisineSelect}
          />
          <button type="submit">Search</button>
        </form> */}
      </div>
      {allCaterers?.length ? (
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
      )}
    </>
  );
}

const mapState = (state) => ({
  caterers: state.caterers,
  caterer: state.singleCaterer,
  startForm: state.startFormReducer,
});

const mapDispatch = (dispatch) => {
  return {
    fetchAllCaterers: ({ location, term, price }) => {
      dispatch(fetchAllCaterers({ location, term, price }));
    },
    fetchSingleCaterer: (yelpId) => {
      dispatch(fetchSingleCaterer(yelpId));
    },
  };
};
export default connect(mapState, mapDispatch)(AllCaterers);

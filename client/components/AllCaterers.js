import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllCaterers } from '../redux/caterer';
import { fetchSingleCaterer } from '../redux/singleCaterer';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';

function AllCaterers(props) {
  const [catererName, setCatererName] = useState('');
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState('');
  const [rating, setRating] = useState('');
  const [term, setTerm] = useState('');

  let allCaterers = props.caterers;

  window.localStorage.removeItem('pathVisiting');

  useEffect(() => {
    const { location } = props.startForm;
    return props.fetchAllCaterers({ location, term, price });
  }, [catererName, address, price, rating, term]);

  const handleClick = (e) => {
    const yelpId = e.target.name;
    props.fetchSingleCaterer(yelpId);
  };

  const handlePriceSelect = (eventKey) => {
    if (eventKey !== 'All') {
      setPrice(eventKey);
    } else {
      setPrice('');
    }
  };

  const handleCuisineSelect = (eventKey) => {
    if (eventKey !== 'All') {
      setTerm(eventKey);
    } else {
      setTerm('');
    }
  };

  // window.localStorage.setItem('userSelectedFilter', priceToSend);

  return (
    <>
      <p>Price:{price}</p>
      <p>Cuisine:{term}</p>
      <div>
        <Dropdown onSelect={handlePriceSelect}>
          <Dropdown.Toggle variant='success' id='dropdown-basic'>
            Price{' '}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey='1'>$</Dropdown.Item>
            <Dropdown.Item eventKey='2'>$$</Dropdown.Item>
            <Dropdown.Item eventKey='3'>$$$</Dropdown.Item>
            <Dropdown.Item eventKey='4'>$$$$</Dropdown.Item>
            <Dropdown.Item eventKey='All'>All</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div>
        <Dropdown onSelect={handleCuisineSelect}>
          <Dropdown.Toggle variant='success' id='dropdown-basic'>
            Cuisine{' '}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey='American'>American</Dropdown.Item>
            <Dropdown.Item eventKey='Italian'>Italian</Dropdown.Item>
            <Dropdown.Item eventKey='Mexican'>Mexican</Dropdown.Item>
            <Dropdown.Item eventKey='Asian'>Asian</Dropdown.Item>
            <Dropdown.Item eventKey='All'>All</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
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

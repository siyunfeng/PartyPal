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

  let allCaterers = props.caterers;

  useEffect(() => {
    const { location } = props.startForm;
    return props.fetchAllCaterers({ location, term: '', price });
  }, [catererName, address, price, rating]);

  const handleClick = (e) => {
    const yelpId = e.target.name;
    props.fetchSingleCaterer(yelpId);
  };

  const handleSelect = (eventKey) => {
    if (eventKey !== 'All') {
      setPrice(eventKey);
    } else {
      setPrice('');
    }
  };

  console.log(allCaterers);

  return (
    <>
      <div>
        <Dropdown onSelect={handleSelect}>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Price{' '}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey="1">$</Dropdown.Item>
            <Dropdown.Item eventKey="2">$$</Dropdown.Item>
            <Dropdown.Item eventKey="3">$$$</Dropdown.Item>
            <Dropdown.Item eventKey="4">$$$$</Dropdown.Item>
            <Dropdown.Item eventKey="All">All</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      {allCaterers?.length ? (
        allCaterers.map((caterer) => {
          return (
            <div key={caterer.id}>
              <Card className="mb-4" style={{ width: '18rem' }}>
                <Card.Img variant="top" src={caterer.photos[0]} />
                <Card.Body>
                  <Card.Title>{caterer.name}</Card.Title>
                  <Card.Text>{caterer.price}</Card.Text>
                  <Card.Text>Overall Rating: {caterer.rating}</Card.Text>
                  <Link to={`/singleCaterer/${caterer.id}`}>
                    <Button
                      variant="primary"
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

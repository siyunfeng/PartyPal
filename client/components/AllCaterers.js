import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchAllCaterers, fetchSingleCaterer } from '../redux/caterer';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function AllCaterers(props) {
  const [catererName, setCatererName] = useState('');
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState('');
  const [rating, setRating] = useState('');

  useEffect(() => {
    return props.fetchAllCaterers();
  }, [catererName, address, price, rating]);

  const handleClick = (e) => {
    const yelpId = e.target.name;
    props.fetchSingleCaterer(yelpId);
    console.log('hi');
  };

  return (
    <>
      <p>This is all caterers</p>
      {props.caterers.map((caterer) => {
        return (
          <div key={caterer.id}>
            <Card className="mb-4" style={{ width: '18rem' }}>
              <Card.Img variant="top" src={caterer.photos[0]} />
              <Card.Body>
                <Card.Title>{caterer.name}</Card.Title>
                <Card.Text>{caterer.price}</Card.Text>
                <Card.Text>Overall Rating: {caterer.rating}</Card.Text>
                <Button
                  variant="primary"
                  name={caterer.id}
                  onClick={(e) => handleClick(e)}
                >
                  See More
                </Button>
              </Card.Body>
            </Card>
          </div>
        );
      })}
    </>
  );
}
const mapState = (state) => ({
  caterers: state.caterers,
  caterer: state.caterer,
});

const mapDispatch = (dispatch) => {
  return {
    fetchAllCaterers: () => {
      dispatch(fetchAllCaterers());
    },
    fetchSingleCaterer: (yelpId) => {
      dispatch(fetchSingleCaterer(yelpId));
    },
  };
};
export default connect(mapState, mapDispatch)(AllCaterers);

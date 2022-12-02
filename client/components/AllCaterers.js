import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllCaterers } from '../redux/caterer';
import { fetchSingleCaterer } from '../redux/singleCaterer';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function AllCaterers(props) {
  const [catererName, setCatererName] = useState('');
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState('');
  const [rating, setRating] = useState('');

  useEffect(() => {
    const { location } = props.startForm;
    return props.fetchAllCaterers({ location, term: 'italian' });
  }, [catererName, address, price, rating]);

  const handleClick = (e) => {
    const yelpId = e.target.name;
    props.fetchSingleCaterer(yelpId);
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
      })}
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
    fetchAllCaterers: ({ location, term }) => {
      dispatch(fetchAllCaterers({ location, term }));
    },
    fetchSingleCaterer: (yelpId) => {
      dispatch(fetchSingleCaterer(yelpId));
    },
  };
};
export default connect(mapState, mapDispatch)(AllCaterers);

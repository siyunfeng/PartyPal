import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchAllCaterers } from '../redux/caterer';
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

  const allCaterers = props.caterers;

  return (
    <>
      <p>This is all caterers</p>
      {allCaterers.map((caterer) => {
        return (
          <div key={caterer.id}>
            <Card className="mb-4" style={{ width: '18rem' }}>
              <Card.Img variant="top" src={caterer.photos[0]} />
              <Card.Body>
                <Card.Title>{caterer.name}</Card.Title>
                <Card.Text>{caterer.price}</Card.Text>
                <Card.Text>Overall Rating: {caterer.rating}</Card.Text>
                <Button variant="primary">See More</Button>
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
});

const mapDispatch = (dispatch) => {
  return {
    fetchAllCaterers: () => {
      dispatch(fetchAllCaterers());
    },
  };
};
export default connect(mapState, mapDispatch)(AllCaterers);

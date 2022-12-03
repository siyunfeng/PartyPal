import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSingleCaterer } from '../redux/singleCaterer';
import { convert, findDayOfWeek } from '../../helperFunctions';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const SingleCaterer = (props) => {
  const business = props?.caterer?.business;

  useEffect(() => {
    const yelpId = props.match.params;
    props.fetchSingleCaterer(yelpId);
  }, []);

  if (!business) return null;

  const open = convert(business.hours[0].open[0].start);
  const close = convert(business.hours[0].open[0].end);
  const daysOpen = business.hours[0].open.map((day) => {
    return `${findDayOfWeek(day.day)} `;
  });

  let counter = 0;

  const reviews = business.reviews.map((review) => {
    counter += 1;
    return ` ${counter}.  ${review.text} `;
  });

  const { name, rating, photos, phone, price } = business;
  return (
    <div>
      <h1>{name}</h1>
      <Card className="text-center">
        <Card.Header>Caterer</Card.Header>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Img className="img" variant="top" src={photos} />
          <Card.Text>
            <strong>Phone:</strong> {phone}
          </Card.Text>
          <Card.Text>
            <strong>Price:</strong> {price}
          </Card.Text>
          <Card.Text>
            <strong>Open:</strong> {open}
          </Card.Text>
          <Card.Text>
            <strong>Closes:</strong> {close}
          </Card.Text>
          <Card.Text>
            <strong>Days Open:</strong> {daysOpen}
          </Card.Text>
          <Card.Text>
            <strong>Overall rating:</strong> {rating}
          </Card.Text>
          <Card.Text>
            <strong>Reviews:</strong> {reviews}
          </Card.Text>
          <Link to="/allCaterers">
            <Button variant="primary">Go Back</Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log('this is state', state);
  return {
    caterer: state.singleCaterer,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchSingleCaterer: (yelpId) => {
      dispatch(fetchSingleCaterer(yelpId));
    },
  };
};

export default connect(mapStateToProps, mapDispatch)(SingleCaterer);

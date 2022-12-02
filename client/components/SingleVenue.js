import React from 'react';
import { connect } from 'react-redux';
import { getSingleVenueThunk } from '../redux/singleVenue';
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { convert, findDayOfWeek } from '../../helperFunctions';
import { Link } from 'react-router-dom';

const SingleVenue = (props) => {
  const business = props?.venue?.data?.business;

  useEffect(() => {
    const yelpId = props.match.params;
    console.log('YELPPPPPP', yelpId);
    props.getSingleVenue(yelpId);
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
      {/* dont know which one to keep */}
      {/* <Card>
        <Card.Header>Venue</Card.Header>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Img className='img' variant='top' src={photos} />
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
            <strong>Closes</strong> {close}
          </Card.Text>
          <Card.Text>{daysOpen}</Card.Text>
          <Card.Text>
            <strong>Overall rating</strong> {rating}
          </Card.Text>
          <Card.Text>
            <strong>Reviews:</strong> {reviews}
          </Card.Text>
          <Link to='/allVenues'>
            <Button variant='primary'>Go Back</Button>
          </Link>
        </Card.Body>
      </Card> */}
      <Card className='text-center'>
        <Card.Header>Venue</Card.Header>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Img className='img' variant='top' src={photos} />
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
          <Link to='/allVenues'>
            <Button variant='primary'>Go Back</Button>
          </Link>
        </Card.Body>
        {/* <Card.Footer className="text-muted">2 days ago</Card.Footer> */}
      </Card>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    venue: state.singleVenue,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getSingleVenue: (yelpId) => {
      dispatch(getSingleVenueThunk(yelpId));
    },
  };
};

export default connect(mapStateToProps, mapDispatch)(SingleVenue);

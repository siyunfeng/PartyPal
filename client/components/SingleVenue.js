import React from 'react';
import { connect } from 'react-redux';
import { getSingleVenueThunk } from '../redux/singleVenue';
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { convert, findDayOfWeek } from '../../helperFunctions';
import { Link } from 'react-router-dom';
import axios from 'axios';

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

  const saveLikedItem = async (e, venueInfo) => {
    console.log('venue id', e.target.name);
    const loggedInUserToken = window.localStorage.getItem('token');
    // attaching token to venueInfo since I will need it to find a user when login
    // works
    venueInfo.token = loggedInUserToken
    console.log('venueInfo', venueInfo)

    

    if (loggedInUserToken) {
      const saving = await axios.post(`/api/likedItems/${e.target.name}`, venueInfo);
      console.log('returned true!');
    }
    //else trigger sign up component
  };

  return (
    <div>
      <h1>{name}</h1>
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
          <Button
            variant='outline-success'
            name={business.id}
            onClick={(e) => {
              const venueInfo = {
                name: name, 
                category: 'venue', 
                image_url: photos,
              }
              saveLikedItem(e, venueInfo);
            }}
          >
            Like
          </Button>{' '}
          <Link to='/allVenues'>
            <Button variant='outline-primary'>Go Back</Button>{' '}
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

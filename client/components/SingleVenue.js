import React from 'react';
import { connect } from 'react-redux';
import { getSingleVenueThunk } from '../redux/singleVenue';
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { convert, findDayOfWeek } from '../../helperFunctions';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ModalSignUpandLogIn from './ModalSignUpAndLogin';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';


const SingleVenue = (props) => {
  const business = props?.venue?.data?.business;

  useEffect(() => {
    const yelpId = props.match.params;
    props.getSingleVenue(yelpId);
  }, []);

  if (!business) return null;

  let counter = 0;

  const reviews = business.reviews.map((review) => {
    counter += 1;
    return ` ${counter}.  ${review.text} `;
  });

  const { name, rating, photos, phone, price, hours } = business;

  const urlVisiting = props.history.location.pathname;

  if (!window.localStorage.getItem('token')) {
    window.localStorage.setItem('pathVisiting', urlVisiting);
  }

  const saveLikedItem = async (e, venueInfo) => {
    const idToSave = e.target.name;
    const loggedInUserToken = window.localStorage.getItem('token');

    venueInfo.token = loggedInUserToken;

    if (loggedInUserToken) {
      const token = window.localStorage.getItem('token');
      const saving = await axios.post(
        `/api/likedItems/venue/${idToSave}`,
        venueInfo,
        {
          headers: {
            authorization: token,
          },
        }
      );
    }
  };

  const renderTooltip = (props) => (
    <Tooltip id='button-tooltip' {...props}>
      Like to save to user dashboard
    </Tooltip>
  );

  let newPhone;
  if (phone) {
    if (phone.charAt(1) !== '1') {
      newPhone = phone;
    } else {
      newPhone =
        '(' +
        phone.slice(2, 5) +
        ') ' +
        phone.slice(5, 8) +
        '-' +
        phone.slice(8, 12);
    }
  } else {
    newPhone = 'No information available';
  }

  return (
    <div>
      <h1>{name ? name : ''}</h1>
      <Card className='text-center'>
        <Card.Header>Venue</Card.Header>
        <Card.Body>
          <Card.Title>{name ? name : 'No information available'}</Card.Title>
          <Card.Img
            className='img'
            variant='top'
            src={
              photos.length
                ? photos
                : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAh8YVQhMCGhp1xDo9Pew7q0W4H1zLD-9wbA&usqp=CAU'
            }
          />
          <Card.Text>
            <strong>Phone: </strong> {newPhone}
          </Card.Text>
          <Card.Text>
            <strong>Price: </strong>{' '}
            {price ? price : 'No information available'}
          </Card.Text>
          <Card.Text>
            <strong>Open: </strong>
            {hours.length
              ? convert(business.hours[0].open[0].start)
              : 'No information available'}
          </Card.Text>
          <Card.Text>
            <strong>Closes: </strong>
            {hours.length
              ? convert(business.hours[0].open[0].end)
              : 'No information available'}
          </Card.Text>
          <Card.Text>
            <strong>Days Open: </strong>
            {hours.length
              ? business.hours[0].open.map((day) => {
                  return ` ${findDayOfWeek(day.day)}, `;
                })
              : 'No information available'}
          </Card.Text>
          <Card.Text>
            <strong>Overall rating: </strong>
            {rating ? rating : 'No information available'}
          </Card.Text>
          <Card.Text>
            <strong>Reviews:</strong>
            {reviews ? reviews : 'No reviews available'}
          </Card.Text>
          {window.localStorage.getItem('token') ? (
            <OverlayTrigger
              placement='top'
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip}
            >
              <Button
                variant='outline-success'
                name={business.id}
                onClick={(e) => {
                  const venueInfo = {
                    name,
                    category: 'venue',
                    image_url: photos,
                  };
                  saveLikedItem(e, venueInfo);
                }}
              >
               Like
              </Button>
            </OverlayTrigger>
          ) : (
            <ModalSignUpandLogIn
              id={business.id}
              name={name}
              category={'venue'}
              image_url={photos}
              urlVisted={urlVisiting}
            />
          )}
          <Link to='/allVenues'>
            <Button variant='outline-primary'>Go Back</Button>
          </Link>
        </Card.Body>
        {/* <Card.Footer className="text-muted">2 days ago</Card.Footer> */}
      </Card>
    </div>
  );
};

const mapStateToProps = (state) => {
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

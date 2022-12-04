import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSingleCaterer } from '../redux/singleCaterer';
import { convert, findDayOfWeek } from '../../helperFunctions';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ModalSignUpandLogIn from './ModalSignUpAndLogin';
import axios from 'axios'

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

  // irais
  const urlVisiting = props.history.location.pathname;

  // if there is a token don't save url history
  // if there is a token do save it
  if (!window.localStorage.getItem('token')) {
    window.localStorage.setItem('pathVisiting', urlVisiting);
  }

  const saveLikedItem = async (e, cateringInfo) => {
    const idToSave = e.target.name;
    const loggedInUserToken = window.localStorage.getItem('token');
    // attaching token to cateringInfo since I will need it to find a user when login works
    cateringInfo.token = loggedInUserToken;
    console.log('cateringInfo', cateringInfo);

    if (loggedInUserToken) {
      const saving = await axios.post(
        `/api/likedItems/caterer/${idToSave}`,
        cateringInfo
      );
      console.log('returned from saving! in single catering', saving);
    }
  };

  //irais

  return (
    <div>
      <h1>{name}</h1>
      <Card className='text-center'>
        <Card.Header>Caterer</Card.Header>
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
          {/* added lines 92 - 117 -irais  */}
          {window.localStorage.getItem('token') ? (
            <Button
              variant='outline-success'
              name={business.id}
              onClick={(e) => {
                const cateringInfo = {
                  name: name,
                  category: 'caterer',
                  image_url: photos,
                };
                saveLikedItem(e, cateringInfo);
              }}
            >
              Like
            </Button>
          ) : (
            <ModalSignUpandLogIn
              id={business.id}
              name={name}
              category={'caterer'}
              image_url={photos}
              urlVisted={urlVisiting}
            />
          )}
          {/* added lines 92 - 117 -irais  */}
          <Link to='/allCaterers'>
            <Button variant='primary'>Go Back</Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
};

const mapStateToProps = (state) => {
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

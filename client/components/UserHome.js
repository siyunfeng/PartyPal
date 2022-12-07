import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { getEvents } from '../redux/events';
import {
  deleteCatererLikedItem,
  deleteVenueLikedItem,
  getFavorites,
} from '../redux/favorites';
import Card from 'react-bootstrap/Card';
import { fetchSingleCaterer } from '../redux/singleCaterer';
import { getSingleVenueThunk } from '../redux/singleVenue';

const UserHome = (props) => {
  let { id, username, email } = props.user;
  let {
    events,
    favorites: { venues, caterers },
    getEvents,
    getFavorites,
    fetchSingleCaterer,
    getSingleVenueThunk,
    deleteCatererLikedItem,
    deleteVenueLikedItem,
  } = props;

  useEffect(() => {
    if (id) {
      getEvents(id);
      getFavorites(id);
    }
  }, [id]);

  const handleCatererClick = (e) => {
    const yelpId = e.target.name;
    fetchSingleCaterer(yelpId);
  };

  const handleVenueClick = (e) => {
    const yelpId = e.target.name;
    getSingleVenueThunk(yelpId);
  };

  const handleDeleteCaterer = (favoriteId) =>
    deleteCatererLikedItem(favoriteId);

  const handleDeleteVenue = (favoriteId) => deleteVenueLikedItem(favoriteId);

  return (
    <>
      {id ? (
        <div>
          <div className='user-profile'>
            <div>
              <p>Username: {username}</p>
              <p>Email: {email}</p>
            </div>
          </div>
          <div>
            <Link to='/start'>
              <Button>Start Planning</Button>
            </Link>
          </div>
          <div className='user-home-events'>
            <div>
              <div>
                <h4>Events</h4>
                <Link to='/new-event'>
                  <Button>Create Future Event</Button>
                </Link>
              </div>
              {events?.length ? (
                events.map((event, index) => {
                  return (
                    <div className='user-home-upcomings' key={index}>
                      <div>
                        {event.date} {event.time}
                      </div>
                      <div>{event.name}</div>
                    </div>
                  );
                })
              ) : (
                <div>You have no upcoming events at this time.</div>
              )}
            </div>
          </div>
          <div className='user-home-favorite'>
            <h4>Favorite</h4>
            <div className='each-favorite-venue-container'>
              <h6>Venues</h6>
              {venues?.length ? (
                venues.map((venue, index) => {
                  return (
                    <UserHomeFlex key={index}>
                      <Card key={index} style={{ width: '18rem' }}>
                        <Link to={`/singleVenue/${venue.yelp_reference_id}`}>
                          <Card.Img
                            name={venue.yelp_reference_id}
                            onClick={handleVenueClick}
                            variant='top'
                            src={venue.image_url}
                          />
                        </Link>
                        <Card.Body>
                          <Link
                            to={`/singleVenue/${venue.yelp_reference_id}`}
                            style={{ textDecoration: 'none' }}
                          >
                            <Card.Title>
                              {venue.name
                                ? venue.name
                                : 'venue name is not available'}
                            </Card.Title>
                          </Link>
                          <Button
                            onClick={() => handleDeleteVenue(venue.id)}
                            variant='primary'
                          >
                            Delete
                          </Button>
                        </Card.Body>
                      </Card>
                    </UserHomeFlex>
                  );
                })
              ) : (
                <p>You did not save any venues in your favorite yet.</p>
              )}
            </div>
            <div className='each-favorite-caterer-container'>
              <h6>Catering</h6>
              {caterers?.length ? (
                caterers.map((caterer, index) => {
                  return (
                    <UserHome key={index}>
                      <Card key={index} style={{ width: '18rem' }}>
                        <Link
                          to={`/singleCaterer/${caterer.yelp_reference_id}`}
                        >
                          <Card.Img
                            name={caterer.yelp_reference_id}
                            onClick={handleCatererClick}
                            variant='top'
                            src={caterer.image_url}
                          />
                        </Link>
                        <Card.Body>
                          <Link
                            to={`/singleCaterer/${caterer.yelp_reference_id}`}
                            style={{ textDecoration: 'none' }}
                          >
                            <Card.Title>
                              {caterer.name
                                ? caterer.name
                                : 'caterer name is not available'}
                            </Card.Title>
                          </Link>
                          <Button
                            onClick={() => handleDeleteCaterer(caterer.id)}
                            variant='primary'
                          >
                            Delete
                          </Button>
                        </Card.Body>
                      </Card>
                    </UserHome>
                  );
                })
              ) : (
                <p>You did not save any caterers in your favorite yet.</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <h3>
          Please <Link to='/login'>log in</Link> your account.
        </h3>
      )}
    </>
  );
};

const mapState = (state) => {
  return {
    user: state.auth,
    events: state.events,
    favorites: state.favorites,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getEvents: (userId) => dispatch(getEvents(userId)),
    getFavorites: (userId) => dispatch(getFavorites(userId)),
    fetchSingleCaterer: (yelpId) => dispatch(fetchSingleCaterer(yelpId)),
    getSingleVenueThunk: (yelpId) => dispatch(getSingleVenueThunk(yelpId)),
    deleteVenueLikedItem: (favoriteId) =>
      dispatch(deleteVenueLikedItem(favoriteId)),
    deleteCatererLikedItem: (favoriteId) =>
      dispatch(deleteCatererLikedItem(favoriteId)),
  };
};

export default connect(mapState, mapDispatch)(UserHome);

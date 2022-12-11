import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { getEvents, deleteEvent } from '../redux/events';
import {
  deleteCatererLikedItem,
  deleteVenueLikedItem,
  getFavorites,
} from '../redux/favorites';
import Card from 'react-bootstrap/Card';
import { fetchSingleCaterer } from '../redux/singleCaterer';
import { getSingleVenueThunk } from '../redux/singleVenue';
import UserHomeFlex from './Styled-Components/UserHomeFlex.styled';
import { Trash, PencilSquare } from 'react-bootstrap-icons';
import { convert, findDayOfWeek } from '../../helperFunctions';
import FlexBox from './Styled-Components/FlexBox.styled';
import { getSingleEvent } from '../redux/singleEvent';

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
    deleteEvent,
    getSingleEvent,
  } = props;

  if (events) {
    events.sort((a, b) => new Date(b.date) - new Date(a.date)).reverse();
  }

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

  const handleDeleteEvent = (eventId) => deleteEvent(eventId);

  return (
    <>
      {id ? (
        <div id='home-div'>
          <br></br>
          <h1 className='welcome-top fatface-font'>Welcome {username}!</h1>
          <br></br>
          <br></br>
          <a href='#my-events'>
            <Button variant='primary' className='welcome-top cardo-font'>
              <strong>View My Events</strong>
            </Button>
          </a>
          <a className='cardo-font text-decoration' href='#my-liked-list'>
            <Button variant='primary' className='welcome-top cardo-font'>
              <strong>View My Liked List</strong>
            </Button>
          </a>
          <div className='user-profile smallerUserHomeCards'>
            <h4 className='welcome-div'>Account Information</h4>
            <hr></hr>
            <div>
              <div className='account-info'>
                <strong>Username: </strong>
                <p className='cardo-font'>{username}</p>
              </div>
              <div className='account-info'>
                <strong>Email: </strong>
                <p className='cardo-font'>{email}</p>
              </div>
            </div>
          </div>
          <br></br>
          <div></div>
          <div className='user-home-events'>
            <div className='user-home-favorite favoriteSelectionsCard'>
              <h4 id='my-liked-list' className='welcome-div'>
                My Liked List
              </h4>
              <hr></hr>
              <br></br>
              <div>
                <h5 className='welcome-div'>Venues</h5>
                <hr></hr>
                <div className='each-favorite-venue-container'>
                  {venues?.length ? (
                    venues.map((venue, index) => {
                      return (
                        <div key={index} className='liked-items'>
                          <Card>
                            <Link
                              to={`/singleVenue/${venue.yelp_reference_id}`}
                            >
                              <Card.Img
                                name={venue.yelp_reference_id}
                                onClick={handleVenueClick}
                                variant='top'
                                src={venue.image_url}
                                className='liked-items-img'
                              />
                            </Link>
                            <Card.Body>
                              <Link
                                to={`/singleVenue/${venue.yelp_reference_id}`}
                                className='text-decoration'
                              >
                                <Card.Title className='liked-items-title'>
                                  {venue.name
                                    ? venue.name
                                    : 'venue name is not available'}
                                </Card.Title>
                              </Link>
                              <Button
                                onClick={() => handleDeleteVenue(venue.id)}
                                variant='danger'
                                className='cardo-font'
                              >
                                <Trash />
                              </Button>
                            </Card.Body>
                          </Card>
                        </div>
                      );
                    })
                  ) : (
                    <p>You did not save any venues in your favorite yet.</p>
                  )}
                </div>
                <br></br>
              </div>
              <div>
                <h5 className='welcome-div'>Catering</h5>
                <hr></hr>
                <div className='each-favorite-caterer-container'>
                  {caterers?.length ? (
                    caterers.map((caterer, index) => {
                      return (
                        <div key={index} className='liked-items'>
                          <Card>
                            <Link
                              to={`/singleCaterer/${caterer.yelp_reference_id}`}
                            >
                              <Card.Img
                                name={caterer.yelp_reference_id}
                                onClick={handleCatererClick}
                                variant='top'
                                src={caterer.image_url}
                                className='liked-items-img'
                              />
                            </Link>
                            <Card.Body>
                              <Link
                                to={`/singleCaterer/${caterer.yelp_reference_id}`}
                                className='text-decoration'
                              >
                                <Card.Title className='liked-items-title'>
                                  {caterer.name
                                    ? caterer.name
                                    : 'caterer name is not available'}
                                </Card.Title>
                              </Link>
                              <Button
                                onClick={() => handleDeleteCaterer(caterer.id)}
                                variant='danger'
                              >
                                <Trash />
                              </Button>
                            </Card.Body>
                          </Card>
                        </div>
                      );
                    })
                  ) : (
                    <p>You did not save any caterers in your favorite yet.</p>
                  )}
                </div>
              </div>
            </div>
            <div className='smallerUserHomeCards'>
              <h4 id='my-events' className='welcome-div'>
                My Events
              </h4>
              <br></br>
              <div>
                <Link to='/new-event'>
                  <Button className='welcome-div cardo-font'>
                    <strong>Create Future Event</strong>
                  </Button>
                </Link>
              </div>
              <br></br>
              {events?.length ? (
                events.map((event, index) => {
                  return (
                    <div className='user-home-upcomings' key={index}>
                      <Card className='event-details'>
                        <Card.Body>
                          <Card.Title className='DM-Serif-display-font'>
                            {event.name
                              ? event.name
                              : 'Event name is not available at this time'}
                          </Card.Title>
                          <hr></hr>
                          <Card.Text>
                            <strong>Date: </strong>
                            {event.date
                              ? event.date
                              : 'Event date is not available at this time'}
                          </Card.Text>
                          <Card.Text>
                            <strong>Time: </strong>
                            {event.time
                              ? convert(event.time)
                              : 'Event time is not available at this time'}
                          </Card.Text>
                          <Card.Text>
                            <strong>Venue: </strong>
                            {event.venue ? (
                              <Link
                                to={`/singleVenue/${event.venueYelpId}`}
                                className='text-decoration'
                              >
                                {event.venue}
                              </Link>
                            ) : (
                              'You did not choose your venue yet'
                            )}
                          </Card.Text>
                          <Card.Text>
                            <strong>Caterer: </strong>
                            {event.catering ? (
                              <Link
                                to={`/singleCaterer/${event.cateringYelpId}`}
                                className='text-decoration'
                              >
                                {event.catering}
                              </Link>
                            ) : (
                              'You did not choose your caterer yet'
                            )}
                          </Card.Text>
                          <div className='btn-event-edit-delete'>
                            <div>
                              <Link
                                to={`/editEvent/${event.id}`}
                                value={event.id}
                                onClick={() => {
                                  getSingleEvent(event.id);
                                }}
                              >
                                <Button>
                                  <PencilSquare />
                                </Button>
                              </Link>
                            </div>
                            <div>
                              <Button
                                onClick={() => handleDeleteEvent(event.id)}
                                variant='danger'
                              >
                                <Trash />
                              </Button>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                      <br></br>
                    </div>
                  );
                })
              ) : (
                <FlexBox>
                  <div>
                    <strong className='cardo-font'>
                      You have no upcoming events at this time.
                    </strong>
                  </div>
                </FlexBox>
              )}
              <br></br>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <br></br>
          <h3 className='welcome-div DM-Serif-display-font'>
            Please <Link to='/login'>log in</Link> to your account to view your
            dashboard.
          </h3>
        </div>
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
    deleteEvent: (eventId) => dispatch(deleteEvent(eventId)),
    getSingleEvent: (eventId) => dispatch(getSingleEvent(eventId)),
  };
};

export default connect(mapState, mapDispatch)(UserHome);

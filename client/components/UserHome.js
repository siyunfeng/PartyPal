import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { getEvents } from '../redux/events';
import { getFavorites } from '../redux/favorites';
import Card from 'react-bootstrap/Card';
import { fetchSingleCaterer } from '../redux/singleCaterer';
import { getSingleVenueThunk } from '../redux/singleVenue';

const UserHome = (props) => {
  let { id, username, email } = props.user;

  useEffect(() => {
    if (id) {
      // console.log('UserHome useEffect id =', id);
      props.getEvents(id);
      props.getFavorites(id);
    }
  }, [id]);

  let {
    events,
    favorites: { venues, caterers },
  } = props;

  const handleCatererClick = (e) => {
    const yelpId = e.target.name;
    props.fetchSingleCaterer(yelpId);
  };

  const handleVenueClick = (e) => {
    const yelpId = e.target.name;
    props.getSingleVenueThunk(yelpId);
  };

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
                        <Button variant='primary'>Delete</Button>
                      </Card.Body>
                    </Card>
                    // <div className='user-favorite-venues' key={index}>
                    //   <div className='each-favorite-venues-container'>
                    //     <div>
                    //       <img className='' src={venue.image_url} />
                    //     </div>
                    //     <div>
                    //       <p>
                    //         {venue.name
                    //           ? venue.name
                    //           : 'venue name is not available'}
                    //       </p>
                    //       <Button>Delete</Button>
                    //     </div>
                    //   </div>
                    // </div>
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
                    <Card key={index} style={{ width: '18rem' }}>
                      <Link to={`/singleCaterer/${caterer.yelp_reference_id}`}>
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
                        <Button variant='primary'>Delete</Button>
                      </Card.Body>
                    </Card>
                    // <div className='user-favorite-caterers' key={index}>
                    //   <div className='each-favorite-caterer-container'>
                    //     <div>
                    //       <img src={caterer.image_url} />
                    //     </div>
                    //     <div>
                    //       <p>
                    //         {caterer.name
                    //           ? caterer.name
                    //           : 'caterer name is not available'}
                    //       </p>
                    //       <Button>Delete</Button>
                    //     </div>
                    //   </div>
                    // </div>
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
  console.log('UserHome >>>> state', state);
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
  };
};

export default connect(mapState, mapDispatch)(UserHome);

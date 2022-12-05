import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { getEvents } from '../redux/events';
import { getFavorites } from '../redux/favorites';

const UserHome = (props) => {
  // NOTE: before showing login user it will display the user from the previous state

  let { id, username, email } = props.user;
  // console.log('UserHome >>>> props =', props, 'user.id =', id);
  // console.log('UserHome id =', id);

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
            <div>
              <h6>Venues</h6>
              {venues?.length ? (
                venues.map((venue, index) => {
                  return (
                    <div className='user-favorite-venues' key={index}>
                      <div>
                        <img src={venue.image_url} />
                        <p>
                          {venue.name
                            ? venue.name
                            : 'venue name is not available'}
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p>You did not save any venues in your favorite yet.</p>
              )}
            </div>
            <div>
              <h6>Catering</h6>
              {caterers?.length ? (
                caterers.map((caterer, index) => {
                  return (
                    <div className='user-favorite-caterers' key={index}>
                      <div>
                        <img src={caterer.image_url} />
                        <p>
                          {caterer.name
                            ? caterer.name
                            : 'caterer name is not available'}
                        </p>
                      </div>
                    </div>
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
  };
};

export default connect(mapState, mapDispatch)(UserHome);

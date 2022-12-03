import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getEvents } from '../redux/events';

const UserHome = (props) => {
  // NOTE: before showing login user it will display the user from the previous state
  let { id, username, firstName, lastName, email } = props.user;
  let { events } = props;

  useEffect(() => {
    if (id) {
      props.getEvents(id);
    }
  }, [id]);

  return (
    <div>
      <div className="user-profile">
        <div>
          <img />
        </div>
        <div>
          <p>Username: {username}</p>
          <p>Email: {email}</p>
        </div>
      </div>
      <div className="user-home-favorite">
        <h4>Favorite</h4>
        <div>
          <h6>Venues</h6>
        </div>
        <div>
          <h6>Catering</h6>
        </div>
      </div>
      <div className="user-home-events">
        <div>
          <div>
            <h4>Events</h4>
            <button>Create Future Event</button>
          </div>
          {events[0]?.length ? (
            events[0].map((event, index) => {
              return (
                <div className="user-home-upcomings" key={index}>
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
    </div>
  );
};

const mapState = (state) => {
  return {
    user: state.auth,
    events: state.events,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getEvents: (userId) => dispatch(getEvents(userId)),
  };
};

export default connect(mapState, mapDispatch)(UserHome);

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

const UserHome = (props) => {
  // console.log('UserHome user =', props.user);
  // const [user, setUser] = useState({})
  // NOTE: before showing login user it will display the user from the previous state
  const { username, firstName, lastName, email } = props.user;
  return (
    <div>
      <div className="user-profile">
        <div>
          {/* QUESTION: should the user be able to upload their profile photo? */}
          <img />
        </div>
        <div>
          <p>Username: {username}</p>
          <p>Email: {email}</p>
        </div>
      </div>
      <div className="user-home-favorite">
        <h2>Favorite</h2>
        <div>Venues</div>
        <div>Catering</div>
      </div>
      <div className="user-home-events">
        <div>
          <h2>Events</h2>
          <button>Create Future Event</button>
        </div>
        <div>the latest 3 upcoming events</div>
      </div>
    </div>
  );
};

const mapState = (state) => {
  console.log('UserHome mapState, state =', state);
  return {
    user: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {};
};

export default connect(mapState, mapDispatch)(UserHome);

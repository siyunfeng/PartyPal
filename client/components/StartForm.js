import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { sendInitialQuery } from '../redux/startForm';

const StartForm = ({ getRecommendations }) => {
  window.localStorage.removeItem('price');
  window.localStorage.removeItem('term');
  return (
    <div>
      {/* <Navbar /> */}
      {/* Carousel */}
      <div className="start-form">
        <div>
          <h3>What can we help you find?</h3>
        </div>
        <form onSubmit={getRecommendations} name="start-form">
          <div>
            <label htmlFor="serviceOptions">
              Step 1. What service you need
            </label>
          </div>
          <select id="serviceOption">
            <option value="catering">Caterer</option>
            <option value="venue">Venue</option>
          </select>
          <div>
            <label htmlFor="partyLocation">
              Step 2. Where will your party be held?
            </label>
          </div>
          <input
            type="text"
            id="location"
            name="location"
            placeholder="Enter location or zipcode"
          />
          <div>
            <button type="submit">Get Recommendations</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapState = (state) => {
  return {};
};

const mapDispatch = (dispatch, { history }) => {
  return {
    getRecommendations(event) {
      event.preventDefault();
      const service = document.getElementById('serviceOption').value;
      const location = event.target.location.value;
      const initialQuery = { service, location };
      dispatch(sendInitialQuery(initialQuery, history));
    },
  };
};

export default connect(mapState, mapDispatch)(StartForm);

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { sendInitialQuery } from '../redux/startForm';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const StartForm = ({ getRecommendations }) => {
  const classes = useStyles();

  window.localStorage.removeItem('price');
  window.localStorage.removeItem('term');
  return (
    <div>
      <div
        className='start-form'
        style={{ width: '350px', textAlign: 'center' }}
      >
        <div>
          <h3>What can we help you find?</h3>
        </div>
        <form
          className={classes.root}
          noValidate
          autoComplete='off'
          onSubmit={getRecommendations}
          name='start-form'
        >
          <div>
            <label htmlFor='serviceOptions'>
              What service can we help you find?
            </label>
          </div>
          <select id='serviceOption'>
            <option value='catering'>Caterer</option>
            <option value='venue'>Venue</option>
          </select>
          <div>
            <label htmlFor='partyLocation'>
              Where will your party be held?
            </label>
          </div>
          <TextField
            htmlFor='location'
            name='location'
            label='Location or Zip-Code'
            variant='outlined'
          />

          <div>
            <Button variant='contained' type='submit' color='primary'>
              Get Recommendations
            </Button>
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

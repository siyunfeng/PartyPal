import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { sendInitialQuery } from '../redux/startForm';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const StartForm = (props) => {
  const classes = useStyles();
  const [serviceOptionValue, setServiceOptionValue] = useState('');

  window.localStorage.removeItem('price');
  window.localStorage.removeItem('term');

  const getRecommendations = (event) => {
    event.preventDefault();
    const service = event.target.serviceOption.value;
    const location = event.target.location.value;
    const initialQuery = { service, location };
    props.sendInitialQuery(initialQuery, history);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        className='start-form'
        style={{ width: '350px', textAlign: 'center', alignItems: 'center' }}
      >
        <div>
          <h3>Ready for a Party?</h3>
        </div>
        <form
          className={classes.root}
          noValidate
          autoComplete='off'
          onSubmit={(event) => getRecommendations(event)}
          name='start-form'
        >
          <div>
            <label htmlFor='serviceOptions'>
              What service can we help you find?
            </label>
          </div>
          <FormControl variant='outlined'>
            <InputLabel>Service</InputLabel>
            <Select
              name='serviceOption'
              onChange={(e) => setServiceOptionValue(e.target.value)}
              value={serviceOptionValue}
            >
              <MenuItem value='catering'>Caterer</MenuItem>
              <MenuItem value='venue'>Venue</MenuItem>
            </Select>
            <div>
              <label htmlFor='partyLocation'>
                Where will your party be held?
              </label>
            </div>
          </FormControl>
          <TextField
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
    sendInitialQuery: (initialQuery) =>
      dispatch(sendInitialQuery(initialQuery, history)),
  };
};

export default connect(mapState, mapDispatch)(StartForm);

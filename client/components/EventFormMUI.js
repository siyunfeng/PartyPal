import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { createNewEvent } from '../redux/events';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const EventFormMUI = (props) => {
  const classes = useStyles();
  let { user, events, venues, caterers, createNewEvent } = props;

  const [venueOption, setVenueOption] = useState('');
  const [catererOption, setCatererOption] = useState('');

  const createEvent = (event) => {
    event.preventDefault();
    const userId = user.id; // works
    const eventName = event.target.eventName.value; // works
    const eventNote = event.target.eventNote.value; // works
    // console.log('user id =', user.id); // works
    // console.log('eventName =', eventName); // works
    // console.log('eventNote =', eventNote); // works
    // console.log('venueOption', venueOption); // works, the venue object user selected
    // console.log('catererOption', catererOption); // works, the caterer object user selected
    const eventVenue = event.target.eventVenue.value; // return [object object], not passing this
    const eventCaterer = event.target.eventCaterer.value; // return [object object], not passing this
    // console.log('venue name =', eventVenue); // [object, object]
    // console.log('caterer name =', eventCaterer); // [object, object]

    // need to work on data and time:
    // const eventDate = event.target.eventDate.value;
    // const eventTime = event.target.eventTime.value;

    // put all the input inside an object, pass the object by createNewEvent()
    const newEventInput = {
      userId,
      eventName,
      eventNote,
      venueOption,
      catererOption,
    };
    // call createNewEvent()
    createNewEvent(newEventInput);
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component='h1' variant='h5'>
          Create New Event
        </Typography>
        <form
          className={classes.form}
          name='eventForm'
          noValidate
          autoComplete='off'
          onSubmit={(event) => createEvent(event)}
        >
          <TextField
            name='eventName'
            label='Event Name'
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='event-name'
          />
          <FormControl variant='outlined' fullWidth margin='normal'>
            <InputLabel>Venue</InputLabel>
            <Select
              name='eventVenue'
              onChange={(event) => {
                console.log('eventVenue =', event.target.value);
                setVenueOption(event.target.value);
              }}
              value={venueOption}
            >
              {venues?.length ? (
                venues.map((venue, index) => (
                  <MenuItem key={index} value={venue}>
                    {venue.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value={`no venue`}>
                  Please add venue to your favorite
                </MenuItem>
              )}
            </Select>
          </FormControl>
          <FormControl variant='outlined' fullWidth margin='normal'>
            <InputLabel>Caterer</InputLabel>
            <Select
              name='eventCaterer'
              onChange={(event) => {
                console.log('eventCaterer =', event.target.value);
                setCatererOption(event.target.value);
              }}
              value={catererOption}
            >
              {caterers?.length ? (
                caterers.map((caterer, index) => (
                  <MenuItem key={index} value={caterer}>
                    {caterer.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value={`no caterer`}>
                  Please add caterer to your favorite
                </MenuItem>
              )}
            </Select>
          </FormControl>
          <TextField
            variant='outlined'
            margin='normal'
            fullWidth
            name='eventNote'
            label='Note'
            type='text'
            id='event-note'
          />

          <Button
            type='submit'
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Create Event
          </Button>
        </form>
      </div>
      <Box mt={8}></Box>
    </Container>
  );
};

const mapState = (state) => {
  console.log('EventFormMUI store state =', state);
  return {
    user: state.auth,
    events: state.events,
    venues: state.favorites.venues,
    caterers: state.favorites.caterers,
  };
};

const mapDispatch = (dispatch) => {
  return {
    createNewEvent: (newEventInput) => dispatch(createNewEvent(newEventInput)),
  };
};

export default connect(mapState, mapDispatch)(EventFormMUI);

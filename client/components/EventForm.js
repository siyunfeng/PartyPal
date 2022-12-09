import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
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
import FlexBox from './Styled-Components/FlexBox.styled';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PopUpDiv from './Styled-Components/FlexBox.styled';

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
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const EventForm = (props) => {
  const classes = useStyles();
  let { user, events, venues, caterers, createNewEvent } = props;

  const [venueOption, setVenueOption] = useState('');
  const [catererOption, setCatererOption] = useState('');
  const [dateOption, setDateOption] = useState('');
  const [timeOption, setTimeOption] = useState('');
  const [eventNameOption, setEventNameOption] = useState('');
  const [noteOption, setNoteOption] = useState('');
  const [lgShow, setLgShow] = useState(false);

  const createEvent = (event) => {
    event.preventDefault();
    const userId = user.id;
    const eventName = event.target.eventName.value;
    const eventNote = event.target.eventNote.value;

    const newEventInput = {
      userId,
      eventName,
      eventNote,
      venueOption,
      catererOption,
      dateOption,
      timeOption,
    };

    createNewEvent(newEventInput);
    setEventNameOption(eventName);
    setNoteOption(eventNote);
    setLgShow(true);
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <img src='/images/party-hat-3-64.png' width='40px'></img>
        <br></br>
        <Typography
          component='h1'
          variant='h5'
          style={{ fontFamily: 'DM Serif Display' }}
        >
          <strong>Create New Event</strong>
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
          <div className='eventFormDateTime'>
            <input
              type='date'
              className='eventFormDate'
              id='event-form-date'
              name='eventDate'
              min='2022-10-01'
              max='2099-12-31'
              value={dateOption}
              onChange={(event) => setDateOption(event.target.value)}
            />
            <input
              type='time'
              className='eventFormTime'
              id='event-form-time'
              name='eventTime'
              min='00:00'
              max='23:59'
              value={timeOption}
              onChange={(event) => setTimeOption(event.target.value)}
              required //not sure if we need it
            />
          </div>
          <FormControl variant='outlined' fullWidth margin='normal'>
            <InputLabel>Venue</InputLabel>
            <Select
              name='eventVenue'
              onChange={(event) => setVenueOption(event.target.value)}
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
                  Please add venue to your liked list
                </MenuItem>
              )}
            </Select>
          </FormControl>
          <FormControl variant='outlined' fullWidth margin='normal'>
            <InputLabel>Caterer</InputLabel>
            <Select
              name='eventCaterer'
              onChange={(event) => setCatererOption(event.target.value)}
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
                  Please add caterer to your liked list
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
          <FlexBox>
            <Button
              id='btn-submit-new-event'
              type='submit'
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              <strong style={{ fontFamily: 'Cardo' }}>Create Event</strong>
            </Button>
          </FlexBox>
        </form>
      </div>
      <Modal
        size='lg'
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby='example-modal-sizes-title-lg'
      >
        <Modal.Header closeButton>
          <Modal.Title id='example-modal-sizes-title-lg'>
            <h3>You created a new event! 🎉</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PopUpDiv className='new-event-popup'>
            <p>
              <strong>Event: </strong>
              {eventNameOption
                ? eventNameOption
                : 'You did not provide the event name'}
            </p>
            <p>
              <strong>Date: </strong>
              {dateOption ? dateOption : 'You did not select the date yet.'}
            </p>
            <p>
              <strong>Time: </strong>
              {timeOption ? timeOption : 'You did not select the time yet.'}
            </p>
            <p>
              <strong>Venue: </strong>
              {venueOption.name
                ? venueOption.name
                : 'You did not select any venues yet.'}
            </p>
            <p>
              <strong>Caterer: </strong>
              {catererOption.name
                ? catererOption.name
                : 'You did not select any caterers yet.'}
            </p>
            <p>
              <strong>Notes: </strong>
              {noteOption ? noteOption : 'You did not leave any notes.'}
            </p>
            <p>We hope you have a great event!</p>
            <Link to='/account'>
              <Button className='btn-back-to-my-acc'>Back to My Account</Button>
            </Link>
          </PopUpDiv>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

const mapState = (state) => {
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

export default connect(mapState, mapDispatch)(EventForm);

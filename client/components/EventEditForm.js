import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { editEvent } from '../redux/events';
import { getSingleEvent } from '../redux/singleEvent';
import FlexBox from './Styled-Components/FlexBox.styled';
import Button from 'react-bootstrap/Button';
import { ContactlessOutlined } from '@material-ui/icons';

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

const EventEditForm = (props) => {
  const classes = useStyles();
  let { venues, caterers, editEvent, singleEvent } = props;

  const [venueOption, setVenueOption] = useState('');
  const [catererOption, setCatererOption] = useState('');
  const [dateOption, setDateOption] = useState(singleEvent.date);
  const [timeOption, setTimeOption] = useState(singleEvent.time);
  const [eventNameOption, setEventNameOption] = useState(singleEvent.name);
  const [noteOption, setNoteOption] = useState(singleEvent.notes);
  const [eventId, setEventId] = useState(props.match.params.id);

  useEffect(() => {
    console.log('inside', eventNameOption, singleEvent.name);
  }, [eventId, eventNameOption]);

  const handleEditEvent = (event) => {
    event.preventDefault();
    const eventInfo = {
      eventId,
      eventNameOption,
      noteOption,
      venueOption,
      catererOption,
      dateOption,
      timeOption,
    };
    editEvent(eventInfo);
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
          <strong>Edit My Event</strong>
        </Typography>
        <form
          className={classes.form}
          name='eventForm'
          noValidate
          autoComplete='off'
          onSubmit={(event) => handleEditEvent(event)}
        >
          <TextField
            name='eventName'
            id='event-name'
            label='Event Name'
            value={eventNameOption}
            variant='outlined'
            margin='normal'
            fullWidth
            required
            onChange={(event) => setEventNameOption(event.target.value)}
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
              required
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
            <InputLabel>Please select venue from your liked list</InputLabel>
            <Select
              name='eventVenue'
              onChange={(event) => setVenueOption(event.target.value)}
              value={venueOption}
              required
            >
              {venues?.length ? (
                venues.map((venue, index) => (
                  <MenuItem key={index} value={venue}>
                    {venue.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value={`no venue`}>
                  No venue in your list, click on 'Start Planning' to like some
                  venues
                </MenuItem>
              )}
            </Select>
          </FormControl>
          <FormControl variant='outlined' fullWidth margin='normal'>
            <InputLabel>Please select caterer from your liked list</InputLabel>
            <Select
              name='eventCaterer'
              onChange={(event) => setCatererOption(event.target.value)}
              value={catererOption}
              required
            >
              {caterers?.length ? (
                caterers.map((caterer, index) => (
                  <MenuItem key={index} value={caterer}>
                    {caterer.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value={`no caterer`}>
                  No caterer in your list, click on 'Start Planning' to like
                  some caterers
                </MenuItem>
              )}
            </Select>
          </FormControl>
          <TextField
            id='event-note'
            name='eventNote'
            type='text'
            label='Note'
            variant='outlined'
            value={noteOption}
            margin='normal'
            fullWidth
            onChange={(event) => setNoteOption(event.target.value)}
          />
          <FlexBox>
            <Button
              id='btn-submit-new-event'
              type='submit'
              variant='contained'
              // color='primary'
              className={classes.submit}
            >
              <strong style={{ fontFamily: 'Cardo' }}>Submit Changes</strong>
            </Button>
          </FlexBox>
        </form>
      </div>
    </Container>
  );
};

const mapState = (state) => {
  return {
    singleEvent: state.singleEvent,
    venues: state.favorites.venues,
    caterers: state.favorites.caterers,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getSingleEvent: (eventId) => {
      dispatch(getSingleEvent(eventId));
    },
    editEvent: (eventInfo) => {
      dispatch(editEvent(eventInfo));
    },
  };
};

export default connect(mapState, mapDispatch)(EventEditForm);

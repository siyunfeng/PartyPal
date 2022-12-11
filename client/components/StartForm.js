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
import Avatar from '@material-ui/core/Avatar';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import FlexBox from './Styled-Components/FlexBox.styled';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '50ch',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
    textAlign: 'center',
  },
  avatar: {
    marginTop: theme.spacing(8),
    backgroundColor: '#D562BE',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#D562BE',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#605399',
      color: '#fff',
    },
  },
  input: {
    fontFamily: 'Cardo',
    fontSize: 19,
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
    <Container className={classes.root} component='main' maxWidth='xs'>
      <FlexBox>
        <div className={classes.root}>
          <Avatar className={classes.avatar}>
            <SearchOutlinedIcon />
          </Avatar>
          <div className='start-form-center'>
            <br></br>
            <div>
              <h1>Ready for a Party?</h1>
            </div>
            <form
              className={classes.form}
              noValidate
              autoComplete='off'
              onSubmit={(event) => getRecommendations(event)}
              name='start-form'
            >
              <br></br>
              <div>
                <label className={classes.input} htmlFor='serviceOptions'>
                  What service can we help you find?
                </label>
              </div>
              <br></br>
              <FormControl variant='outlined' fullWidth>
                <InputLabel>Please select caterer or venue</InputLabel>
                <Select
                  name='serviceOption'
                  onChange={(e) => setServiceOptionValue(e.target.value)}
                  value={serviceOptionValue}
                >
                  <MenuItem value='catering'>Caterer</MenuItem>
                  <MenuItem value='venue'>Venue</MenuItem>
                </Select>
                <br></br>
                <div>
                  <label className={classes.input} htmlFor='partyLocation'>
                    Where will your party be held?
                  </label>
                </div>
                <br></br>
              </FormControl>
              <TextField
                className={classes.input}
                name='location'
                label='Please enter city or zip code'
                fullWidth
                variant='outlined'
              />
              <br></br>
              <br></br>
              <div>
                <Button
                  variant='contained'
                  type='submit'
                  className={classes.submit}
                >
                  <strong>Get Recommendations</strong>
                </Button>
              </div>
            </form>
          </div>
        </div>
      </FlexBox>
    </Container>
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

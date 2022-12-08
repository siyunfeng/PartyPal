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

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(4),
    width: '50ch',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    textAlign: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#6F2DBD',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#6F2DBD',
    '&:hover': {
      backgroundColor: '#e64398',
      color: '#6F2DBD',
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
    <Container className='start-form-div' component='main' maxWidth='xs'>
      <div className={classes.root}>
        <Avatar className={classes.avatar}>
          <SearchOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Ready to Party
        </Typography>
        <form
          className={classes.form}
          noValidate
          autoComplete='off'
          onSubmit={(event) => getRecommendations(event)}
          name='start-form'
        >
          <Typography component='h5'>
            What service can we help you find?
          </Typography>
          <br></br>
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
            <br></br>
            <Typography component='h5'>
              Where will your party be held?
            </Typography>
            <br></br>
            <TextField
              name='location'
              label='Location or Zip-Code'
              variant='outlined'
            />
            <div>
              <Button
                variant='contained'
                type='submit'
                color='primary'
                className={classes.submit}
              >
                Get Recommendations
              </Button>
            </div>
          </FormControl>
        </form>
      </div>
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

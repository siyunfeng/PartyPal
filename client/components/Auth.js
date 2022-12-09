import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { authenticate } from '../redux/auth';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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
    backgroundColor: '#D562BE',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#D562BE',
    '&:hover': {
      backgroundColor: '#605399',
      color: '#fff',
    },
  },
}));

export const AuthForm = (props) => {
  const classes = useStyles();
  window.localStorage.removeItem('price');
  window.localStorage.removeItem('term');

  const { displayName } = props;
  if (displayName === 'Login') {
    const { name, handleLogin, error } = props;

    return (
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography
            component='h1'
            variant='h5'
            style={{ fontFamily: 'DM Serif Display' }}
          >
            Account Log In
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={handleLogin}
            name={name}
          >
            <TextField
              style={{ fontFamily: 'Cardo' }}
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='email'
              // htmlFor="username"
              label='Username'
              name='username'
              autoComplete='username'
              autoFocus
            />
            <TextField
              style={{ fontFamily: 'Cardo' }}
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
            />
            <Button
              style={{ fontFamily: 'Cardo' }}
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              <strong>{displayName}</strong>
            </Button>
            {error && error.response && <div> {error.response.data} </div>}
          </form>
        </div>
        <Box mt={8}></Box>
      </Container>
    );
  }
  if (displayName === 'Sign Up') {
    const classes = useStyles();
    const { name, handleSignup, error } = props;
    return (
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography
            component='h1'
            variant='h5'
            style={{ fontFamily: 'DM Serif Display' }}
          >
            Create Account
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={handleSignup}
            name={name}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  style={{ fontFamily: 'Cardo' }}
                  autoComplete='fname'
                  name='firstName'
                  variant='outlined'
                  required
                  fullWidth
                  id='firstName'
                  label='First Name'
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  style={{ fontFamily: 'Cardo' }}
                  variant='outlined'
                  required
                  fullWidth
                  id='lastName'
                  label='Last Name'
                  name='lastName'
                  autoComplete='lname'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  style={{ fontFamily: 'Cardo' }}
                  variant='outlined'
                  required
                  fullWidth
                  id='username'
                  label='Username'
                  name='username'
                  autoComplete='email'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  style={{ fontFamily: 'Cardo' }}
                  variant='outlined'
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  style={{ fontFamily: 'Cardo' }}
                  variant='outlined'
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='current-password'
                />
              </Grid>
            </Grid>

            <Button
              style={{ fontFamily: 'Cardo' }}
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              <strong>{displayName}</strong>
            </Button>
            {error && error.response && <div> {error.response.data} </div>}
          </form>
        </div>
        <Box mt={5}></Box>
      </Container>
    );
  }
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapStateLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.auth.error,
  };
};

const mapStateSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.auth.error,
  };
};

const mapDispatchLogin = (dispatch, { history }) => {
  return {
    handleLogin(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const username = evt.target.username.value;
      const password = evt.target.password.value;

      dispatch(authenticate(history, username, password, formName));
    },
  };
};

const mapDispatchSignup = (dispatch, { history }) => {
  return {
    handleSignup(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const username = evt.target.username.value;
      const password = evt.target.password.value;
      const firstName = evt.target.firstName.value;
      const lastName = evt.target.lastName.value;
      const email = evt.target.email.value;

      dispatch(
        authenticate(
          history,
          username,
          password,
          formName,
          firstName,
          lastName,
          email
        )
      );
    },
  };
};

export const Login = connect(mapStateLogin, mapDispatchLogin)(AuthForm);
export const Signup = connect(mapStateSignup, mapDispatchSignup)(AuthForm);

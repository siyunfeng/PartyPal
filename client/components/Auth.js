import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { authenticate } from '../redux/auth';
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

export const AuthForm = (props) => {
  const classes = useStyles();

  window.localStorage.removeItem('price');
  window.localStorage.removeItem('term');

  const { displayName } = props;

  if (displayName === 'Login') {
    const { name, handleLogin, error } = props;
    return (
      <div>
        <h2>Account Login</h2>
        <form
          className={classes.root}
          noValidate
          autoComplete='off'
          onSubmit={handleLogin}
          name={name}
        >
          <TextField
            htmlFor='username'
            name='username'
            label='Username'
            variant='outlined'
          />
          <TextField
            htmlFor='password'
            name='password'
            label='Password'
            variant='outlined'
          />
          <div>
            <Button variant='contained' type='submit' color='primary'>
              {displayName}
            </Button>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
      </div>
    );
  }
  if (displayName === 'Sign Up') {
    const { name, handleSignup, error } = props;

    return (
      <div>
        <h2>Create Account</h2>
        <form
          className={classes.root}
          noValidate
          autoComplete='off'
          onSubmit={handleSignup}
          name={name}
        >
          <TextField
            htmlFor='username'
            name='username'
            label='Username'
            variant='outlined'
          />

          <TextField
            htmlFor='password'
            name='password'
            label='Password'
            variant='outlined'
          />

          <TextField
            htmlFor='firstName'
            name='firstName'
            label='First Name'
            variant='outlined'
          />
          <TextField
            htmlFor='lastName'
            name='lastName'
            label='Last Name'
            variant='outlined'
          />
          <TextField
            htmlFor='email'
            name='email'
            label='Email'
            variant='outlined'
          />
          <div>
            <Button variant='contained' type='submit' color='primary'>
              {displayName}
            </Button>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
      </div>
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

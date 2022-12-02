import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { authenticate } from '../redux/auth';

/**
 * COMPONENT
 */
export const AuthForm = (props) => {
  const { displayName } = props;

  if (displayName === 'Login') {
    const { name, handleLogin, error } = props;
    return (
      <div>
        <h2>Account Login</h2>
        <form onSubmit={handleLogin} name={name}>
          <div>
            <label htmlFor="username">
              <small>Username</small>
            </label>
            <input name="username" type="text" />
          </div>
          <div>
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input name="password" type="password" />
          </div>
          <div>
            <button type="submit">{displayName}</button>
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
        <form onSubmit={handleSignup} name={name}>
          <div>
            <label htmlFor="username">
              <small>Username</small>
            </label>
            <input name="username" type="text" />
          </div>
          <div>
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input name="password" type="password" />
          </div>
          <div>
            <label htmlFor="firstName">
              <small>First Name</small>
            </label>
            <input name="firstName" type="text" />
          </div>
          <div>
            <label htmlFor="lastName">
              <small>Last Name</small>
            </label>
            <input name="lastName" type="text" />
          </div>
          <div>
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <input name="email" type="email" />
          </div>
          <div>
            <button type="submit">{displayName}</button>
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

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, BrowserRouter, Routes, Route } from 'react-router-dom';
import { logout } from '../redux/store';
import Button from 'react-bootstrap/Button';
import FlexBox from './Styled-Components/FlexBox.styled';

const Navbar = ({ handleLogout, isLoggedIn }) => {
  return (
      <nav>
        <Link to='/' style={{ textDecoration: 'none' }}>
          <img style={{ width: '8rem' }} src='/images/logo-PartyPal.png' />
        </Link>
        <br></br>
        {isLoggedIn ? (
          <ul style={{ listStyle: 'none', textDecoration: 'none' }}>
            {/* The navbar will show these links after you log in */}
            <li>
              <Link to='/start'>
                <Button>
                  <strong>Start Planning</strong>
                </Button>
              </Link>
            </li>
            <li>
              <Link to='/account'>
                <Button>
                  <strong>My Account</strong>
                </Button>
              </Link>
            </li>
            <li>
              <Link to='/'>
                <Button onClick={handleLogout}>
                  <strong>Logout</strong>
                </Button>
              </Link>
            </li>
          </ul>
        ) : (
          <ul style={{ listStyle: 'none', textDecoration: 'none' }}>
            {/* The navbar will show these links before you log in */}
            <li>
              <Link to='/start'>
                <Button>
                  <strong>Start Planning</strong>
                </Button>
              </Link>
            </li>
            <li>
              <Link to='/login'>
                <Button>
                  <strong>Login</strong>
                </Button>
              </Link>
            </li>
            <li>
              <Link to='/signup'>
                <Button>
                  <strong>Sign Up</strong>
                </Button>
              </Link>
            </li>
          </ul>
        )}
      </nav>
  );
};

const mapState = (state) => {
  return {
    isLoggedIn: state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleLogout: () => dispatch(logout()),
  };
};

export default connect(mapState, mapDispatch)(Navbar);

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, BrowserRouter, Routes, Route } from 'react-router-dom';
import { logout } from '../redux/store';
import Button from 'react-bootstrap/Button';

const Navbar = ({ handleLogout, isLoggedIn }) => {
  console.log('isLoggedIn user id is >>>>', isLoggedIn);

  return (
    <nav>
      <Link to='/' style={{ textDecoration: 'none' }}>
        <h1>Party Pal 🎉 </h1>
      </Link>
      {isLoggedIn ? (
        <ul style={{ listStyle: 'none', textDecoration: 'none' }}>
          {/* The navbar will show these links after you log in */}
          <li>
            <Link to='/'>
              <Button>Home</Button>
            </Link>
          </li>
          <li>
            <Link to='/account'>
              <Button>My Account</Button>
            </Link>
          </li>
          <li>
            <Link to='/'>
              <Button onClick={handleLogout}>Logout</Button>
            </Link>
          </li>
        </ul>
      ) : (
        <ul style={{ listStyle: 'none', textDecoration: 'none' }}>
          {/* The navbar will show these links before you log in */}
          <li>
            <Link to='/'>
              <Button>Home</Button>
            </Link>
          </li>
          <li>
            <Link to='/login'>
              <Button>Login</Button>
            </Link>
          </li>
          <li>
            <Link to='/signup'>
              <Button>Sign Up</Button>
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

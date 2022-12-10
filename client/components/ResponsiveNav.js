import Container from 'react-bootstrap/Container';
import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { logout } from '../redux/store';
import Button from 'react-bootstrap/Button';
import { Link, BrowserRouter, Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';

function ResponsiveNavBar({ handleLogout, isLoggedIn }) {
  return (
    <Navbar expand='lg' className='bg-pretty'>
      <Container>
        <Link to='/' style={{ textDecoration: 'none' }}>
          <img style={{ width: '8rem' }} src='/images/logo-PartyPal.png' />
        </Link>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav' className='pink'>
          <Nav className='me-auto' style={{ width: '100%' }}>
            {isLoggedIn ? (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  width: '100%',
                }}
              >
                <Nav.Link
                  className='responsiveNavLinks '
                  style={{
                    color: '#605399',
                    fontFamily: 'DM Serif Display',
                    fontWeight: 'bold',
                    fontSize: '20px',
                    padding: '1rem'
                  }}
                  href='/start'
                >
                  Start Planning
                </Nav.Link>

                <Nav.Link
                  style={{
                    color: '#605399',
                    fontFamily: 'DM Serif Display',
                    fontWeight: 'bold',
                    fontSize: '20px',
                    padding: '1rem'
                  }}
                  className='responsiveNavLinks '
                  href='/account'
                >
                  My Account
                </Nav.Link>
                <Nav.Link
                  className='responsiveNavLinks'
                  href='/logout'
                  onClick={handleLogout}
                  style={{
                    color: '#605399',
                    fontFamily: 'DM Serif Display',
                    fontWeight: 'bold',
                    fontSize: '20px',
                    padding: '1rem'
                  }}
                >
                  Logout
                </Nav.Link>
              </div>
            ) : (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  width: '100%',
                }}
              >
                <Nav.Link
                  style={{
                    color: '#605399',
                    fontFamily: 'DM Serif Display',
                    fontWeight: 'bold',
                    fontSize: '20px',
                    padding: '1rem'
                  }}
                  className='responsiveNavLinks '
                  href='/start'
                >
                  Start Planning
                </Nav.Link>

                <Nav.Link
                  style={{
                    color: '#605399',
                    fontFamily: 'DM Serif Display',
                    fontWeight: 'bold',
                    fontSize: '20px',
                    padding: '1rem'
                  }}
                  className='responsiveNavLinks'
                  href='/login'
                >
                  Log in
                </Nav.Link>

                <Nav.Link
                  style={{
                    color: '#605399',
                    fontFamily: 'DM Serif Display',
                    fontWeight: 'bold',
                    fontSize: '20px',
                    padding: '1rem'
                  }}
                  className='responsiveNavLinks'
                  href='/signup'
                >
                  Sign up
                </Nav.Link>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

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

export default connect(mapState, mapDispatch)(ResponsiveNavBar);

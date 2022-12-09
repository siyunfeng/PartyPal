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
    <NavBarFlex>
    <Navbar
      bg='light'
      expand='lg'
 
    >
      <Container>
        {/* <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand> */}
        <Link to='/' style={{ textDecoration: 'none' }}>
          <img style={{ width: '8rem' }} src='/images/logo-PartyPal.png' />
        </Link>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            {isLoggedIn ? (
              <ul style={{ listStyle: 'none', textDecoration: 'none' }}>
                {/* The navbar will show these links after you log in */}
                {/* <li> */}
                <Nav.Link className='responsiveNavLinks' href='/start'>
                  <Button>
                    <strong>Start Planning</strong>
                  </Button>
                </Nav.Link>
                {/* <Link to='/start'>
              <Button>
                <strong>Start Planning</strong>
              </Button>
            </Link> */}
                {/* </li> */}
                {/* <li>
            <Link to='/account'> */}
                <Nav.Link  className='responsiveNavLinks' href='/account'>
                  <Button>
                    <strong>My Account</strong>
                  </Button>
                </Nav.Link>
                {/* </Link> */}
                {/* </li> */}
                {/* <li>
            <Link to='/'> */}
                <Nav.Link className='responsiveNavLinks' href='/logout'>
                  <Button onClick={handleLogout}>
                    <strong>Logout</strong>
                  </Button>
                </Nav.Link>
                {/* <Button onClick={handleLogout}>
                <strong>Logout</strong>
              </Button>
            </Link>
          </li> */}
              </ul>
            ) : (
              <ul style={{ listStyle: 'none', textDecoration: 'none' }}>
                {/* The navbar will show these links before you log in */}
                {/* <li> */}
                <Nav.Link className='responsiveNavLinks' href='/start'>
                  <Button>
                    <strong>Start Planning</strong>
                  </Button>
                </Nav.Link>
                {/* <Link to='/start'>
              <Button>
                <strong>Start Planning</strong>
              </Button>
            </Link>
          </li> */}
                <Nav.Link className='responsiveNavLinks' href='/login'>
                  <Button>
                    <strong>Log in</strong>
                  </Button>
                </Nav.Link>
                {/* <li>
            <Link to='/login'>
              <Button>
                <strong>Log in</strong>
              </Button>
            </Link>
          </li> */}
                <Nav.Link  className='responsiveNavLinks' href='/signup'>
                  <Button>
                    <strong>Sign up</strong>
                  </Button>
                </Nav.Link>
                {/* <li>
            <Link to='/signup'>
              <Button>
                <strong>Sign Up</strong>
              </Button>
            </Link>
          </li> */}
              </ul>
            )}
            {/* <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/login">Log in</Nav.Link>
            <Nav.Link href="/signup">Sign up</Nav.Link>
            <Nav.Link href="/start">Start Planning</Nav.Link> */}
            <NavDropdown title='Dropdown' id='basic-nav-dropdown'>
              <NavDropdown.Item href='/'>Home</NavDropdown.Item>
              <NavDropdown.Item href='/login'>Log in</NavDropdown.Item>
              <NavDropdown.Item href='/signup'>Sign up</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href='/start'>Start Planning</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </NavBarFlex>
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


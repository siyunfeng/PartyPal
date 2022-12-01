import AllCaterer from './AllCaterer';
import React from 'react';
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
import { Login, Signup } from './Auth';
import EventSummary from './EventSummary';
import AllVenues from './AllVenues';
import SingleVenue from './SingleVenue';
// import { Navbar } from "./NavBar";

const WelcomePage = (props) => {
  return (
    <div>
      {/* <Navbar /> */}
      <p>Hello!</p>
    </div>
  );
};

export const AllRoutes = () => {
  return (
    <Router>
      <div>
        <nav>
          <Link style={{ textDecoration: 'none' }} to='/'>
            <h1>Cool Website name</h1>
          </Link>
          <ul style={{ listStyle: 'none', textDecoration: 'none' }}>
            <li>
              <Link style={{ textDecoration: 'none', color: 'white' }} to='/'>
                Main Page
              </Link>
            </li>
            <li>
              <Link
                style={{
                  textDecoration: 'none',
                  color: 'white',
                  backgroundColor: 'green',
                  padding: '8px',
                  borderRadius: '30px',
                }}
                to='/login'
              >
                Login
              </Link>
            </li>
            <li>
              {' '}
              <Link
                style={{
                  textDecoration: 'none',
                  color: 'white',
                  backgroundColor: 'blue',
                  padding: '8px',
                  borderRadius: '30px',
                }}
                to='/signup'
              >
                Signup{' '}
              </Link>
            </li>
          </ul>
          <div className='.hr'></div>
        </nav>
        <main>
          <Routes>
            <Route path='/' element={<WelcomePage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/caterer' element={<AllCaterer />} />
            <Route path='/eventSummary' element={<EventSummary />} />
            <Route path='/allVenues' element={<AllVenues />} />
            <Route path='/singleVenue/:id' element={<SingleVenue />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default AllRoutes;

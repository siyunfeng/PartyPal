import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import history from '../history';
import { Login, Signup } from './Auth';
import EventSummary from './EventSummary';
import AllCaterers from './AllCaterers';
import AllVenues from './AllVenues';
import SingleVenue from './SingleVenue';
import SingleCaterer from './SingleCaterer';
import StartForm from './StartForm';
import UserHome from './UserHome';
import Home from './Home';
// import { Navbar } from "./NavBar";

const WelcomePage = (props) => {
  return (
    <div>
      {/* <Navbar /> */}
      <Home />
    </div>
  );
};

export const AllRoutes = () => {
  return (
    <Router history={history}>
      <div>
        <nav>
          <Link style={{ textDecoration: 'none' }} to="/">
            <h1>Party Pal 🎉 </h1>
          </Link>
          <ul style={{ listStyle: 'none', textDecoration: 'none' }}>
            <li>
              <Link style={{ textDecoration: 'none', color: 'black' }} to="/">
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
                  borderRadius: '10px',
                }}
                to="/login"
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
                  borderRadius: '10px',
                }}
                to="/signup"
              >
                Signup{' '}
              </Link>
            </li>
          </ul>
          <div className=".hr"></div>
        </nav>
        <main>
          <Switch>
            <Route exact path="/" component={WelcomePage} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/allCaterers" component={AllCaterers} />
            <Route path="/singleCaterer/:id" component={SingleCaterer} />
            <Route path="/eventSummary" component={EventSummary} />
            <Route path="/allVenues" component={AllVenues} />
            <Route path="/singleVenue/:id" component={SingleVenue} />
            <Route path="/start" component={StartForm} />
            <Route path="/account" component={UserHome} />
          </Switch>
        </main>
      </div>
    </Router>
  );
};

export default AllRoutes;

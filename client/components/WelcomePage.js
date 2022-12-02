import AllCaterers from './AllCaterers';
import React from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import history from '../history';
import { Login, Signup } from './Auth';
import EventSummary from './EventSummary';
import AllVenues from './AllVenues';
import SingleVenue from './SingleVenue';
import StartForm from './StartForm';
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
    <Router history={history}>
      <div>
        <nav>
          <Link style={{ textDecoration: 'none' }} to="/">
            <h1>Cool Website name</h1>
          </Link>
          <ul style={{ listStyle: 'none', textDecoration: 'none' }}>
            <li>
              <Link style={{ textDecoration: 'none', color: 'white' }} to="/">
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
                  borderRadius: '30px',
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
            <Route path="/eventSummary" component={EventSummary} />
            <Route path="/allVenues" component={AllVenues} />
            <Route path="/venue/:id" component={SingleVenue} />
            <Route path="/start" component={StartForm} />
          </Switch>
        </main>
      </div>
    </Router>
  );
};

export default AllRoutes;

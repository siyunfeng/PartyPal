import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import history from '../history';
import { Login, Signup } from './Auth';
import AllCaterers from './AllCaterers';
import AllVenues from './AllVenues';
import SingleVenue from './SingleVenue';
import SingleCaterer from './SingleCaterer';
import StartForm from './StartForm';
import UserHome from './UserHome';
import Home from './Home';
import EventSummaryPopUp from './EventSummaryPopUp';
import Navbar from './NavBar';
import EventForm from './EventForm';
import Button from 'react-bootstrap/Button';

export const AllRoutes = () => {
  return (
    <Router history={history}>
      <Navbar />
      <main className='main'>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />
          <Route path='/allCaterers' component={AllCaterers} />
          <Route path='/singleCaterer/:id' component={SingleCaterer} />
          <Route path='/eventSummary' component={EventSummaryPopUp} />
          <Route path='/allVenues' component={AllVenues} />
          <Route path='/singleVenue/:id' component={SingleVenue} />
          <Route path='/start' component={StartForm} />
          <Route path='/account' component={UserHome} />
          <Route path='/new-event' component={EventForm} />
        </Switch>
      </main>
    </Router>
  );
};

export default AllRoutes;

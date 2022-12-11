import React, { useEffect } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import history from '../history';
import { Login, Signup } from './Auth';
import AllCaterers from './AllCaterers';
import AllVenues from './AllVenues';
import SingleVenue from './SingleVenue';
import SingleCaterer from './SingleCaterer';
import StartForm from './StartForm';
import UserHome from './UserHome';
import EventEditForm from './EventEditForm';
import Home from './Home';
import EventSummaryPopUp from './EventSummaryPopUp';
import EventForm from './EventForm';
import ResponsiveNav from './ResponsiveNav';
import { connect } from 'react-redux';
import { me } from '../redux/auth';
import { Footer } from './Footer';

export const AllRoutes = (props) => {
  useEffect(() => {
    props.isLoggedInUser();
  }, []);

  const { isLoggedIn } = props;
  return (
    <Router history={history}>
      <ResponsiveNav />
      <main className='main'>
        {isLoggedIn ? (
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/allCaterers' component={AllCaterers} />
            <Route path='/singleCaterer/:id' component={SingleCaterer} />
            <Route path='/allVenues' component={AllVenues} />
            <Route path='/singleVenue/:id' component={SingleVenue} />
            <Route path='/start' component={StartForm} />
            <Route path='/account' component={UserHome} />
            <Route path='/new-event' component={EventForm} />
            <Route path='/editEvent/:id' component={EventEditForm} />
          </Switch>
        ) : (
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/allCaterers' component={AllCaterers} />
            <Route path='/singleCaterer/:id' component={SingleCaterer} />
            <Route path='/allVenues' component={AllVenues} />
            <Route path='/singleVenue/:id' component={SingleVenue} />
            <Route path='/start' component={StartForm} />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
          </Switch>
        )}
      </main>
      <div className='footer-height'></div>
      <Footer />
    </Router>
  );
};

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    isLoggedInUser: () => dispatch(me()),
  };
};

export default connect(mapState, mapDispatch)(AllRoutes);

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { getEvents } from '../redux/events';
import {
  deleteCatererLikedItem,
  deleteVenueLikedItem,
  getFavorites,
} from '../redux/favorites';
import Card from 'react-bootstrap/Card';
import { fetchSingleCaterer } from '../redux/singleCaterer';
import { getSingleVenueThunk } from '../redux/singleVenue';
import UserHomeFlex from './Styled-Components/UserHomeFlex.styled';

const UserHome = (props) => {
  let { id, username, email } = props.user;
  let {
    events,
    favorites: { venues, caterers },
    getEvents,
    getFavorites,
    fetchSingleCaterer,
    getSingleVenueThunk,
    deleteCatererLikedItem,
    deleteVenueLikedItem,
  } = props;

  useEffect(() => {
    if (id) {
      getEvents(id);
      getFavorites(id);
    }
  }, [id]);

  const handleCatererClick = (e) => {
    const yelpId = e.target.name;
    fetchSingleCaterer(yelpId);
  };

  const handleVenueClick = (e) => {
    const yelpId = e.target.name;
    getSingleVenueThunk(yelpId);
  };

  const handleDeleteCaterer = (favoriteId) =>
    deleteCatererLikedItem(favoriteId);

  const handleDeleteVenue = (favoriteId) => deleteVenueLikedItem(favoriteId);

  return (
    <>
      {id ? (
        <div id='home-div'>
          <br></br>
          <h1 style={{ marginLeft: '1rem' }}>Welcome {username}!</h1>

          <br></br>
          <br></br>
          <a href='#my-events'>
            <Button
              variant='primary'
              style={{ marginLeft: '1rem', fontFamily: 'Cardo' }}
            >
              <strong>View My Events</strong>
            </Button>
          </a>
          <a
            style={{ textDecoration: 'none', fontFamily: 'Cardo' }}
            href='#my-liked-list'
          >
            <Button
              variant='primary'
              style={{ marginLeft: '1rem', fontFamily: 'Cardo' }}
            >
              <strong>View My Liked List</strong>
            </Button>
          </a>

          <div className='user-profile smallerUserHomeCards'>
            <h4 style={{ marginLeft: '1rem' }}>Account Information</h4>

            <div>
              <Card style={{ width: '25rem', marginLeft: '1rem' }}>
                <Card.Body>
                  <Card.Text>
                    <strong>Username: </strong>
                    {username}
                  </Card.Text>
                  <Card.Text>
                    <strong>Email: </strong> {email}
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </div>

          <br></br>
          <div></div>
          <div className='user-home-events'>
            <div className='user-home-favorite favoriteSelectionsCard'>
              <h4 id='my-liked-list' style={{ marginLeft: '1rem' }}>
                My Liked List
              </h4>
              <hr></hr>
              <br></br>
              <div className='each-favorite-venue-container '>
                <h5 style={{ marginLeft: '1rem' }}>Venues</h5>
                <hr></hr>
                <UserHomeFlex>
                  {venues?.length ? (
                    venues.map((venue, index) => {
                      return (
                        <Card
                          key={index}
                          style={{
                            width: '18rem',
                            marginTop: '2rem',
                            marginBottom: '2rem',
                          }}
                        >
                          <Link to={`/singleVenue/${venue.yelp_reference_id}`}>
                            <Card.Img
                              name={venue.yelp_reference_id}
                              onClick={handleVenueClick}
                              variant='top'
                              src={venue.image_url}
                              className='allViews'
                            />
                          </Link>
                          <Card.Body>
                            <Link
                              to={`/singleVenue/${venue.yelp_reference_id}`}
                              style={{ textDecoration: 'none' }}
                            >
                              <Card.Title
                                style={{ fontFamily: ' DM Serif Display' }}
                              >
                                {venue.name
                                  ? venue.name
                                  : 'venue name is not available'}
                              </Card.Title>
                            </Link>
                            <Button
                              onClick={() => handleDeleteVenue(venue.id)}
                              variant='danger'
                              style={{ fontFamily: 'Cardo' }}
                            >
                              <strong>Delete</strong>
                            </Button>
                          </Card.Body>
                        </Card>
                      );
                    })
                  ) : (
                    <p>You did not save any venues in your favorite yet.</p>
                  )}
                </UserHomeFlex>
                <br></br>
                <br></br>
              </div>
              <div className='each-favorite-caterer-container'>
                <h5 style={{ marginLeft: '1rem' }}>Catering</h5>
                <hr></hr>
                <UserHomeFlex>
                  {caterers?.length ? (
                    caterers.map((caterer, index) => {
                      return (
                        <Card
                          key={index}
                          style={{
                            width: '18rem',
                            marginTop: '2rem',
                            marginBottom: '2rem',
                          }}
                        >
                          <Link
                            to={`/singleCaterer/${caterer.yelp_reference_id}`}
                          >
                            <Card.Img
                              name={caterer.yelp_reference_id}
                              onClick={handleCatererClick}
                              variant='top'
                              src={caterer.image_url}
                              className='allViews'
                            />
                          </Link>
                          <Card.Body>
                            <Link
                              to={`/singleCaterer/${caterer.yelp_reference_id}`}
                              style={{ textDecoration: 'none' }}
                            >
                              <Card.Title
                                style={{ fontFamily: ' DM Serif Display}' }}
                              >
                                {caterer.name
                                  ? caterer.name
                                  : 'caterer name is not available'}
                              </Card.Title>
                            </Link>
                            <Button
                              onClick={() => handleDeleteCaterer(caterer.id)}
                              variant='danger'
                            >
                              Delete
                            </Button>
                          </Card.Body>
                        </Card>
                      );
                    })
                  ) : (
                    <p>You did not save any caterers in your favorite yet.</p>
                  )}
                </UserHomeFlex>
              </div>
            </div>
            <div className='smallerUserHomeCards'>
              <h4 id='my-events' style={{ marginLeft: '1rem' }}>
                My Events
              </h4>
              <br></br>
              <div>
                <Link to='/new-event-mui'>
                  <Button style={{ marginLeft: '1rem' }}>
                    Create Future Event
                  </Button>
                </Link>
              </div>
              <br></br>
              {events?.length ? (
                events.map((event, index) => {
                  return (
                    <div className='user-home-upcomings' key={index}>
                      <Card style={{ width: '25rem', marginLeft: '1rem' }}>
                        <Card.Body>
                          <Card.Title
                            style={{ fontFamily: 'DM Serif Display' }}
                          >
                            {event.name
                              ? event.name
                              : 'Event name is not available at this time'}
                          </Card.Title>
                          <Card.Text>
                            <strong>Date: </strong>
                            {event.date
                              ? event.date
                              : 'Event date is not available at this time'}
                          </Card.Text>
                          <Card.Text>
                            <strong>Time: </strong>
                            {event.time
                              ? event.time
                              : 'Event time is not available at this time'}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                      <br></br>
                    </div>
                  );
                })
              ) : (
                <div>You have no upcoming events at this time.</div>
              )}
              <br></br>
              <UserHomeFlex>
                <div>
                  <Link to='/new-event-mui'>
                    <Button style={{ fontFamily: 'Cardo' }}>
                      <strong>Create Future Event</strong>
                    </Button>
                  </Link>
                </div>
              </UserHomeFlex>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <br></br>
          <h3 style={{ fontFamily: 'DM Serif Display', marginLeft: '1rem' }}>
            Please <Link to='/login'>log in</Link> to your account to view your
            dashboard.
          </h3>
        </div>
      )}
    </>
  );
};

const mapState = (state) => {
  return {
    user: state.auth,
    events: state.events,
    favorites: state.favorites,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getEvents: (userId) => dispatch(getEvents(userId)),
    getFavorites: (userId) => dispatch(getFavorites(userId)),
    fetchSingleCaterer: (yelpId) => dispatch(fetchSingleCaterer(yelpId)),
    getSingleVenueThunk: (yelpId) => dispatch(getSingleVenueThunk(yelpId)),
    deleteVenueLikedItem: (favoriteId) =>
      dispatch(deleteVenueLikedItem(favoriteId)),
    deleteCatererLikedItem: (favoriteId) =>
      dispatch(deleteCatererLikedItem(favoriteId)),
  };
};

export default connect(mapState, mapDispatch)(UserHome);

// {id ? (
//   <div>
//     <div className='user-profile'>
//       <div>
//         <p>Username: {username}</p>
//         <p>Email: {email}</p>
//       </div>
//     </div>
//     <div>
//       <Link to='/start'>
//         <Button>Start Planning</Button>
//       </Link>
//     </div>
//     <div className='user-home-events'>
//       <div>
//         <div>
//           <h4>Events</h4>
//           <Link to='/new-event'>
//             <Button>Create Future Event</Button>
//           </Link>
//         </div>
//         {events?.length ? (
//           events.map((event, index) => {
//             return (
//               <div className='user-home-upcomings' key={index}>
//                 <div>
//                   {event.date} {event.time}
//                 </div>
//                 <div>{event.name}</div>
//               </div>
//             );
//           })
//         ) : (
//           <div>You have no upcoming events at this time.</div>
//         )}
//       </div>
//     </div>
//     <div className='user-home-favorite'>
//       <h4>Your Favorited Selections</h4>
//       <div className='each-favorite-venue-container'>
//         <UserHomeFlex>
//           <h6>Venues</h6>
//           {venues?.length ? (
//             venues.map((venue, index) => {
//               return (
//                 <Card key={index} style={{ width: '18rem' }}>
//                   <Link to={`/singleVenue/${venue.yelp_reference_id}`}>
//                     <Card.Img
//                       name={venue.yelp_reference_id}
//                       onClick={handleVenueClick}
//                       variant='top'
//                       src={venue.image_url}
//                       className='allViews'
//                     />
//                   </Link>
//                   <Card.Body>
//                     <Link
//                       to={`/singleVenue/${venue.yelp_reference_id}`}
//                       style={{ textDecoration: 'none' }}
//                     >
//                       <Card.Title>
//                         {venue.name
//                           ? venue.name
//                           : 'venue name is not available'}
//                       </Card.Title>
//                     </Link>
//                     <Button
//                       onClick={() => handleDeleteVenue(venue.id)}
//                       variant='primary'
//                     >
//                       Delete
//                     </Button>
//                   </Card.Body>
//                 </Card>
//               );
//             })
//           ) : (
//             <p>You did not save any venues in your favorite yet.</p>
//           )}
//         </UserHomeFlex>
//         <br></br>
//         <br></br>
//       </div>
//       <div className='each-favorite-caterer-container'>
//         <UserHomeFlex>
//           <h6>Catering</h6>
//           {caterers?.length ? (
//             caterers.map((caterer, index) => {
//               return (
//                 <Card key={index} style={{ width: '18rem' }}>
//                   <Link
//                     to={`/singleCaterer/${caterer.yelp_reference_id}`}
//                   >
//                     <Card.Img
//                       name={caterer.yelp_reference_id}
//                       onClick={handleCatererClick}
//                       variant='top'
//                       src={caterer.image_url}
//                       className='allViews'
//                     />
//                   </Link>
//                   <Card.Body>
//                     <Link
//                       to={`/singleCaterer/${caterer.yelp_reference_id}`}
//                       style={{ textDecoration: 'none' }}
//                     >
//                       <Card.Title>
//                         {caterer.name
//                           ? caterer.name
//                           : 'caterer name is not available'}
//                       </Card.Title>
//                     </Link>
//                     <Button
//                       onClick={() => handleDeleteCaterer(caterer.id)}
//                       variant='primary'
//                     >
//                       Delete
//                     </Button>
//                   </Card.Body>
//                 </Card>
//               );
//             })
//           ) : (
//             <p>You did not save any caterers in your favorite yet.</p>
//           )}
//         </UserHomeFlex>
//       </div>
//     </div>
//   </div>
// ) : (
//   <h3>
//     Please <Link to='/login'>log in</Link> your account.
//   </h3>
// )}
// </>
// );
// };

// const mapState = (state) => {
// return {
// user: state.auth,
// events: state.events,
// favorites: state.favorites,
// };
// };

// const mapDispatch = (dispatch) => {
// return {
// getEvents: (userId) => dispatch(getEvents(userId)),
// getFavorites: (userId) => dispatch(getFavorites(userId)),
// fetchSingleCaterer: (yelpId) => dispatch(fetchSingleCaterer(yelpId)),
// getSingleVenueThunk: (yelpId) => dispatch(getSingleVenueThunk(yelpId)),
// deleteVenueLikedItem: (favoriteId) =>
// dispatch(deleteVenueLikedItem(favoriteId)),
// deleteCatererLikedItem: (favoriteId) =>
// dispatch(deleteCatererLikedItem(favoriteId)),
// };
// };

// export default connect(mapState, mapDispatch)(UserHome);

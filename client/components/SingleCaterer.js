import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSingleCaterer } from '../redux/singleCaterer';
import { convert, findDayOfWeek } from '../../helperFunctions';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ModalSignUpandLogIn from './ModalSignUpAndLogin';
import axios from 'axios';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import FlexBoxForSearchResults from './Styled-Components/FlexBoxForSearchResults.styled';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Alert from 'react-bootstrap/Alert';
import SingleView from './Styled-Components/SingleView.styled';
import ButtonFlex from './ButtonFlex.styled';
import FlexBox from './Styled-Components/FlexBox.styled';

const SingleCaterer = (props) => {
  const business = props?.caterer?.business;
  const [solidGreen, setSolidGreen] = useState(false);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const yelpId = props.match.params;
    props.fetchSingleCaterer(yelpId);
  }, []);

  if (!business) return null;

  const { name, rating, photos, phone, price, hours, categories, location } =
    business;
  const address1 = location.address1;
  const city = location.city;
  const state = location.state;

  const urlVisiting = props.history.location.pathname;

  if (!window.localStorage.getItem('token')) {
    window.localStorage.setItem('pathVisiting', urlVisiting);
  }

  const saveLikedItem = async (e, cateringInfo) => {
    const idToSave = e.target.name;
    const loggedInUserToken = window.localStorage.getItem('token');

    cateringInfo.token = loggedInUserToken;

    if (loggedInUserToken) {
      const token = window.localStorage.getItem('token');
      const saving = await axios.post(
        `/api/favorites/caterer/${idToSave}`,
        cateringInfo,
        {
          headers: {
            authorization: token,
          },
        }
      );
    }
  };

  const renderTooltip = (props) => (
    <Tooltip id='button-tooltip' {...props}>
      Like to save to user dashboard
    </Tooltip>
  );

  let newPhone;
  if (phone) {
    if (phone.charAt(1) !== '1') {
      newPhone = phone;
    } else {
      newPhone =
        '(' +
        phone.slice(2, 5) +
        ') ' +
        phone.slice(5, 8) +
        '-' +
        phone.slice(8, 12);
    }
  } else {
    newPhone = 'No information available';
  }

  return (
    <div className='single-caterer-container'>
      <br></br>
      <br></br>
      <SingleView>
        <Card
          className='favoriteSelectionsCard'
          // style={{ width: '600px', height: '700px' }}
        >
          <ButtonFlex>
            <h1>{name ? name : ''}</h1>
          </ButtonFlex>
          <hr></hr>
          <Card.Body>
            <ButtonFlex>
              <Card.Img
                className='img single-img'
                variant='top'
                style={{ width: 450, height: 500 }}
                // style={{ width: '600px', height: '700px' }}
                src={
                  photos.length
                    ? photos
                    : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAh8YVQhMCGhp1xDo9Pew7q0W4H1zLD-9wbA&usqp=CAU'
                }
              />
            </ButtonFlex>
          </Card.Body>
        </Card>
        <br></br>
        <Card className='favoriteSelectionsCard' style={{ padding: '2rem' }}>
          <h4>Caterer Details</h4>
          <hr></hr>
          <br></br>
          <Card.Text>
            <strong>Categories:</strong>
            {categories.map((category) => {
              return ` ${category.title}, `;
            })}
          </Card.Text>
          <Card.Text>
            <strong>Address: </strong>
            {address1 ? `${address1}, ` : 'No information available'}
            {city ? ` ${city}, ` : 'No information available'}
            {state ? ` ${state}` : 'No information available'}
          </Card.Text>
          <Card.Text>
            <strong>Days Open: </strong>
            {hours.length
              ? business.hours[0].open.map((day) => {
                  return ` ${findDayOfWeek(day.day)}, `;
                })
              : 'No information available'}
          </Card.Text>
          <Card.Text>
            <strong>Open: </strong>
            {hours.length
              ? convert(business.hours[0].open[0].start)
              : 'No information available'}
          </Card.Text>
          <Card.Text>
            <strong>Closes: </strong>
            {hours.length
              ? convert(business.hours[0].open[0].end)
              : 'No information available'}
          </Card.Text>
          <Card.Text>
            <strong>Phone: </strong> {newPhone}
          </Card.Text>
          <Card.Text>
            <strong>Price: </strong>{' '}
            {price ? price : 'No information available'}
          </Card.Text>
          <Card.Text>
            <div>
              <Typography component='legend'>
                <strong>Ratings: {rating}</strong>
              </Typography>
              <Rating
                name='read-only'
                precision={0.5}
                value={rating}
                readOnly
              />
            </div>
          </Card.Text>
          <FlexBox>
            {liked ? (
              <strong>
                <p>Added to user dashboard!</p>
              </strong>
            ) : (
              ''
            )}
          </FlexBox>
          <br></br>
          <ButtonFlex>
            {window.localStorage.getItem('token') ? (
              <OverlayTrigger
                placement='top'
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip}
              >
                <Button
                  variant={solidGreen ? 'success' : 'outline-success'}
                  name={business.id}
                  style={{ fontFamily: 'Cardo' }}
                  onClick={(e) => {
                    const venueInfo = {
                      name,
                      category: 'venue',
                      image_url: photos,
                    };
                    setSolidGreen(true);
                    setLiked(true);
                    saveLikedItem(e, venueInfo);
                  }}
                >
                  <strong>{liked ? 'Liked' : 'Like'}</strong>
                </Button>
              </OverlayTrigger>
            ) : (
              <ModalSignUpandLogIn
                id={business.id}
                name={name}
                category={'venue'}
                image_url={photos}
                urlVisted={urlVisiting}
              />
            )}
            <div className='button-divider'></div>
            <Link to='/allVenues'>
              <Button style={{ fontFamily: 'Cardo' }} variant='outline-primary'>
                <strong>Go Back</strong>
              </Button>
            </Link>
          </ButtonFlex>
        </Card>
      </SingleView>
      <br></br>
      {/* seperate */}

        <FlexBox>
          <Card
            className='favoriteSelectionsCard'
            // style={{ width: '900%', height: '800%' }}
          >
            <h4>Ratings</h4>
            <hr></hr>
            <FlexBox>
              <div>
                {business.reviews.map((review) => {
                  return (
                    <Alert
                      key={review.id}
                      variant='info'
                      // style={{ width: ' 700%', height: '140%' }}
                    >
                      <Rating
                        name='read-only'
                        precision={0.5}
                        value={review.rating}
                        readOnly
                      />
                      <hr />
                      <p>{review.text}</p>
                    </Alert>
                  );
                })}
              </div>
            </FlexBox>
          </Card>
        </FlexBox>
  
      <br></br>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    caterer: state.singleCaterer,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchSingleCaterer: (yelpId) => {
      dispatch(fetchSingleCaterer(yelpId));
    },
  };
};

export default connect(mapStateToProps, mapDispatch)(SingleCaterer);

// const SingleCaterer = (props) => {
//   const business = props?.caterer?.business;
//   const [solidGreen, setSolidGreen] = useState(false);
//   const [liked, setLiked] = useState(false);

//   useEffect(() => {
//     const yelpId = props.match.params;
//     props.fetchSingleCaterer(yelpId);
//   }, []);

//   if (!business) return null;

//   const { name, rating, photos, phone, price, hours, categories, location } = business;
//   const address1 = location.address1;
//   const city = location.city;
//   const state = location.state;

//   const urlVisiting = props.history.location.pathname;

//   if (!window.localStorage.getItem('token')) {
//     window.localStorage.setItem('pathVisiting', urlVisiting);
//   }

//   const saveLikedItem = async (e, cateringInfo) => {
//     const idToSave = e.target.name;
//     const loggedInUserToken = window.localStorage.getItem('token');

//     cateringInfo.token = loggedInUserToken;

//     if (loggedInUserToken) {
//       const token = window.localStorage.getItem('token');
//       const saving = await axios.post(
//         `/api/favorites/caterer/${idToSave}`,
//         cateringInfo,
//         {
//           headers: {
//             authorization: token,
//           },
//         }
//       );
//     }
//   };

//   const renderTooltip = (props) => (
//     <Tooltip id='button-tooltip' {...props}>
//       Like to save to user dashboard
//     </Tooltip>
//   );

//   let newPhone;
//   if (phone) {
//     if (phone.charAt(1) !== '1') {
//       newPhone = phone;
//     } else {
//       newPhone =
//         '(' +
//         phone.slice(2, 5) +
//         ') ' +
//         phone.slice(5, 8) +
//         '-' +
//         phone.slice(8, 12);
//     }
//   } else {
//     newPhone = 'No information available';
//   }

//   return (
//     <div>
//       <FlexBoxForSearchResults>
//         <h1>{name ? name : ''}</h1>
//       </FlexBoxForSearchResults>
//       <Card className='text-center'>
//         <Card.Header>Caterer</Card.Header>
//         <Card.Body>
//           <Card.Img
//             className='img'
//             variant='top'
//             src={
//               photos.length
//                 ? photos
//                 : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAh8YVQhMCGhp1xDo9Pew7q0W4H1zLD-9wbA&usqp=CAU'
//             }
//           />
//           <Card.Text>
//             <strong>Categories:</strong>
//             {categories.map((category) => {
//               return ` ${category.title}`;
//             })}
//           </Card.Text>
//           <Card.Text>
//             <strong>Days Open: </strong>{' '}
//             {hours.length
//               ? business.hours[0].open.map((day) => {
//                   return ` ${findDayOfWeek(day.day)}, `;
//                 })
//               : 'No information available'}
//           </Card.Text>
//           <Card.Text>
//             <strong>Open: </strong>{' '}
//             {hours.length
//               ? convert(business.hours[0].open[0].start)
//               : 'No information available'}
//           </Card.Text>
//           <Card.Text>
//             <strong>Closes: </strong>{' '}
//             {hours.length
//               ? convert(business.hours[0].open[0].end)
//               : 'No information available'}
//           </Card.Text>
//           <Card.Text>
//             <strong>Phone:</strong> {newPhone}
//           </Card.Text>
//           <Card.Text>
//             <strong>Price:</strong> {price ? price : 'No information available'}
//           </Card.Text>
//           <Card.Text>
//             <strong>Address: </strong>
//             {address1 ? address1 : 'No information available'}
//           </Card.Text>
//           <Card.Text>
//             <strong>City: </strong>
//             {city ? city : 'No information available'}
//           </Card.Text>
//           <Card.Text>
//             <strong>State: </strong>
//             {state ? state : 'No information available'}
//           </Card.Text>
//           <Card.Text>
//             <div>
//               <Typography component='legend'>
//                 <strong>Ratings: {rating}</strong>
//               </Typography>
//               <Rating
//                 name='read-only'
//                 precision={0.5}
//                 value={rating}
//                 readOnly
//               />
//             </div>
//           </Card.Text>
//           <Card.Text>
//             <strong>Reviews: </strong>
//             <div>
//               {business.reviews.map((review) => {
//                 return (
//                   <Alert key={review.id} variant='info'>
//                     <Rating
//                       name='read-only'
//                       precision={0.5}
//                       value={review.rating}
//                       readOnly
//                     />
//                     <hr />
//                     <p>{review.text}</p>
//                   </Alert>
//                 );
//               })}
//             </div>
//           </Card.Text>

//           {liked ? (
//             <strong>
//               <p>Added to user dashboard!</p>
//             </strong>
//           ) : (
//             <p></p>
//           )}

//           {window.localStorage.getItem('token') ? (
//             <OverlayTrigger
//               placement='top'
//               delay={{ show: 250, hide: 400 }}
//               overlay={renderTooltip}
//             >
//               <Button
//                 variant={solidGreen ? 'success' : 'outline-success'}
//                 name={business.id}
//                 onClick={(e) => {
//                   const cateringInfo = {
//                     name: name,
//                     category: 'caterer',
//                     image_url: photos,
//                   };
//                   setSolidGreen(true);
//                   setLiked(true);
//                   saveLikedItem(e, cateringInfo);
//                 }}
//               >
//                 {liked ? 'Liked' : 'Like'}
//               </Button>
//             </OverlayTrigger>
//           ) : (
//             <ModalSignUpandLogIn
//               id={business.id}
//               name={name}
//               category={'caterer'}
//               image_url={photos}
//               urlVisted={urlVisiting}
//             />
//           )}
//           <Link to='/allCaterers'>
//             <Button variant='primary'>Go Back</Button>
//           </Link>
//         </Card.Body>
//       </Card>
//     </div>
//   );
// };

// const mapStateToProps = (state) => {
//   return {
//     caterer: state.singleCaterer,
//   };
// };

// const mapDispatch = (dispatch) => {
//   return {
//     fetchSingleCaterer: (yelpId) => {
//       dispatch(fetchSingleCaterer(yelpId));
//     },
//   };
// };

// export default connect(mapStateToProps, mapDispatch)(SingleCaterer);

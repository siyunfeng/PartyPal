import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Rating from '@material-ui/lab/Rating';

function ReviewsHome() {
  const reviews = [
    {
      id: 1,
      name: 'Carla Morrison',
      review:
        "I used PartyPal to plan my daughter's quinceanera a few months ago. I really liked that I could browse all the different catering and venues all in one place. ",
      ratings: 5,
    },
    {
      id: 2,
      name: 'Yuri Valenzuela',
      review:
        'I found a great venue in Palm Springs within my price range and a was able to look for great caterers in my area.',
      ratings: 4.5,
    },
    {
      id: 3,
      name: 'Brittany Spears',
      review: 'Would recommend using the app if you have a party coming up!',
      ratings: 5,
    },
    {
      id: 4,
      name: 'Ashin Chen',
      review:
        "I planned my son's graduation party using the app. Would recommend it!",
      ratings: 5,
    },
  ];

  return (
    <div style={{ margin: 'auto 2em' }}>
      {reviews.map((review) => {
        return (
          <Alert key={review.id} variant='info'>
            <Rating
              name='read-only'
              precision={0.5}
              value={review.ratings}
              readOnly
            />
            <Alert.Heading className='DM-Serif-display-font'>
              {review.name}
            </Alert.Heading>
            <p>{review.review}</p>
            <hr />
          </Alert>
        );
      })}
    </div>
  );
}

export default ReviewsHome;

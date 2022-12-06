import React from 'react';
import Alert from 'react-bootstrap/Alert';
// import StarRating from './StarRating';

function ReviewsHome() {
  const reviews = [
    {
      id: 1,
      name: 'Carla Morrison',
      review:
        "I used PartyPal to plan my daughter's quineanera a few months ago. I really liked that I could browse all the different catering and venues all in one place. ",
    },
    {
      id: 2,
      name: 'Yuri Valenzuela',
      review:
        'I found a great venue in Palm Springs within my price range and a was able to look for great caterers in my area',
    },
    {
      id: 3,
      name: 'Brittany Spears',
      review: 'Would recommend using the app if you have a party coming up!',
    },
    {
      id: 4,
      name: 'Alan Cheng',
      review:
        "Planned my son's graduation party using the app. Would recommend it!",
    },
  ];

  return (
    <div>
      {reviews.map((review) => {
        return (
          <Alert key={review.id} variant='info'>
            <Alert.Heading>{review.name}</Alert.Heading>
            <p>{review.review}</p>
            {/* <StarRating /> */}
            <hr />

          </Alert>

        );
      })}
    </div>
  );
}

export default ReviewsHome;

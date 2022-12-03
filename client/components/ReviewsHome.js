import React from 'react';
import Alert from 'react-bootstrap/Alert';

function ReviewsHome() {
  return (
    <Alert variant='info'>
      <Alert.Heading>Carla Morrison</Alert.Heading>
      <p>
        I used party pal to plan my daughter's quince a few months ago. I really
        like browsing all the different catering options and venues. Loved the
        website!
      </p>
      <hr />
      {/* <p className="mb-0">
        Whenever you need to, be sure to use margin utilities to keep things
        nice and tidy.
      </p> */}
    </Alert>
  );
}

export default ReviewsHome;

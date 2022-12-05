import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReviewsHome from './ReviewsHome';
import CarouselHome from './CarouselHome';
import FlexBox from './Styled-Components/FlexBox.styled';

const Home = () => {
  window.localStorage.removeItem('price');
  window.localStorage.removeItem('term');

  return (
    <div>
      {/* <FlexBox>
        <h1>Welcome to Party Pal!</h1>S
      </FlexBox> */}
      <CarouselHome />
      <div>
        <div>
          <FlexBox>
            <br></br>
            <p>
              <strong>
                Have a party coming up? Need venue and catering recommendations
                in your area? Click Start Planning to find recommendations in
                your area.
              </strong>
            </p>
            <br></br>
            <h2>Reviews</h2>
            <ReviewsHome />
            <ReviewsHome />
          </FlexBox>
        </div>
      </div>
    </div>
  );
};

export default Home;

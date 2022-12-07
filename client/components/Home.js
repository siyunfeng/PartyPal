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
      <br></br>
      <CarouselHome />
      <div>
        <div>
          <FlexBox>
            <br></br>
            <p style={{ textAlign: 'center' }}>
              <strong>
                Have a party coming up? Need venue and catering recommendations
                in your area? Click Start Planning to find recommendations in
                your area.
              </strong>
            </p>
            <br></br>
            <h2>Reviews</h2>
            <ReviewsHome />
          </FlexBox>
        </div>
      </div>
    </div>
  );
};

export default Home;

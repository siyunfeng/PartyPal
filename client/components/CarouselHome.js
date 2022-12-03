import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';

function CarouselHome() {
  return (
    <div>
      <Carousel>
        <Carousel.Item className='mb-5 w-100'>
          <img
            className='d-block w-100'
            src='https://s3j2u9r4.stackpathcdn.com/dbcwp/wp-content/uploads/2022/08/catering-768.jpg'
            alt='First slide'
          />
          <Carousel.Caption>
            <h1>Plan your party with PartyPal</h1>
            <Link to='/start'>
              <Button variant='primary'>Start Planning</Button>
            </Link>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className='d-block w-100'
            src='https://images.unsplash.com/photo-1566737236500-c8ac43014a67?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHZlbnVlcyUyMHdpZGUlMjBwYXJ0eXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
            alt='Second slide'
          />

          <Carousel.Caption>
            <h1>Plan your party with PartyPal</h1>
            <Link to='/start'>
              <Button className='mb-5' variant='primary'>
                Start Planning
              </Button>
            </Link>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className='d-block w-100'
            src='https://images.unsplash.com/photo-1578730169862-749bbdc763a8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8dmVudWVzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
            alt='Third slide'
          />

          <Carousel.Caption>
            <h1>Plan your party with PartyPal</h1>
            <Link to='/start'>
              <Button className='mb-5' variant='primary'>
                Start Planning
              </Button>
            </Link>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
export default CarouselHome;

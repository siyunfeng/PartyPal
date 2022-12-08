import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';

function CarouselHome() {
  return (
    <Carousel id='carousel'>
      <Carousel.Item>
        <img
          className='d-block w-100'
          src='/images/caterer-photo-1.jpg'
          alt='First slide'
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
          src='/images/party-photo-2.jpg'
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
          src='/images/venue-photo-1.jpg'
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
      <Carousel.Item>
        <img
          className='d-block w-100'
          src='/images/caterer-photo-2.jpg'
          alt='Fourth slide'
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
          src='/images/party-photo-3.jpg'
          alt='Fifth slide'
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
          src='/images/venue-photo-6.jpg'
          alt='Sixth slide'
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
  );
}
export default CarouselHome;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const EventForm = (props) => {
  let { user, events, venues, caterers } = props;
  console.log(
    'before return --- user =',
    user,
    'events =',
    events,
    'venues =',
    venues,
    'caterers =',
    caterers
  );

  useEffect(
    () =>
      console.log('inside useEffect venues =', venues, 'caterers =', caterers),
    []
  );

  return (
    <Form>
      <Form.Group className='my-3' controlId='formEventName'>
        <Form.Label>Event Name</Form.Label>
        <Form.Control type='text' />
      </Form.Group>
      <Row>
        <Form.Group as={Col} className='my-3' controlId='formEventDate'>
          <Form.Label>Date</Form.Label>
          <Form.Control type='date' />
        </Form.Group>
        <Form.Group as={Col} className='my-3' controlId='formEventTime'>
          <Form.Label>Time</Form.Label>
          <Form.Control type='time' />
        </Form.Group>
      </Row>
      <Form.Group controlId='formEventVenue'>
        <Form.Label>Venue</Form.Label>
        <Form.Select defaultValue=''>
          {venues?.length ? (
            venues.map((venue, index) => (
              <option key={index}>{venue.name}</option>
            ))
          ) : (
            <option>Please add venues to your favorite</option>
          )}
          {/* <option>Option 1</option>
          <option>Option 2</option>
          <option>Option 3</option>
          <option>Option 4</option> */}
        </Form.Select>
      </Form.Group>
      <Form.Group controlId='formEventCaterer'>
        <Form.Label>Caterer</Form.Label>
        <Form.Select defaultValue=''>
          {caterers?.length ? (
            caterers.map((caterer, index) => (
              <option key={index}>{caterer.name}</option>
            ))
          ) : (
            <option>Please add caterers to your favorite</option>
          )}
          {/* <option>Option 1</option>
          <option>Option 2</option>
          <option>Option 3</option>
          <option>Option 4</option> */}
        </Form.Select>
      </Form.Group>
      <FloatingLabel
        className='my-3'
        controlId='floatingEventNote'
        label='Note'
      >
        <Form.Control
          className='my-3'
          as='textarea'
          placeholder='Take a note for the event'
          style={{ height: '100px' }}
        />
      </FloatingLabel>
      <Form.Group className='my-3' controlId='formBasicCheckbox'>
        <Form.Check
          type='checkbox'
          label='Please confirm the event details before submitting.'
        />
      </Form.Group>
      {/* <Form.Text className='text-muted'>
        Please confirm the event details before submitting.
      </Form.Text> */}
      <Button variant='primary' type='submit'>
        Submit
      </Button>
    </Form>
  );
};

const mapState = (state) => {
  console.log('EventForm store state =', state);
  return {
    user: state.auth,
    events: state.events,
    venues: state.favorites.venues,
    caterers: state.favorites.caterers,
  };
};

const mapDispatch = (dispatch) => {
  return {};
};

export default connect(mapState, mapDispatch)(EventForm);

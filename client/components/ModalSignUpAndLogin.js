import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { Login, Signup } from './Auth';

export let pathVisted;
const ModalSignUpandLogIn = (props) => {
  console.log('modal props', props.urlVisted.pathname);
  pathVisted = props.urlVisted.pathname;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant='outline-success' onClick={handleShow}>
        Like
      </Button>{' '}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Log In or Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Please log in or sign up to save your selection.
        </Modal.Body>
        <Modal.Footer>
          <Link
            to={{
              pathname: '/signup',
              state: { prevPath: location.pathname },
            }}
          >
            <Button variant='primary' onClick={handleClose}>
              Sign up
            </Button>{' '}
          </Link>
          {/* <Link to='/login'>
            <Button variant='success'>Log in</Button>{' '}
          </Link> */}
          <Link
            to={{
              pathname: '/login',
              state: { prevPath: location.pathname },
            }}
          >
            <Button variant='success'>Log in</Button>{' '}
          </Link>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalSignUpandLogIn;

import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { Login, Signup } from './Auth';

export let pathVisted;
const ModalSignUpandLogIn = (props) => {
  // console.log('modal props', props);
  pathVisted = props.urlVisted.pathname;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button  style={{ fontFamily: 'Cardo' }} variant='outline-success' onClick={handleShow}>
        Like
      </Button>{' '}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header style={{ fontFamily: 'DM Serif Display' }} closeButton>
          <Modal.Title>Log In or Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontFamily: 'Cardo' }}>
          Please log in or sign up to like this selection.
        </Modal.Body>
        <Modal.Footer>
          <Link
            to={{
              pathname: '/signup',
              state: { prevPath: location.pathname },
            }}
          >
            <Button
              variant='primary'
              onClick={handleClose}
              style={{ fontFamily: 'Cardo' }}
            >
              <strong>Sign up</strong>
            </Button>{' '}
          </Link>
          <Link
            to={{
              pathname: '/login',
              state: { prevPath: location.pathname },
            }}
          >
            <Button variant='success' style={{ fontFamily: 'Cardo' }}>
              <strong>Log in</strong>
            </Button>{' '}
          </Link>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalSignUpandLogIn;

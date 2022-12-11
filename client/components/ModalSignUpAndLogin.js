import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { Login, Signup } from './Auth';

export let pathVisted;
const ModalSignUpandLogIn = (props) => {
  pathVisted = props.urlVisted.pathname;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className='cardo-font ' variant='outline-success' onClick={handleShow}>
        Like
      </Button>{' '}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header className='DM-Serif-display-font' closeButton>
          <Modal.Title>Log In or Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body className='cardo-font'>
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
              className='cardo-font'
            >
              <strong>Sign up</strong>
            </Button>
          </Link>
          <Link
            to={{
              pathname: '/login',
              state: { prevPath: location.pathname },
            }}
          >
            <Button variant='success' className='cardo-font'>
              <strong>Log in</strong>
            </Button>{' '}
          </Link>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalSignUpandLogIn;

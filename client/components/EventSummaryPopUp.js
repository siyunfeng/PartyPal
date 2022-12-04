import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PopUpDiv from './Styled-Components/FlexBox.styled';

function EventSummaryPopUp() {
  const [lgShow, setLgShow] = useState(false);

  return (
    <>
      <Button onClick={() => setLgShow(true)}>Event Summary</Button>
      <Modal
        size='lg'
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby='example-modal-sizes-title-lg'
      >
        <Modal.Header closeButton>
          <Modal.Title id='example-modal-sizes-title-lg'>
            Here are your event details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PopUpDiv>
            <h1>
              <strong></strong>2209 GH Graduation 🎉
            </h1>
            <p>
              <strong>Date: </strong>December 16, 2022
            </p>
            <p>
              <strong>Time:</strong> 5-6pm
            </p>
            <p>
              <strong>Venue:</strong> The Brooklyn Hangar
            </p>
            <p>
              <strong>Caterer:</strong> Maria's Italian
            </p>
            <p>
              <strong>Notes:</strong>
            </p>
            <p>We hope you have a great event!</p>
          </PopUpDiv>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EventSummaryPopUp;

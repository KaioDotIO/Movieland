import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/Modal';
import './style.css';

export const DialogModal = (props: any) => {
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="modal-body">
          <h4>{props.title}</h4>
          <p>{props.text}</p>
          <Button className="button-favorite" onClick={props.onHide}>
            Close
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

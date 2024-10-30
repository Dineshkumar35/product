import React from 'react';
import { Modal,Button } from "react-bootstrap";


const ModalComponent=(props)=> {
    return (
      <div>
        <Modal show={props.showStatus} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{props.modalTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{props.modalBody}</Modal.Body>
          <Modal.Footer>
          <Button variant="primary" onClick={props.handleSave}>
             {props.saveBtn}
            </Button>
            <Button variant="secondary" onClick={props.handleClose}>
             {props.closeBtn}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
  export default ModalComponent;
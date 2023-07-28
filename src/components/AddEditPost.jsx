import React from "react";
import { Button, Modal } from "react-bootstrap";

const AddEditPost = ({ show, onSave, onClose, children, title = "" }) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

export default AddEditPost;

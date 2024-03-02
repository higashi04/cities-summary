import React, { useEffect, useState } from "react";
import Toast from "react-bootstrap/Toast";

const ToastMessage = ({ message, showToaster, onToasterClose }) => {
  const [passedMessage, setPassedMessage] = useState({});
  const [show, setShow] = useState(false);

  useEffect(() => {
   if(showToaster) {
    handleShow();
   } else {
    handleClose()
   }
  });

  useEffect(() => {
    setPassedMessage(message)
  }, [message])

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    onToasterClose(false);
  };

  return (
    <div className="d-flex flex-flow-reverse ms-5">
      <Toast
        className="ms-3"
        bg={passedMessage?.type}
        onClose={() => handleClose()}
        show={show}
        delay={3000}
        autohide
        position="middle-end"
      >
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto fs-2">{passedMessage?.title}</strong>
        </Toast.Header>
        <Toast.Body className="fs-3">{passedMessage?.body}</Toast.Body>
      </Toast>
    </div>
  );
};

export default ToastMessage;

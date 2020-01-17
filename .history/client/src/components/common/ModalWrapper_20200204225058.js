import React from 'react';
import PropTypes from 'prop-types';
import {
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  FormText,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';

const ModalWrapper = props => {
  const handleBackgroundClick = e => {
    if (e.target === e.currentTarget) props.hideModal();
  };

  const onOk = () => {
    props.onOk();
    props.hideModal();
  };

  const okButton = props.showOk ? (
    <button onClick={onOk} disabled={props.okDisabled}>
      {props.okText}
    </button>
  ) : null;

  return (
    <div onClick={handleBackgroundClick}>
      <header>
        <h1>{props.title}</h1>

        <button onClick={props.hideModal}>Close</button>
      </header>

      {props.children}

      {okButton}
    </div>


  <Modal>
<ModalHeader>
  {"Connect to your child's class community"}
</ModalHeader>
  );
};

ModalWrapper.propTypes = {
  // props
  title: PropTypes.string,
  showOk: PropTypes.bool,
  okText: PropTypes.string,
  okDisabled: PropTypes.bool,
  width: PropTypes.number,
  style: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
    PropTypes.string
  ]).isRequired,

  // methods
  hideModal: PropTypes.func,
  onOk: PropTypes.func
};

ModalWrapper.defaultProps = {
  title: '',
  showOk: true,
  okText: 'OK',
  okDisabled: false,
  width: 400,
  onOk: () => {}
};

export default ModalWrapper;

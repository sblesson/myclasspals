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
    <Modal isOpen={modal} fade={false} toggle={toggle}>
      <ModalHeader>{"Connect to your child's class community"}</ModalHeader>
      <ModalBody></ModalBody>
      <ModalFooter>
        <Button
          color='primary'
          onClick={e => {
            e.preventDefault();
            addSchool(formData, history);
          }}
        >
          Save
        </Button>
      </ModalFooter>
    </Modal>
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

import React, { useState } from 'react';
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
    if (e.target === e.currentTarget) {
      props.hideModal();
      setModal(false);
    }
  };

  const onOk = () => {
    props.onOk();
    setModal(false);
  };
  const [modal, setModal] = useState(true);

  const toggle = () => setModal(!modal);

  return (
    <Modal isOpen={modal} fade={false} toggle={toggle}>
      <ModalHeader toggle={toggle}>{props.title}</ModalHeader>
      <ModalBody>{props.children}</ModalBody>
      <ModalFooter>
        <Button color='primary' onClick={onOk}>
          {props.okText}
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
  PropTypes.
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
    PropTypes.string
  ]).isRequired,

  // methods
  hideModal: PropTypes.func,
  onOk: PropTypes.func,
  isOpen: PropTypes.bool
};

ModalWrapper.defaultProps = {
  title: '',
  isOpen: false,
  showOk: true,
  okText: 'OK',
  okDisabled: false,
  width: 400,
  onOk: () => {}
};

export default ModalWrapper;

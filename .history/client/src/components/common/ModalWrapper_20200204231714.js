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
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const okButton = props.showOk ? (
    <button onClick={onOk} disabled={props.okDisabled}>
      {props.okText}
    </button>
  ) : null;

  return (
    <Modal isOpen={true} fade={false}>
      <ModalHeader>{props.title}</ModalHeader>
      <ModalBody>{'he hu '}</ModalBody>
      <ModalFooter>
        <Button color='primary' onClick={props.onOk}>
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

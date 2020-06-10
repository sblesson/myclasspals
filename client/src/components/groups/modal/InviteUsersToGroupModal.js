import React, { useState } from 'react';
import { UsergroupAddOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
//import { useForm, Controller } from 'react-hook-form';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { inviteToJoinUserGroup } from '../../../actions/group';
import InviteUsersToGroupForm from './InviteUsersToGroupForm';

import { message, Button, Row, Col } from 'antd';

import './CreateGroupModal.scss';

const InviteUsersToGroupModal = ({ current }) => {
  console.log(current);

  const [componentSize, setComponentSize] = useState('small');
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  const onChange = e => {
    //setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChange = value => {
    console.log(`selected ${value}`);
  };

  const onCreateGroupSubmit = data => {};

  const validateRequired = value => {
    return value ? undefined : 'required';
  };

  return (
    <div>
      <div onClick={toggle}>
        <Button
          className='ant-btn btn-primary pinkBtn'
          icon={<UsergroupAddOutlined />}
        >
          Invite
        </Button>
      </div>
      <Modal
        className='create-group-modal'
        isOpen={modal}
        fade={false}
        toggle={toggle}
      >
        <InviteUsersToGroupForm />
      </Modal>
    </div>
  );
};

InviteUsersToGroupModal.propTypes = {
  inviteToJoinUserGroup: PropTypes.func.isRequired
};

const mapDispatchToProps = state => ({
  hideModal: state.hideModal,
  group: state.group
});

export default connect(mapDispatchToProps, {
  inviteToJoinUserGroup,
  mapDispatchToProps
})(withRouter(InviteUsersToGroupModal));

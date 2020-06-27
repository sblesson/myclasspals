import React, { useState } from 'react';
import { UsergroupAddOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import { Modal } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import InviteUsersToGroupForm from './InviteUsersToGroupForm';

import { Button } from 'antd';

import './CreateGroupModal.scss';

const InviteUsersToGroupModal = ({ current }) => {
  console.log(current);
  const [visible, setModalVisibility] = useState(false);

  const showModal = () => {
    setModalVisibility(true);
  };

  const hideModal = () => {
    setModalVisibility(false);
  };
  const toggleModal = () => {
    setModalVisibility(!visible);
  };

  const [componentSize, setComponentSize] = useState('small');
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const onCreateGroupSubmit = data => {};

  const validateRequired = value => {
    return value ? undefined : 'required';
  };

  return (
    <div>
      <div onClick={toggleModal}>
        <Button
          className='ant-btn btn-primary pinkBtn'
          icon={<UsergroupAddOutlined />}
        >
          Invite
        </Button>
      </div>
      <Modal
        centered
        className='create-group-modal'
        visible={visible}
        onOk={hideModal}
        okText='Post'
        onCancel={toggleModal} //pass close logic here
        destroyOnClose={true}
        cancelButtonProps={{ style: { display: 'none' } }}
        destroyOnClose={true}
        footer={null}
      >
        <InviteUsersToGroupForm />
      </Modal>
    </div>
  );
};

InviteUsersToGroupModal.propTypes = {
  group: PropTypes.object.isRequired
};

const mapDispatchToProps = state => ({
  group: state.group
});

export default connect(
  mapDispatchToProps,
  {}
)(withRouter(InviteUsersToGroupModal));

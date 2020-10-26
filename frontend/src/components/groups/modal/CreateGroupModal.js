import React, { useState } from 'react';
import { UsergroupAddOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import { Modal, Button } from 'antd';
import CreateGroupForm from './CreateGroupForm';
import PropTypes from 'prop-types';
import './CreateGroupModal.scss';

const CreateGroupModal = React.memo(({ newRegistration }) => {
  const [visible, setModalVisibility] = useState(false);

  const showModal = () => {
    setModalVisibility(true);
  };

  const hideModal = () => {
    setModalVisibility(false);
  };
  const toggleModal = (event) => {
    event.preventDefault();

    setModalVisibility(!visible);
  };

  const [componentSize, setComponentSize] = useState('small');
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  return (
    <div>
      {newRegistration ? (
        <div
          onClick={(event) => toggleModal(event)}
          className='onboarding-action-container create-action'
        >
          <i className='fas fa-plus-circle'></i>
          <div className='onboarding-action-buttons'>
            Create new school/class group
          </div>
        </div>
      ) : (
        <div onClick={(event) => toggleModal(event)}>
          <Button
            className='btn-primary add-group'
            icon={<UsergroupAddOutlined />}
          >
            Create Group
          </Button>
        </div>
      )}

      <Modal
        className='create-group-modal'
        title={'Create new group'}
        centered
        closable={true}
        visible={visible}
        onOk={hideModal}
        okText='Create'
        onCancel={toggleModal}
        destroyOnClose={true}
        cancelButtonProps={{ style: { display: 'none' } }}
        destroyOnClose={true}
        footer={null}
      >
        <CreateGroupForm isNewGroup={true} setModal={setModalVisibility} />
      </Modal>
    </div>
  );
});

export default withRouter(CreateGroupModal);

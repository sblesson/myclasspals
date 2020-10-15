import React, { useState } from 'react';
import { UsergroupAddOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import { Steps } from 'antd';

import { Modal } from 'antd';

import CreateGroupForm from './CreateGroupForm';
import InviteUsersToGroupForm from './InviteUsersToGroupForm';
import GroupRulesForm from './GroupRulesForm';

import PropTypes from 'prop-types';

import { Button } from 'antd';

import './CreateGroupModal.scss';

const CreateGroupModal = React.memo(() => {
  console.log('inside create group');
  const { Step } = Steps;
  const [current, setCurrentStep] = useState(0);

  const [visible, setModalVisibility] = useState(false);

  const showModal = () => {
    setModalVisibility(true);
  };

  const hideModal = () => {
    setModalVisibility(false);
    setCurrentStep(0);
  };
  const toggleModal = (event) => {
    event.preventDefault();

    setModalVisibility(!visible);
    setCurrentStep(0);
  };

  const [componentSize, setComponentSize] = useState('small');
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const handleStepChange = (current) => {
    //current = current + 1;
    setCurrentStep(current);
    if (current == 3) {
      setModalVisibility(false);
      current = 0;
    }
  };

  const steps = [
    {
      title: 'Create Group',
      subTitle: ' (step 1 of 3)',
      content: (
        <CreateGroupForm
          onStepChange={handleStepChange}
          current={current}
          isNewGroup={true}
          setModal={setModalVisibility}
        />
      ),
    },
    {
      title: 'Invite New Members',
      subTitle: ' (step 2 of 3)',
      content: (
        <InviteUsersToGroupForm
          onStepChange={handleStepChange}
          current={current}
          isNewGroup={true}
          setModal={setModalVisibility}
        />
      ),
    },
    {
      title: 'About Group',
      subTitle: ' (step 3 of 3)',
      content: (
        <GroupRulesForm
          onStepChange={handleStepChange}
          current={current}
          isNewGroup={true}
          setModal={setModalVisibility}
        />
      ),
    },
  ];

  return (
    <div>
      <div onClick={(event) => toggleModal(event)}>
        <Button
          className='btn-primary add-group'
          icon={<UsergroupAddOutlined />}
        >
          Create Group
        </Button>
      </div>
      <Modal
        className='create-group-modal'
        title={steps[current].title + `${steps[current].subTitle}`}
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
        {current <= steps.length - 1 && (
          <div className='steps-content'>{steps[current].content}</div>
        )}
      </Modal>
    </div>
  );
});

export default withRouter(CreateGroupModal);

import React, { useState } from 'react';
import { UsergroupAddOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import { Steps } from 'antd';

import { Modal, ModalHeader, ModalBody } from 'reactstrap';

import CreateGroupForm from './CreateGroupForm';
import InviteUsersToGroupForm from './InviteUsersToGroupForm';
import GroupRulesForm from './GroupRulesForm';

import PropTypes from 'prop-types';

import { Button } from 'antd';

import './CreateGroupModal.scss';

const CreateGroupModal = () => {
  const { Step } = Steps;
  const [current, setCurrentStep] = useState(0);

  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
    setCurrentStep(0);
  };
  const [componentSize, setComponentSize] = useState('small');
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const handleStepChange = current => {
    console.log(current);
    //current = current + 1;
    setCurrentStep(current);
    if (current == 3) {
      setModal(false);
      current = 0;
    }
  };

  const steps = [
    {
      title: 'Create Group',
      subTitle: '(step 1 of 3)',
      content: (
        <CreateGroupForm
          onStepChange={handleStepChange}
          current={current}
          setModal={setModal}
        />
      )
    },
    {
      title: 'Invite New Members',
      subTitle: '(step 2 of 3)',
      content: (
        <InviteUsersToGroupForm
          onStepChange={handleStepChange}
          current={current}
          isNewGroup={true}
          setModal={setModal}
        />
      )
    },
    {
      title: 'About Group',
      subTitle: '(step 3 of 3)',
      content: (
        <GroupRulesForm
          onStepChange={handleStepChange}
          current={current}
          isNewGroup={true}
          setModal={setModal}
          toggle={toggle}
        />
      )
    }
  ];

  return (
    <div>
      <div onClick={toggle}>
        <Button
          className='btn-primary add-group'
          icon={<UsergroupAddOutlined />}
        >
          Create
        </Button>
      </div>
      <Modal
        className='create-group-modal'
        isOpen={modal}
        fade={false}
        toggle={toggle}
      >
        <ModalHeader toggle={toggle}>
          {' '}
          <Steps current={current} size='small' className='group-step'>
            {steps.map(item => (
              <Step
                key={item.title}
                title={item.title}
                subTitle={item.subTitle}
              />
            ))}
          </Steps>{' '}
        </ModalHeader>
        <ModalBody>
          {current <= steps.length - 1 && (
            <div className='steps-content'>{steps[current].content}</div>
          )}
        </ModalBody>
      </Modal>
    </div>
  );
};

export default withRouter(CreateGroupModal);

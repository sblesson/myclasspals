import React, { useState } from 'react';
import { UsergroupAddOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import { Steps } from 'antd';

import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import CreateGroupForm from './CreateGroupForm';
import InviteUsersToGroupForm from './InviteUsersToGroupForm';
import GroupRulesForm from './GroupRulesForm';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  addGroup,
  inviteToJoinUserGroup,
  updateGroup
} from '../../../actions/group';

import { message, Button, Row, Col } from 'antd';

import './CreateGroupModal.scss';

const CreateGroupModal = ({
  sendPrivateMessage,
  schools,
  history,
  addGroup,
  inviteToJoinUserGroup,
  updateGroup,
  auth,
  group
}) => {
  const { Step } = Steps;
  const [current, setCurrentStep] = useState(0);

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
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
          newGroup={true}
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

const mapDispatchToProps = state => ({
  hideModal: state.hideModal,
  auth: state.auth,
  group: state.group
});

export default connect(mapDispatchToProps, {
  mapDispatchToProps
})(withRouter(CreateGroupModal));

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
    if (current == 2) {
      setModal(false);
      current = 0;
    }
  };

  const steps = [
    {
      title: 'Create Group',
      content: (
        <CreateGroupForm onStepChange={handleStepChange} current={current} />
      )
    },
    {
      title: 'Invite New Members',
      content: (
        <InviteUsersToGroupForm
          onStepChange={handleStepChange}
          current={current}
          newGroup={true}
        />
      )
    },
    {
      title: 'Group Rules',
      content: (
        <GroupRulesForm
          onStepChange={handleStepChange}
          current={current}
          newGroup={true}
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
        <div className='create-group-modal-wrapper'>
          <Steps current={current} size='small' className='group-step'>
            {steps.map(item => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
          {current <= steps.length - 1 && (
            <div className='steps-content'>{steps[current].content}</div>
          )}
        </div>
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

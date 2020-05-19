import React, { useState } from 'react';
import { UsergroupAddOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
//import { useForm, Controller } from 'react-hook-form';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { inviteToJoinUserGroup } from '../../../actions/group';
import { Formik } from 'formik';

import {
  SubmitButton,
  Input,
  Checkbox,
  Radio,
  ResetButton,
  FormikDebug,
  Form,
  FormItem
} from 'formik-antd';
import { message, Button, Row, Col } from 'antd';

import './CreateGroupModal.scss';

const InviteUsersToGroupForm = ({
  inviteToJoinUserGroup,
  auth,
  group,
  current,
  onStepChange,
  newGroup
}) => {
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
      <Formik
        initialValues={{
          invitedUsers: '',
          action: 'INVITE'
        }}
        onSubmit={(values, actions) => {
          console.log(JSON.stringify(values));
          console.log(newGroup);
          values.groupId = newGroup ? group.newGroup.id : group.currentGroup.id;
          inviteToJoinUserGroup(JSON.stringify(values));
          actions.setSubmitting(false);
          actions.resetForm();
          if (newGroup) {
            onStepChange(current + 1);
          }
        }}
        validate={values => {
          if (!values.invitedUsers) {
            return { invitedUsers: 'required' };
          }
          return {};
        }}
        render={() => (
          <Form>
            <Input.TextArea
              className='post-form-text-input post-form-textarea'
              name='invitedUsers'
              cols='30'
              rows='5'
              placeholder='Invite non-members of clazzbuddy by typing or pasting email addresses, separated by commas'
              onChange={e => onChange(e)}
              required
            />
            <Row style={{ marginTop: 60 }}>
              <Col offset={8}>
                <Button.Group>
                  <ResetButton>Reset</ResetButton>
                  <SubmitButton> Send Invite</SubmitButton>
                </Button.Group>
              </Col>
            </Row>
          </Form>
        )}
      />
    </div>
  );
};

InviteUsersToGroupForm.propTypes = {
  inviteToJoinUserGroup: PropTypes.func.isRequired
};

const mapDispatchToProps = state => ({
  hideModal: state.hideModal,
  group: state.group
});

export default connect(mapDispatchToProps, {
  inviteToJoinUserGroup,
  mapDispatchToProps
})(withRouter(InviteUsersToGroupForm));

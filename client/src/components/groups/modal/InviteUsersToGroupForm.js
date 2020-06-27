import React, { useState } from 'react';
import { UsergroupAddOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { inviteToJoinUserGroup } from '../../../actions/group';
import { Formik } from 'formik';
import MultiSelectUserSearch from '../../common/multiselectusersearch/MultiSelectUserSearch';
import { Button } from 'antd';

import { SubmitButton, Input, FormikDebug, Form, FormItem } from 'formik-antd';

import './CreateGroupModal.scss';

const InviteUsersToGroupForm = ({
  inviteToJoinUserGroup,
  auth,
  group,
  current,
  onStepChange,
  isNewGroup
}) => {
  const [componentSize, setComponentSize] = useState('small');
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const validateRequired = value => {
    return value ? undefined : 'required';
  };

  const goToNextStep = (event, current) => {
    onStepChange(current + 1);
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 }
    }
  };

  return (
    <div>
      {isNewGroup ? (
        <div>
          {' '}
          <Button
            type='link'
            style={{ float: 'right' }}
            onClick={e => goToNextStep(e, current)}
          >
            Skip
          </Button>
          <br />
        </div>
      ) : (
        ''
      )}

      <Formik
        initialValues={{
          invitedUsers: ''
        }}
        onSubmit={(values, actions) => {
          if (values.usersSelect && values.invitedUsers) {
            values.invitedUsers =
              values.usersSelect.toString() + ',' + values.invitedUsers;
          } else if (values.usersSelect && !values.invitedUsers) {
            values.invitedUsers = values.usersSelect.toString();
          }
          delete values.usersSelect;

          values.groupId = isNewGroup
            ? group.newGroup.id
            : group.currentGroup.id;
          inviteToJoinUserGroup(JSON.stringify(values));

          actions.setSubmitting(false);
          actions.resetForm();
          if (isNewGroup) {
            onStepChange(current + 1);
          }
        }}
        render={() => (
          <div style={{ flex: 1, padding: 10 }}>
            <Form
              className='form-wrapper'
              {...formItemLayout}
              layout='vertical'
              initialValues={{
                size: componentSize
              }}
            >
              {' '}
              <FormItem
                name='usersSelect'
                label='Select Members'
                required={false}
              >
                <MultiSelectUserSearch endUsersSelect={'usersSelect'} />
              </FormItem>
              <FormItem
                name='invitedUsers'
                label='Invite non members'
                required={false}
                style={{ marginTop: 20 }}
              >
                <Input.TextArea
                  className='post-form-text-input post-form-textarea'
                  name='invitedUsers'
                  cols='20'
                  rows='5'
                  placeholder='Invite non-members of clazzbuddy by typing or pasting email addresses, separated by commas'
                  required={false}
                />
              </FormItem>
              <SubmitButton
                className='ant-btn btn-primary'
                style={{ marginTop: 20 }}
              >
                {' '}
                Invite
              </SubmitButton>
              {/* <FormikDebug /> */}
            </Form>
          </div>
        )}
      />
    </div>
  );
};

InviteUsersToGroupForm.propTypes = {
  inviteToJoinUserGroup: PropTypes.func.isRequired
};

const mapDispatchToProps = state => ({
  group: state.group
});

export default connect(mapDispatchToProps, {
  inviteToJoinUserGroup,
  mapDispatchToProps
})(withRouter(InviteUsersToGroupForm));

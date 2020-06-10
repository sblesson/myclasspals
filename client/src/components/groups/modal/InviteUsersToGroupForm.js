import React, { useState } from 'react';
import { UsergroupAddOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
//import { useForm, Controller } from 'react-hook-form';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { inviteToJoinUserGroup } from '../../../actions/group';
import { Formik } from 'formik';
import MultiSelectUserSearch from '../../common/multiselectusersearch/MultiSelectUserSearch';
import { message, Button, Row, Col } from 'antd';

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

import './CreateGroupModal.scss';

const InviteUsersToGroupForm = ({
  inviteToJoinUserGroup,
  auth,
  group,
  current,
  onStepChange,
  isNewGroup,
  setModal
}) => {
  debugger;
  console.log(current);

  const [componentSize, setComponentSize] = useState('small');
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

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

  const goToNextStep = (event, current) => {
    console.log(event);
    console.log(current);

    onStepChange(current + 1);
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
          invitedUsers: '',
          action: 'INVITE'
        }}
        onSubmit={(values, actions) => {
          values.invitedUsers =
            values.usersSelect.toString() + ',' + values.invitedUsers;
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
        /*       validate={values => {
          if (!values.invitedUsers) {
            return { invitedUsers: 'required' };
          }
          return {};
        }} */
        render={() => (
          <Form>
            <FormItem
              name='usersSelect'
              style={{ marginTop: 40 }}
              //label='Add Users'
              required={false}
              //validate={validateRequired}
            >
              <MultiSelectUserSearch />
            </FormItem>
            <Input.TextArea
              style={{ marginTop: 20 }}
              className='post-form-text-input post-form-textarea'
              name='invitedUsers'
              cols='30'
              rows='5'
              placeholder='Invite non-members of clazzbuddy by typing or pasting email addresses, separated by commas'
              onChange={e => onChange(e)}
              required={false}
            />
            <ModalFooter>
              <SubmitButton className='ant-btn btn-primary'>
                {' '}
                Invite
              </SubmitButton>
            </ModalFooter>
            <FormikDebug />
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

import React, { useState } from 'react';
import { UsergroupAddOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import { Tab } from 'semantic-ui-react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
//import { useForm, Controller } from 'react-hook-form';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sendPrivateMessage } from '../../../actions/post';
import { fetchSchool } from '../../../actions/school';
import {
  addGroup,
  inviteToJoinUserGroup,
  updateGroup
} from '../../../actions/group';
import AutoCompleteSchoolSearch from '../../common/autocompleteschoolsearch/AutoCompleteSchoolSearch';
import MultiSelectUserSearch from '../../common/multiselectusersearch/MultiSelectUserSearch';

import { Formik, ErrorMessage } from 'formik';

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
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedSchool, setSelectedSchool] = useState('');
  const [isSchoolVisible, setIsSchoolVisible] = useState(false);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [componentSize, setComponentSize] = useState('small');
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const defaultValues = {
    groupName: '',
    TextField: '',
    Select: '',
    ReactSelect: '',
    Checkbox: false,
    switch: false,
    RadioGroup: '',
    newGroupMembers: ''
  };

  const handleTabChange = (e, { activeIndex }) => {
    console.log(e);
    console.log(activeIndex);
    setActiveIndex(activeIndex);
  };

  const onChange = e => {
    console.log(e.target.name, e.target.value);
  };

  const onCreateGroupSubmit = data => {
    console.log(data);
  };

  const validateRequired = value => {
    return value ? undefined : 'required';
  };

  const validateSchoolGroupRadio = value => {
    console.log(value);
  };

  const showHideSchoolSelect = event => {
    console.log('shool', event);
    if (event.target.value === 'yes') {
      setIsSchoolVisible(true);
      console.log('selectedSchool', selectedSchool);
    } else {
      setIsSchoolVisible(false);
    }
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
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0
      },
      sm: {
        span: 16,
        offset: 8
      }
    }
  };
  const submitProfileForm = (values, actions) => {
    message.info(JSON.stringify(values, null, 4));
    values.schoolName = schools.selectedSchool.schoolName;
    values.schoolId = schools.selectedSchool.schoolid;
    values.schoolCity = schools.selectedSchool.city;
    values.schoolState = schools.selectedSchool.state;
    values.schoolZipCode = schools.selectedSchool.zip;

    values.userGroupMembers = [
      {
        _id: auth.user._id,
        name: auth.user.name,
        role: 'admin'
      }
    ];
    addGroup(JSON.stringify(values));
    actions.setSubmitting(false);
    actions.resetForm();
    setActiveIndex(1);
  };
  const panes = [
    {
      menuItem: 'Create New Group',
      render: () => (
        <Tab.Pane attached={false}>
          <div>
            <Formik
              initialValues={{
                groupName: '',
                privacy: 'private',
                //hidden: 'visible',
                isSchoolGroup: 'no'
              }}
              onSubmit={(values, actions) => {
                submitProfileForm(values, actions);
              }}
              render={() => (
                <Form
                  {...formItemLayout}
                  layout='vertical'
                  initialValues={{
                    size: componentSize
                  }}
                >
                  <div style={{ flex: 1, padding: 15 }}>
                    <FormItem
                      name='groupName'
                      label='Group Name'
                      required={true}
                      validate={validateRequired}
                    >
                      <Input name='groupName' placeholder='Group Name' />
                    </FormItem>
                    <FormItem
                      name='groupUsers'
                      label='Add Users'
                      required={true}
                      validate={validateRequired}
                    >
                      <MultiSelectUserSearch />
                    </FormItem>
                    <FormItem
                      name='privacyLabel'
                      label='Privacy'
                      //required={true}
                      //validate={validateRequired}
                    >
                      <Radio.Group
                        name='privacy'
                        options={[
                          { label: 'Private', value: 'private' },
                          { label: 'Public', value: 'public' }
                        ]}
                      />
                    </FormItem>
                    {/*              <FormItem
                      name='visibilityLabel'
                      label='Visibility'
                      //required={true}
                      //validate={validateRequired}
                    >
                      <Radio.Group
                        name='hidden'
                        options={[
                          { label: 'Hidden', value: 'hidden' },
                          { label: 'Visible', value: 'visible' }
                        ]}
                      />
                    </FormItem> */}
                    <FormItem
                      name='schoolGroupLabel'
                      label='School Group'
                      required={true}
                      validate={validateSchoolGroupRadio}
                    >
                      <Radio.Group
                        name='isSchoolGroup'
                        onChange={showHideSchoolSelect}
                        options={[
                          { label: 'Yes', value: 'yes' },
                          { label: 'No', value: 'no' }
                        ]}
                      />
                    </FormItem>
                    {isSchoolVisible ? (
                      <FormItem
                        name='schoolName'
                        required={true}
                        validate={validateRequired}
                      >
                        <AutoCompleteSchoolSearch />
                      </FormItem>
                    ) : (
                      ''
                    )}
                    <ModalFooter>
                      {' '}
                      <SubmitButton className='create-group-btn'>
                        Create
                      </SubmitButton>{' '}
                    </ModalFooter>{' '}
                  </div>
                  {/*                   <FormikDebug style={{ maxWidth: 400 }} />
                   */}{' '}
                </Form>
              )}
            />
          </div>
        </Tab.Pane>
      )
    },
    {
      menuItem: 'Send Invitation',
      render: () => (
        <Tab.Pane attached={false}>
          <Formik
            initialValues={{
              invitedUsers: '',
              action: 'INVITE',
              role: 'member'
            }}
            onSubmit={(values, actions) => {
              console.log(JSON.stringify(values));
              values.groupId = group.newGroup.id;
              inviteToJoinUserGroup(JSON.stringify(values));
              actions.setSubmitting(false);
              actions.resetForm();
              setActiveIndex(2);
            }}
            render={() => (
              <div style={{ flex: 1, padding: 15 }}>
                <Form
                  className='form-wrapper'
                  {...formItemLayout}
                  layout='vertical'
                  initialValues={{
                    size: componentSize
                  }}
                >
                  <FormItem name='invitedUsers' label='Invite Buddies'>
                    <Input.TextArea
                      className='post-form-text-input post-form-textarea'
                      name='invitedUsers'
                      cols='50'
                      rows='10'
                      placeholder='Invite buddies to new group by typing or pasting email addresses, separated by commas'
                      onChange={e => onChange(e)}
                      required
                    />{' '}
                  </FormItem>
                  <ModalFooter>
                    <SubmitButton className='send-invite-btn'>
                      {' '}
                      Send Invite
                    </SubmitButton>
                  </ModalFooter>
                </Form>
              </div>
            )}
          />
        </Tab.Pane>
      )
    },
    {
      menuItem: 'Group Policy',
      render: () => (
        <Tab.Pane attached={false}>
          <Formik
            initialValues={{
              groupRules: '',
              description: ''
            }}
            onSubmit={(values, actions) => {
              console.log(JSON.stringify(values));
              values.id = group.newGroup.id;
              delete values['invitedUsers'];
              delete values['action'];
              delete values['role'];

              updateGroup(JSON.stringify(values));
              actions.setSubmitting(false);
              actions.resetForm();
              setModal(false);
              setActiveIndex(0);
            }}
            validate={values => {}}
            render={() => (
              <div style={{ flex: 1, padding: 15 }}>
                <Form
                  className='form-wrapper'
                  {...formItemLayout}
                  layout='vertical'
                  initialValues={{
                    size: componentSize
                  }}
                >
                  <FormItem
                    name='description'
                    label='About Group'
                    style={{ marginBottom: 16 }}
                  >
                    <Input
                      name='description'
                      placeholder='What is this group about?'
                    />
                  </FormItem>
                  <FormItem name='groupRules' label='Group Rules'>
                    <Input.TextArea
                      className='post-form-text-input post-form-textarea'
                      name='groupRules'
                      cols='50'
                      rows='10'
                      placeholder='Start with the right tone by sharing your purpose and rules for your group?'
                      onChange={e => onChange(e)}
                      required
                    />{' '}
                  </FormItem>

                  <ModalFooter>
                    <SubmitButton className='send-post-btn'> Post</SubmitButton>
                  </ModalFooter>
                </Form>
              </div>
            )}
          />
        </Tab.Pane>
      )
    }
  ];
  return (
    <div>
      <div onClick={toggle}>
        <Button className='btn-primary' icon={<UsergroupAddOutlined />}>
          Create Group
        </Button>
      </div>
      <Modal
        className='create-group-modal'
        isOpen={modal}
        fade={false}
        toggle={toggle}
      >
        <Tab
          menu={{ secondary: true, pointing: true }}
          panes={panes}
          activeIndex={activeIndex}
          onTabChange={handleTabChange}
        />
      </Modal>
    </div>
  );
};

CreateGroupModal.propTypes = {
  sendPrivateMessage: PropTypes.func.isRequired
};

const mapDispatchToProps = state => ({
  hideModal: state.hideModal,
  schools: state.school.results,
  isSchoolLoading: state.school.isLoading,
  auth: state.auth,
  group: state.group
});

export default connect(mapDispatchToProps, {
  sendPrivateMessage,
  fetchSchool,
  addGroup,
  inviteToJoinUserGroup,
  updateGroup,
  mapDispatchToProps
})(withRouter(CreateGroupModal));

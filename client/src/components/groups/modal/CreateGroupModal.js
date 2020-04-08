import React, { useState } from 'react';
import { UsergroupAddOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import { Tab } from 'semantic-ui-react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
//import { useForm, Controller } from 'react-hook-form';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sendPrivateMessage } from '../../../actions/post';
import { getSchoolData } from '../../../actions/school';
import {
  addGroup,
  inviteToJoinUserGroup,
  updateGroup
} from '../../../actions/group';
import {
  Menu,
  ControllerButton,
  //Input,
  Item,
  ArrowIcon,
  XIcon
} from '../../common/DownshiftComponents';
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

import { Div } from 'glamorous';

import Downshift from 'downshift';

import './CreateGroupModal.scss';

const CreateGroupModal = ({
  sendPrivateMessage,
  getSchoolData,
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

  const inputOnChange = event => {
    console.log(event.target.value);
    if (!event.target.value) {
      return;
    }
    fetchSchools(event.target.value);
  };

  const fetchSchools = searchTerm => {
    setTimeout(() => {
      getSchoolData(searchTerm);
    }, Math.random() * 1000);
  };

  const schoolNameSelectHandler = selectedItem => {
    console.log(selectedItem);
    setSelectedSchool(selectedItem);
  };

  const schoolNameToString = (item, index) => {
    console.log(item);
    return item ? item.schoolName : '';
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
                message.info(JSON.stringify(values, null, 4));
                values.schoolName = selectedSchool.schoolName;
                values.schoolId = selectedSchool.schoolid;
                values.schoolCity = selectedSchool.city;
                values.schoolState = selectedSchool.state;
                values.schoolZipCode = selectedSchool.zip;

                //deleting unwanted property
                delete values['downshift-0-input'];

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
                        <Downshift
                          onChange={selectedItem =>
                            schoolNameSelectHandler(selectedItem)
                          }
                          itemToString={schoolNameToString}
                        >
                          {({
                            getInputProps,
                            getToggleButtonProps,
                            getItemProps,
                            isOpen,
                            toggleMenu,
                            clearSelection,
                            selectedItem,
                            inputValue,
                            getLabelProps,
                            highlightedIndex
                          }) => (
                            <div>
                              <Div
                                position='relative'
                                css={{ paddingRight: '1.75em' }}
                              >
                                <Input
                                  {...getInputProps({
                                    placeholder:
                                      'Type school or district or city, zip...',
                                    onKeyUp: inputOnChange
                                  })}
                                />
                                {selectedItem ? (
                                  <ControllerButton
                                    css={{ paddingTop: 4, top: 5 }}
                                    onClick={clearSelection}
                                    aria-label='clear selection'
                                  >
                                    <XIcon />
                                  </ControllerButton>
                                ) : (
                                  <ControllerButton {...getToggleButtonProps()}>
                                    <ArrowIcon
                                      isOpen={isOpen}
                                      className='icon-auto-open'
                                    />
                                  </ControllerButton>
                                )}
                              </Div>
                              {isOpen ? (
                                <Menu>
                                  {schools.map((item, index) => (
                                    <Item
                                      key={item.schoolid}
                                      {...getItemProps({
                                        item,
                                        index,
                                        isActive: highlightedIndex === index,
                                        isSelected: selectedItem === item
                                      })}
                                    >
                                      {item.schoolName}
                                    </Item>
                                  ))}
                                </Menu>
                              ) : null}
                            </div>
                          )}
                        </Downshift>
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
  getSchoolData,
  addGroup,
  inviteToJoinUserGroup,
  updateGroup,
  mapDispatchToProps
})(withRouter(CreateGroupModal));

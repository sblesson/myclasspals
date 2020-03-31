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
import { addGroup, inviteToJoinUserGroup } from '../../../actions/group';
import {
  Menu,
  ControllerButton,
  //Input,
  Item,
  ArrowIcon,
  XIcon
} from '../../common/DownshiftComponents';
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
  auth,
  group
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  //const [userList, setUserList] = useState(children);

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

  const handleTabChange = (e, { activeIndex }) => setActiveIndex(activeIndex);

  const handlePageChange = e => {
    setActiveIndex(e.target.value);
  };

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  const onChange = e => {
    console.log(e.target.name, e.target.value);
    //setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChange = value => {
    console.log(`selected ${value}`);
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
    //community[index].schoolid = selectedItem.schoolid;
  };

  const schoolNameToString = (item, index) => {
    console.log(item);
    //community[index].school = item;
    //if (item) setGradeOptions(item.lowGrade, item.highGrade);
    return item ? item.schoolName : '';
  };

  const onCreateGroupSubmit = data => {
    console.log(data);
  };

  const validateRequired = value => {
    return value ? undefined : 'required';
  };

  const panes = [
    {
      menuItem: 'Create New Group',
      render: () => (
        <Tab.Pane attached={false}>
          {/*    
              <Form.Group className='private-message-modal-field'>
                <Select
                  mode='multiple'
                  style={{ width: '100%' }}
                  placeholder='select one country'
                  defaultValue={['china']}
                  onChange={handleChange}
                  optionLabelProp='label'
                >
                  {userList}
                </Select>
              </Form.Group>
              <Form.Group>
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
                    <div className='auto-container'>
                      <Div position='relative' css={{ paddingRight: '1.75em' }}>
                        <Input
                          {...getInputProps({
                            placeholder:
                              'Type school or district or an address, city, zip...',
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
                            <ArrowIcon isOpen={isOpen} />
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
              </Form.Group> */}

          <div>
            <Formik
              initialValues={{
                groupName: '',
                privacy: 'private',
                hidden: 'visible'
                //isSchoolGroup: 'no'
              }}
              onSubmit={(values, actions) => {
                message.info(JSON.stringify(values, null, 4));
                console.log(values);

                values.createrUserId = {
                  _id: auth.user._id,
                  name: auth.user.name
                };
                console.log(JSON.stringify(values));

                addGroup(JSON.stringify(values));
                actions.setSubmitting(false);
                actions.resetForm();
              }}
              validate={values => {
                if (!values.groupName) {
                  return { groupName: 'required' };
                }
                return {};
              }}
              render={() => (
                <Form
                  labelCol={{
                    span: 8
                  }}
                  wrapperCol={{
                    span: 16
                  }}
                  layout='horizontal'
                  initialValues={{
                    size: componentSize
                  }}
                >
                  <div style={{ flex: 1, padding: 40 }}>
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

                    <FormItem
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
                    </FormItem>
                    <FormItem
                      name='schoolGroupLabel'
                      label='Are you creating this group for your school?'
                      //required={true}
                      //validate={validateRequired}
                    >
                      <Radio.Group
                        name='isSchoolGroup'
                        options={[
                          { label: 'Yes', value: 'yes' },
                          { label: 'No', value: 'no' }
                        ]}
                      />
                    </FormItem>

                    {/* 
                    <FormItem
                      name='newsletter'
                      labelCol={{ xs: 4 }}
                      wrapperCol={{ offset: 4, xs: 20 }}
                    >
                      <Checkbox name='groupTandA'>
                        I accept the terms &amp; conditions
                      </Checkbox>
                    </FormItem> */}

                    <Row style={{ marginTop: 60 }}>
                      <Col offset={8}>
                        <Button.Group>
                          <ResetButton>Reset</ResetButton>
                          <SubmitButton>Submit</SubmitButton>
                        </Button.Group>
                      </Col>
                    </Row>
                  </div>
                  <FormikDebug style={{ maxWidth: 400 }} />
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
              action: 'INVITE'
            }}
            onSubmit={(values, actions) => {
              console.log(JSON.stringify(values));
              values.groupId = group.newGroup.id;
              inviteToJoinUserGroup(JSON.stringify(values));
              actions.setSubmitting(false);
              actions.resetForm();
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
        </Tab.Pane>
      )
    },
    {
      menuItem: 'Group Policy',
      render: () => (
        <Tab.Pane attached={false}>
          <Form>
            <Form.Group className='private-message-modal-field'>
              <textarea
                className='post-form-text-input post-form-textarea'
                name='group_rules'
                cols='30'
                rows='5'
                placeholder='Start with the right tone by sharing your purpose and rules for your group?'
                onChange={e => onChange(e)}
                required
              />
            </Form.Group>
            <ModalFooter>
              {' '}
              <input type='submit' value='Post' />
            </ModalFooter>{' '}
          </Form>
        </Tab.Pane>
      )
    }
  ];
  return (
    <div>
      <div onClick={toggle}>
        <Button className='pinkBtn' icon={<UsergroupAddOutlined />}>
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
  mapDispatchToProps
})(withRouter(CreateGroupModal));

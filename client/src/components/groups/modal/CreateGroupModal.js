import React, { useState } from 'react';
import { Button, Select } from 'antd';
import { UsergroupAddOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import { Tab, Form, Radio } from 'semantic-ui-react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { DevTool } from 'react-hook-form-devtools';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sendPrivateMessage } from '../../../actions/post';
import { getSchoolData } from '../../../actions/school';
import {
  Menu,
  ControllerButton,
  Input,
  Item,
  ArrowIcon,
  XIcon
} from '../../common/DownshiftComponents';

import { Div } from 'glamorous';

import Downshift from 'downshift';

import './CreateGroupModal.scss';

const CreateGroupModal = ({
  sendPrivateMessage,
  getSchoolData,
  schools,
  history
}) => {
  const { Option } = Select;
  const { register, handleSubmit, errors, setValue } = useForm();

  const FORM_DATA = {
    groupName: '',
    privacy: 'private',
    visibility: 'hidden',
    schoolGroup: false,
    members: []
  };
  const [formData, setFormData] = useState(FORM_DATA);
  const children = [];
  for (let i = 10; i < 36; i++) {
    children.push(
      <Option key={i.toString(36) + i} value='yc' label='YC'>
        <div className='demo-option-label-item'>Founder</div>
      </Option>
    );
  }
  const [activeIndex, setActiveIndex] = useState(0);
  const [userList, setUserList] = useState(children);

  const handleTabChange = (e, { activeIndex }) => setActiveIndex(activeIndex);

  const handlePageChange = e => {
    setActiveIndex(e.target.value);
  };

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  const onChange = e => {
    console.log(e.target.name, e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

  const panes = [
    {
      menuItem: 'Create New Group',
      render: () => (
        <Tab.Pane attached={false}>
          <Form onSubmit={handleSubmit(onCreateGroupSubmit)}>
            <ModalBody>
              <div className='private-group-modal-field'>
                <input
                  className='post-form-text-input'
                  type='text'
                  id='group_name'
                  name='group_name'
                  placeholder='Group Name'
                  ref={register({
                    required: true,
                    maxLength: 30,
                    minLength: 3
                  })}
                />
                <p>
                  {errors.group_name &&
                    errors.group_name.type === 'required' && (
                      <span>This is required</span>
                    )}
                  {errors.group_name &&
                    errors.group_name.type === 'maxLength' && (
                      <span>Max length exceeded</span>
                    )}
                  {errors.group_name &&
                    errors.group_name.type === 'minLength' && (
                      <span>Group name should be minimun 3 characters</span>
                    )}
                </p>
              </div>
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
              <Form.Group inline>
                <label>Are you creating this group for your school?</label>
                <input
                  name='school-group-radio'
                  type='radio'
                  value='Yes'
                  ref={register({ required: true })}
                />
                <input
                  name='school-group-radio'
                  type='radio'
                  value='No'
                  ref={register({ required: true })}
                />
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
              </Form.Group>
              <Form.Group inline>
                <label>Privacy</label>
                <Form.Field
                  control={Radio}
                  label='Private'
                  value='private'
                  //defaultChecked={true}
                  checked={formData.privacy === 'private'}
                  onChange={e => onChange(e)}
                />
                <Form.Field
                  control={Radio}
                  label='Public'
                  value='public'
                  checked={formData.privacy === 'public'}
                  //checked={value === 'public'}
                  onChange={e => onChange(e)}
                />
              </Form.Group>
              <Form.Group inline>
                <label>Hidden</label>
                <Form.Radio
                  label='Hidden'
                  value='hidden'
                  //checked={value === 'private'}
                  onChange={e => onChange(e)}
                />
                <Form.Radio
                  label='Visible'
                  value='visible'
                  defaultChecked={true}
                  //checked={value === 'public'}
                  onChange={e => onChange(e)}
                />
              </Form.Group>
            </ModalBody>

            <ModalFooter>
              {' '}
              <input type='submit' value='Create' />
            </ModalFooter>
          </Form>
        </Tab.Pane>
      )
    },
    {
      menuItem: 'Send Invitation',
      render: () => (
        <Tab.Pane attached={false}>
          <Form>
            <Form.Group className='private-message-modal-field'>
              <textarea
                className='post-form-text-input post-form-textarea'
                name='new_group_members'
                cols='30'
                rows='5'
                placeholder='Invite non-members of clazzbuddy by typing or pasting email addresses, separated by commas'
                onChange={e => onChange(e)}
                required
              />
            </Form.Group>
            <ModalFooter>
              {' '}
              <input type='submit' value='Send Invite' />
            </ModalFooter>{' '}
          </Form>
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
  isSchoolLoading: state.school.isLoading
});

export default connect(mapDispatchToProps, {
  sendPrivateMessage,
  getSchoolData,
  mapDispatchToProps
})(withRouter(CreateGroupModal));

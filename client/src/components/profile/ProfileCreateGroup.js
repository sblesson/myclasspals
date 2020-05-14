import React, { useEffect, useState, Fragment } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import _ from 'lodash';
import { message, Button, Row, Col } from 'antd';
import { Formik, ErrorMessage } from 'formik';
import { ModalFooter } from 'reactstrap';
import AutoCompleteSchoolSearch from '../common/autocompleteschoolsearch/AutoCompleteSchoolSearch';
import MultiSelectUserSearch from '../common/multiselectusersearch/MultiSelectUserSearch';
import { createProfile } from '../../actions/profile';
import {
  addGroup,
  inviteToJoinUserGroup,
  updateGroup
} from '../../actions/group';

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

const ProfileCreateGroup = ({ addGroup, schools, auth }) => {
  //for group
  const [selectedSchool, setSelectedSchool] = useState('');
  const [isSchoolVisible, setIsSchoolVisible] = useState(false);
  const [componentSize, setComponentSize] = useState('small');
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const [activeIndex, setActiveIndex] = useState(0);
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
  const showHideSchoolSelect = event => {
    console.log('shool', event);
    if (event.target.value === 'yes') {
      setIsSchoolVisible(true);
      console.log('selectedSchool', selectedSchool);
    } else {
      setIsSchoolVisible(false);
    }
  };

  const validateSchoolGroupRadio = value => {
    console.log(value);
  };
  const validateRequired = value => {
    return value ? undefined : 'required';
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
  return (
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
          </Form>
        )}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  isLoading: state.school.isLoading,
  schools: state.school.results
});
export default connect(mapStateToProps, {
  createProfile,
  addGroup
})(withRouter(ProfileCreateGroup));

import React, { useEffect, useState, Fragment } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { createProfile } from '../../../actions/profile';
import { searchGroupWithFilters } from '../../../actions/group';
import { Formik, ErrorMessage } from 'formik';
import { ModalFooter } from 'reactstrap';
import {
  SubmitButton,
  Input,
  Form,
  Radio,
  FormItem,
  FormikDebug,
  AutoComplete,
  Select
} from 'formik-antd';
import { Typography, message, Button, Row, Col } from 'antd';

import { addGroup } from '../../../actions/group';

import AutoCompleteCitySeach from '../../common/autocompletecitysearch/AutoCompleteCitySearch';

import MultiSelectUserSearch from '../../common/multiselectusersearch/MultiSelectUserSearch';
import MultiSelectSchoolSearch from '../../common/multiselectschoolsearch/MultiSelectSchoolSearch';

const CreateGroupForm = ({
  auth,
  group,
  schools,
  addGroup,
  current,
  onStepChange
}) => {
  console.log(current);
  //const [formData, setFormData] = useState({ user });
  const validateRequired = value => {
    console.log(value);
    return value ? undefined : 'required';
  };
  const [componentSize, setComponentSize] = useState('small');
  const inputOnChange = event => {
    if (!event.target.value) {
      return;
    }
    console.log(event.target);
    //fetchSchools(event.target.value);
  };

  const [selectedSchool, setSelectedSchool] = useState('');
  const [isSchoolVisible, setIsSchoolVisible] = useState(false);
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
  const submitProfileForm = (values, actions) => {
    console.log(values);
    /*     values.schoolName = schools.selectedSchool.schoolName;
    values.schoolId = schools.selectedSchool.schoolid;
    values.schoolCity = schools.selectedSchool.city;
    values.schoolState = schools.selectedSchool.state;
    values.schoolZipCode = schools.selectedSchool.zip; */

    values.userGroupMembers = [
      {
        _id: auth.user._id,
        name: auth.user.name,
        role: 'admin'
      }
    ];

    /*    "values": {
      "groupName": "",
      "groupType": "private",
      "isSchoolGroup": "yes",
      "schoolId": [
        "320036000871"
      ]
    }, */

    addGroup(JSON.stringify(values));
    //actions.setSubmitting(false);
    actions.resetForm();
    console.log(current);
    onStepChange(current + 1);
  };

  const groupForm = (
    <Formik
      initialValues={{
        groupName: '',
        groupType: 'private',
        isSchoolGroup: 'no'
      }}
      onSubmit={(values, actions) => {
        submitProfileForm(values, actions);
      }}
      validator={() => ({})}
      //validate={values => {}}
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
            <FormItem
              name='groupName'
              //label='Group Name'
              //required={true}
              validate={validateRequired}
            >
              <Input name='groupName' placeholder='Group Name' />
            </FormItem>

            <FormItem
              name='usersSelect'
              //label='Add Users'
              required={true}
              validate={validateRequired}
            >
              <MultiSelectUserSearch />
            </FormItem>
            <FormItem
              name='groupDiscovery'
              label='Group Discoverability'
              //required={true}
              //validate={validateRequired}
            >
              <Radio.Group
                name='groupType'
                options={[
                  {
                    label: 'Private --appears in search results',
                    value: 'private'
                  },
                  {
                    label: 'Public',
                    value: 'public'
                  },
                  {
                    label:
                      'Hidden --not appear in search results, need invitation',
                    value: 'hidden'
                  }
                ]}
              />
            </FormItem>
            <FormItem name='schoolGroupLabel' label='School Group'>
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
                <MultiSelectSchoolSearch />
              </FormItem>
            ) : (
              ''
            )}
            <ModalFooter>
              <SubmitButton> Create</SubmitButton>
            </ModalFooter>
          </Form>
          <pre style={{ flex: 1 }}>
            <FormikDebug />
          </pre>
        </div>
      )}
    />
  );

  return <Fragment>{groupForm}</Fragment>;
};

CreateGroupForm.propTypes = {
  //profileData: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  group: state.group,
  auth: state.auth,
  schools: state.school.results
});

export default connect(mapStateToProps, {
  addGroup
})(withRouter(CreateGroupForm));

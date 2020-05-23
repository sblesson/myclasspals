import React, { useEffect, useState, Fragment } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { createProfile } from '../../actions/profile';
import { searchGroupWithFilters } from '../../actions/group';

import { Formik, ErrorMessage } from 'formik';
import { ModalFooter } from 'reactstrap';
import {
  SubmitButton,
  Input,
  Form,
  FormItem,
  FormikDebug,
  AutoComplete,
  Select
} from 'formik-antd';

import AutoCompleteCitySeach from '../common/autocompletecitysearch/AutoCompleteCitySearch';
import AutoCompleteGroupSearch from '../common/autocompletegroupsearch/AutoCompleteGroupSearch';

import MultiSelectSchoolSearch from '../common/multiselectschoolsearch/MultiSelectSchoolSearch';

const UserAccountForm = ({
  auth,
  createProfile,
  searchGroupWithFilters,
  current,
  onStepChange,
  history
}) => {
  useEffect(() => {
    if (auth && auth.user) {
      console.log(auth.user);

      let user = auth.user;
      if (user.userGroup && user.userGroup.length > 0) {
        history
          ? history.push('/dashboard')
          : (window.location.pathname = '/dashboard');
      } else if (
        user.requestedUserGroup &&
        user.requestedUserGroup.length > 0
      ) {
        history
          ? history.push('/groups')
          : (window.location.pathname = '/groups');
      } else if (auth.user.city) {
        onStepChange(current);
      }
    }
  }, [auth]);
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

  const yourInfo = (
    <Formik
      initialValues={{
        email: '',
        name: '',
        city: '',
        state: '',
        zipcode: '',
        schoolId: []
      }}
      onSubmit={values => {
        console.log(auth.user.email);
        console.log(values);
        let myAddress = JSON.parse(values.citySelect);

        createProfile({
          email: auth.user.email,
          name: values.userName,
          city: myAddress.city,
          state: myAddress.state,
          zipcode: myAddress.postalcode,
          schoolId: values.schoolId
        });
        searchGroupWithFilters({
          zipcode: myAddress.postalcode
        });
        onStepChange(current);
        /*      let myAddress = JSON.parse(values.selectedCity);
        let mySchools = JSON.parse(values.schools);
        console.log(myAddress);
        console.log(JSON.parse(values.schoools));
        createProfile({
          name: values.userName,
          city: myAddress.city,
          state: myAddress.state,
          zipcode: myAddress.postalCode,
          schools: mySchools
        }); */
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
            {auth !== null && auth.user && auth.user.name === null ? (
              <FormItem
                name='userName'
                //label='Name'
                //required={true}
                //validate={validateRequired}
              >
                <Input name='userName' placeholder='What should we call you?' />
              </FormItem>
            ) : (
              ''
            )}
            <FormItem
              name='city'
              //label='City'
              //required={true}
              //validate={validateRequired}
            >
              <AutoCompleteCitySeach />
            </FormItem>
            <FormItem
              name='groupName'
              //label='City'
              //required={true}
              //validate={validateRequired}
            >
              <AutoCompleteGroupSearch />
            </FormItem>

            <FormItem
              name='schoolName'
              //label='Schools you want to follow'
              required={false}
            >
              <MultiSelectSchoolSearch />
            </FormItem>
            <ModalFooter>
              <SubmitButton className='ant-btn btn-primary'>
                {' '}
                Proceed
              </SubmitButton>
            </ModalFooter>
          </Form>
          <pre style={{ flex: 1 }}>
            <FormikDebug />
          </pre>
        </div>
      )}
    />
  );

  return <Fragment>{yourInfo}</Fragment>;
};

UserAccountForm.propTypes = {
  //profileData: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {
  createProfile,
  searchGroupWithFilters
})(withRouter(UserAccountForm));

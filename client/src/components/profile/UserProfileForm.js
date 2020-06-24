import React, { useEffect, useState, Fragment } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { updateUser } from '../../actions/auth';
import { searchGroupWithFilters } from '../../actions/group';

import { Formik, ErrorMessage } from 'formik';
import { SubmitButton, Input, Form, FormItem, FormikDebug } from 'formik-antd';

import AutoCompleteCitySeach from '../common/autocompletecitysearch/AutoCompleteCitySearch';

import MultiSelectSchoolSearch from '../common/multiselectschoolsearch/MultiSelectSchoolSearch';

const UserAccountForm = ({
  auth,
  updateUser,
  searchGroupWithFilters,
  current,
  onStepChange,
  history
}) => {
  useEffect(() => {
    if (auth && auth.user) {
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
    return value ? undefined : 'required';
  };
  const [componentSize, setComponentSize] = useState('small');
  const inputOnChange = event => {
    if (!event.target.value) {
      return;
    }
    //fetchSchools(event.target.value);
  };
  const formItemLayout = {
    labelCol: {
      xs: { span: 16 },
      sm: { span: 16 },
      md: { span: 16 }
    },
    wrapperCol: {
      xs: { span: 16 },
      sm: { span: 16 },
      md: { span: 16 }
    }
  };

  const yourInfo = (
    <Formik
      initialValues={{
        email: auth.user.email,
        name: '',
        city: '',
        state: '',
        zipcode: ''
      }}
      onSubmit={values => {
        let myAddress =
          values && values.citySelect ? JSON.parse(values.citySelect) : null;
        if (myAddress !== null) {
          updateUser({
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
        }

        onStepChange(current);
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
                label='Name'
                required={false}
                //validate={validateRequired}
              >
                <Input name='userName' placeholder='What should we call you?' />
              </FormItem>
            ) : (
              ''
            )}
            <FormItem
              name='city'
              label='City'
              required={true}
              //validate={validateRequired}
            >
              <AutoCompleteCitySeach />
            </FormItem>
            <FormItem
              name='schoolName'
              label='Schools you want to follow'
              required={false}
            >
              <MultiSelectSchoolSearch />
            </FormItem>
            <FormItem name='submit'>
              <SubmitButton className='ant-btn btn-primary'>
                {' '}
                Proceed{' '}
              </SubmitButton>
            </FormItem>
          </Form>
          {/*         <pre style={{ flex: 1 }}>
            <FormikDebug />
          </pre> */}
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
  updateUser,
  searchGroupWithFilters
})(withRouter(UserAccountForm));

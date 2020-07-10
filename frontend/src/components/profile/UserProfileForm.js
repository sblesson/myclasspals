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

import AutoCompleteSchoolSearch from '../common/autocompleteschoolsearch/AutoCompleteSchoolSearch';

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
        let groupId = user.userGroup[0].id;
        history
          ? history.push(`/dashboard/${groupId}`)
          : (window.location.pathname = `/dashboard/${groupId}`);
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
          if (values.schoolSelect) {
            //school selected
            let schoolItem = values.schoolSelect.split(',');
            updateUser({
              email: auth.user.email,
              name: values.userName,
              city: myAddress.city,
              state: myAddress.state,
              zipcode: myAddress.postalcode,
              schoolName: schoolItem[0]
            });
            searchGroupWithFilters({
              schoolName: schoolItem[0],
              zipcode: schoolItem[3],
              city: schoolItem[1]
            });
          } else {
            //school not selected
            updateUser({
              email: auth.user.email,
              name: values.userName,
              city: myAddress.city,
              state: myAddress.state,
              zipcode: myAddress.postalcode
            });
            searchGroupWithFilters({
              zipcode: myAddress.postalcode,
              city: myAddress.city
            });
          }
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
              label='School group you want to discover'
              required={false}
            >
              <AutoCompleteSchoolSearch />
            </FormItem>
            <FormItem name='submit'>
              <SubmitButton
                className='ant-btn btn-primary'
                style={{ float: 'right' }}
              >
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

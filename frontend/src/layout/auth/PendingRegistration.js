import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Formik, ErrorMessage } from 'formik';

import { SubmitButton, Input, Form, FormItem, FormikDebug } from 'formik-antd';
import { setAlert } from '../../actions/alert';
import { getuserbyregistrationid, register } from '../../actions/auth';

import PropTypes from 'prop-types';

const PendingRegistration = ({
  setAlert,
  getuserbyregistrationid,
  register,
  isAuthenticated,
  auth,
  token
}) => {
  useEffect(() => {
    if (token) {
      getuserbyregistrationid(token);
    }
  }, [getuserbyregistrationid, token]);

  useEffect(() => {
    if (auth.invalidRegistrationToken) {
      //todo change window.location logic later
      window.location.pathname = '/register';
      //return <Redirect to='/register' />;
    }
  }, [auth.user]);

  const [formData, setFormData] = useState({
    name: '',
    password: '',
    password2: ''
  });

  const { name, password, password2 } = formData;
  const [componentSize, setComponentSize] = useState('small');
  const [isLoadingSignUpBtn, setIsLoadingSignUpBtn] = useState(false);

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 16 },
      md: { span: 20 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
      md: { span: 20 }
    }
  };

  const validateRequired = value => {
    return value ? undefined : 'required';
  };

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  const yourInfo = (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
        password2: ''
      }}
      onSubmit={values => {
        setIsLoadingSignUpBtn(true);
        if (values.password !== values.password2) {
          setAlert('Passwords do not match', 'error');
          setIsLoadingSignUpBtn(false);
        } else {
          if (auth && auth.user && auth.user.email) {
            let email = auth.user.email;

            if (token) {
              let regId = token;
              register(
                {
                  name: values.name,
                  email,
                  password: values.password,
                  regId
                },
                () => {
                  setIsLoadingSignUpBtn(false);
                }
              );
            } else {
              register(
                {
                  name: values.name,
                  email,
                  password: values.password
                },
                () => {
                  setIsLoadingSignUpBtn(false);
                }
              );
            }
          }
        }
      }}
      validator={() => ({})}
      //validate={values => {}}
      children={() => (
        <div style={{ flex: 1, padding: 5 }}>
          <Form
            className='form-wrapper'
            {...formItemLayout}
            layout='vertical'
            initialValues={{
              size: componentSize
            }}
          >
            <FormItem
              name='name'
              label='What should we call you?'
              required={true}
              validate={validateRequired}
            >
              <Input name='name' placeholder='Your name' />
            </FormItem>
            <FormItem
              name='password'
              label='Password'
              required={true}
              validate={validateRequired}
            >
              <Input name='password' type='password' placeholder='Password' />
            </FormItem>
            <FormItem
              name='password2'
              label='Confirm Password'
              required={true}
              validate={validateRequired}
            >
              <Input
                name='password2'
                type='password'
                placeholder='Confirm Password'
              />
            </FormItem>
            <FormItem name='submit'>
              <SubmitButton
                block
                className='ant-btn btn-primary'
                loading={isLoadingSignUpBtn}
              >
                {' '}
                Register
              </SubmitButton>{' '}
            </FormItem>
          </Form>
        </div>
      )}
    />
  );

  return (
    <Fragment>
      <p className='lead'>
        <i className='fas fa-user' /> Create Your Account
      </p>
      {yourInfo}
      <p className='my-1'>
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>
    </Fragment>
  );
};

PendingRegistration.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
  isLoading: state.school.isLoading
});

export default connect(mapStateToProps, {
  setAlert,
  getuserbyregistrationid,
  register
})(PendingRegistration);

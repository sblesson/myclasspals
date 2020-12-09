import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Formik, ErrorMessage } from 'formik';
import { Typography, Text } from 'antd';
import { SubmitButton, Input, Form, FormItem, FormikDebug } from 'formik-antd';
import Footer from './Footer';
import { setAlert } from '../actions/alert';
import { register } from '../actions/auth';
import { authRedirect } from '../utils/authRedirect';
import {
  validateEmail,
  validatePassword,
} from '../components/common/validatefields/ValidateFields';

import PropTypes from 'prop-types';
import KeyReasons from './Features';
import Services from './Services';

import './Register.scss';

const Register = ({ setAlert, register, auth, history }) => {
  const [componentSize, setComponentSize] = useState('small');
  const { Title, Text } = Typography;
  const [isLoadingSignUpBtn, setIsLoadingSignUpBtn] = useState(false);

  const validateRequired = (value) => {
    return value ? undefined : 'required';
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 16 },
      md: { span: 20 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
      md: { span: 20 },
    },
  };

  const yourInfo = (
    <Formik
      initialValues={{
        email: '',
        password: '',
        password2: '',
      }}
      onSubmit={(values) => {
        //setIsLoadingSignUpBtn(true);
        if (values.password !== values.password2) {
          setAlert('Passwords do not match', 'danger');
          setIsLoadingSignUpBtn(false);
        } else {
          register(
            { email: values.email, password: values.password },
            (cancelTokenSrc) => {
              setIsLoadingSignUpBtn(false);
              cancelTokenSrc.cancel();
              authRedirect(auth, history);
            }
          );
          setIsLoadingSignUpBtn(false);
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
              size: componentSize,
            }}
          >
            <FormItem
              name='email'
              label='Email'
              required={true}
              validate={validateEmail}
            >
              <Input name='email' placeholder='your@email.com' />
            </FormItem>
            <FormItem
              name='password'
              label='Password'
              required={true}
              validate={validatePassword}
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
                className='ant-btn btn-primary'
                block
                loading={isLoadingSignUpBtn}
              >
                {' '}
                Sign Up
              </SubmitButton>{' '}
            </FormItem>
          </Form>
        </div>
      )}
    />
  );

  return (
    <Fragment>
      <div className='landing-wrapper'>
        <div className='landing-text'>
          <h2>
            Enhance the academic experience of your child by building a positive
            &amp; authentic school communities
          </h2>
          <p className='font-italic landing-text-info'>
            “So thankful to the platform for a deeper meaningful way to connect
            with school families!”{' '}
          </p>
          <p
            className='landing-text-info-user'
            style={{ fontSize: '.8rem', color: '#fff', textAlign: 'left' }}
          >
            <i>- Parent</i>
          </p>
        </div>
        <div className='landing-form-wrapper'>
          <h2>Create Account</h2>
          {yourInfo}
          <Text className='form-info-text'>
            Already have an account?{' '}
            <Link to='/login' className='link'>
              Sign In
            </Link>
          </Text>
        </div>
      </div>
      <KeyReasons />
      <Services />
      <Footer />
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.school.isLoading,
  auth: state.auth,
});

export default connect(mapStateToProps, { setAlert, register })(Register);

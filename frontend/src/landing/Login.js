import React, { Fragment, useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Formik, ErrorMessage } from 'formik';
import { Typography } from 'antd';
import { SubmitButton, Input, Form, FormItem, FormikDebug } from 'formik-antd';
import { login } from '../actions/auth';
import Services from './Services';
import { authRedirect } from '../utils/authRedirect';
import PropTypes from 'prop-types';
import Footer from './Footer';

const Login = ({ login, auth, history }) => {
  const [componentSize, setComponentSize] = useState('small');
  const [isLoadingSignInBtn, setIsLoadingSignInBtn] = useState(false);

  const { Title, Text } = Typography;

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
      }}
      onSubmit={(values) => {
        setIsLoadingSignInBtn(true);
        login({ email: values.email, password: values.password }, () => {
          setIsLoadingSignInBtn(false);
          authRedirect(auth, history);
        });
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
              validate={validateRequired}
            >
              <Input name='email' placeholder='your@email.com' />
            </FormItem>
            <FormItem
              name='password'
              label='Password'
              required={true}
              validate={validateRequired}
            >
              <Input name='password' type='password' placeholder='Password' />
            </FormItem>
            <FormItem name='submit'>
              <SubmitButton
                block
                className='ant-btn btn-primary'
                loading={isLoadingSignInBtn}
              >
                {' '}
                Sign In
              </SubmitButton>{' '}
            </FormItem>
          </Form>
        </div>
      )}
    />
  );

  return (
    <Fragment>
      <div className='login-wrapper'>
        <div className='landing-text'>
          <h2 style={{ fontSize: '1.6rem' }}>Join your buddies</h2>
          <h4 style={{ fontSize: '.8rem' }}>Together is better!</h4>
        </div>
        <div className='landing-form-wrapper'>
          <h2>Sign-In</h2>
          {yourInfo}
          <Text className='form-info-text'>
            Don't have an account?{' '}
            <Link to='/register' className='link'>
              Sign Up
            </Link>
          </Text>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
});

export default connect(mapStateToProps, { login })(Login);

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Formik, ErrorMessage } from 'formik';
import { Typography, Text } from 'antd';
import { SubmitButton, Input, Form, FormItem, FormikDebug } from 'formik-antd';
import Services from './Services';
import Footer from './Footer';
import { setAlert } from '../actions/alert';
import { register } from '../actions/auth';
import { authRedirect } from '../utils/authRedirect';
import PropTypes from 'prop-types';

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
        setIsLoadingSignUpBtn(true);
        if (values.password !== values.password2) {
          setAlert('Passwords do not match', 'danger');
          setIsLoadingSignUpBtn(false);
        } else {
          register(
            { email: values.email, password: values.password },
            (cancelTokenSrc) => {
              setIsLoadingSignUpBtn(false);
              console.log(cancelTokenSrc);
              cancelTokenSrc.cancel();
              authRedirect(auth, history);
            }
          );
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
                Sign Up
              </SubmitButton>{' '}
            </FormItem>
          </Form>
        </div>
      )}
    />
  );

  return (
    <div>
      <div className='landing-bg'>
        <div
          className='landing-container'
          /*    style={{
            float: 'right',
            paddingTop: '2rem',
            marginRight: '3rem',
          }} */
        >
          <h2>Join School Community</h2>

          <div id='sign-up-form' className='landing-form-wrapper'>
            {yourInfo}
            <Text className='form-info-text'>
              Already have an account?{' '}
              <Link to='/login' className='link'>
                Sign In
              </Link>
            </Text>
          </div>
        </div>
      </div>
      <div style={{ marginTop: '20px' }}>
        {' '}
        <Services />
      </div>
      <Footer />
    </div>
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

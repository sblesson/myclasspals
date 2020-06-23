import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Formik, ErrorMessage } from 'formik';
import { Typography, Text } from 'antd';
import { SubmitButton, Input, Form, FormItem, FormikDebug } from 'formik-antd';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
import * as emailjs from 'emailjs-com';

const Register = ({ setAlert, register }) => {
  const [componentSize, setComponentSize] = useState('small');
  const { Title, Text } = Typography;

  const validateRequired = value => {
    console.log(value);
    return value ? undefined : 'required';
  };

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

  //Custom EmailJS method
  const sendFeedback = templateParams => {
    emailjs
      .send(
        'default_service',
        'group_invitation',
        templateParams,
        'user_lol6VvJrSdlG57bHeWx0I'
      )
      .then(res => {
        // Email successfully sent alert
        window.alert('email send');
      })
      // Email Failed to send Error alert
      .catch(err => {
        console.error('Email Error:', err);
      });
  };

  const yourInfo = (
    <Formik
      initialValues={{
        email: '',
        password: '',
        password2: ''
      }}
      onSubmit={values => {
        if (values.password !== values.password2) {
          setAlert('Passwords do not match', 'danger');
        } else {
          register({ email: values.email, password: values.password });
          const templateParams = {
            message: 'cool',
            name: 'span',
            email: values.email
          };
          sendFeedback(templateParams);
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
              <SubmitButton block className='ant-btn btn-primary'>
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
      <Title className='form-title-text' level={4}>
        Create Your Account
      </Title>
      {yourInfo}
      <Text className='form-info-text'>
        Already have an account? <Link to='/login'>Sign In</Link>
      </Text>
    </div>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.school.isLoading
});

export default connect(mapStateToProps, { setAlert, register })(Register);

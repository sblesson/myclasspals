import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Formik, ErrorMessage } from 'formik';
import { Typography, Text } from 'antd';
import { SubmitButton, Input, Form, FormItem, FormikDebug } from 'formik-antd';
import Services from './Services';
import Footer from './Footer';
import { setAlert } from '../actions/alert';
import { contactUsMessage } from '../actions/auth';
import { authRedirect } from '../utils/authRedirect';
import PropTypes from 'prop-types';

const ContactUs = ({ setAlert, contactUsMessage }) => {
  const [componentSize, setComponentSize] = useState('small');
  const { Title, Text } = Typography;
  const [isLoadingSignUpBtn, setIsLoadingSignUpBtn] = useState(false);

  const validateRequired = value => {
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

  const yourInfo = (
    <Formik
      initialValues={{
        email: '',
        name: '',
        message: ''
      }}
      onSubmit={values => {
        setIsLoadingSignUpBtn(true);
        if (values.password !== values.password2) {
          setAlert('Passwords do not match', 'danger');
          setIsLoadingSignUpBtn(false);
        } else {
          contactUsMessage(
            { email: values.email, name: values.name, message: values.message },
            cancelTokenSrc => {
              setIsLoadingSignUpBtn(false);
              console.log(cancelTokenSrc);
              cancelTokenSrc.cancel();
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
              size: componentSize
            }}
          >
            <FormItem
              name='name'
              label='Name'
              required={true}
              validate={validateRequired}
            >
              <Input name='name' placeholder='your name' />
            </FormItem>
            <FormItem
              name='email'
              label='Email'
              required={true}
              validate={validateRequired}
            >
              <Input name='email' placeholder='your@email.com' />
            </FormItem>
            <FormItem name='message' label='Message' required={false}>
              <Input.TextArea
                className='post-form-text-input post-form-textarea'
                name='message'
                cols='50'
                rows='5'
                placeholder='Your message'
              />{' '}
            </FormItem>
            <FormItem name='submit'>
              <SubmitButton
                block
                className='ant-btn btn-primary'
                loading={isLoadingSignUpBtn}
              >
                {' '}
                Send
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
          className='service-description'
          style={{
            float: 'right',
            paddingTop: '2rem',
            marginRight: '3rem'
          }}
        >
          <h2>Contact Us</h2>
          <div>Share your thoughts, concerns, feedback ...</div>
          <div
            style={{
              background: '#f0f0f0',
              marginTop: '1rem',
              padding: '1rem 0 2rem 2rem',
              width: '70%'
            }}
          >
            {yourInfo}
            <Text className='form-info-text'>
              Don't have an account? <Link to='/register'>Sign Up</Link>
            </Text>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

ContactUs.propTypes = {
  setAlert: PropTypes.func.isRequired,
  contactUsMessage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.school.isLoading
});

export default connect(mapStateToProps, { setAlert, contactUsMessage })(
  ContactUs
);

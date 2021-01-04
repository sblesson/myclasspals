import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Formik, ErrorMessage } from 'formik';
import { Typography, Result } from 'antd';
import { SubmitButton, Input, Form, FormItem, FormikDebug } from 'formik-antd';
import Footer from './Footer';
import { setAlert } from '../actions/alert';
import PropTypes from 'prop-types';

const ContactUs = ({ setAlert }) => {
  const [componentSize, setComponentSize] = useState('small');
  const [isResultVisible, setIsResultVisible] = useState(false);

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
        name: '',
        message: '',
      }}
      onSubmit={(values, actions) => {
        let { email, name, message } = values;
        let templateParams = {
          useremail: email,
          to_name: email,
          subject: message,
          message_html: message,
        };
        setIsLoadingSignUpBtn(true);

        window.emailjs
          .send(
            'default_service',
            'user_invitation_template',
            templateParams,
            'user_S5jCFVSO6Kl9QPTfRYj0E'
          )
          .then(
            (result) => {
              setAlert('Message send', 'success');
            },
            (error) => {
              setAlert(
                'Error occured while sending email invitation. Please try again later!',
                'error'
              );
            }
          );
        actions.resetForm();
        setIsResultVisible(true);
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
    <Fragment>
      <div>
        {isResultVisible ? (
          <Result
            status='success'
            title='Your request has been sent!'
            subTitle='We really appreciate your valuable input. One of our representatives will contact you shortly'
          />
        ) : (
          <div className='contact-wrapper'>
            <h2>Contact Us</h2>

            {yourInfo}
            <Text className='form-info-text'>
              Don't have an account? <Link to='/register'>Sign Up</Link>
            </Text>
          </div>
        )}
      </div>
    </Fragment>
  );
};

ContactUs.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.school.isLoading,
});

export default connect(mapStateToProps, { setAlert })(ContactUs);

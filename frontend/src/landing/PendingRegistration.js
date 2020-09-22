import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { SubmitButton, Input, Form, FormItem, FormikDebug } from 'formik-antd';
import { Formik, ErrorMessage } from 'formik';
import { Typography } from 'antd';
import Footer from './Footer';
import { setAlert } from '../actions/alert';
import { getuserbyregistrationid, register } from '../actions/auth';
import { authRedirect } from '../utils/authRedirect';

import PropTypes from 'prop-types';

const PendingRegistration = ({
  setAlert,
  getuserbyregistrationid,
  register,
  auth,
  history,
  match,
}) => {
  const { Title, Text } = Typography;
  const [regId, setRegId] = useState('');
  useEffect(() => {
    let unmounted = false;
    if (match.params && !unmounted) {
      setRegId(match.params.id);
      getuserbyregistrationid(match.params.id);
    }
    return () => {
      unmounted = true;
    };
  }, [getuserbyregistrationid, match]);

  useEffect(() => {
    if (auth.invalidRegistrationToken) {
      //todo change window.location logic later
      window.location.pathname = '/register';
    }
  }, [auth.invalidRegistrationToken]);

  const [formData, setFormData] = useState({
    name: '',
    password: '',
    password2: '',
  });

  const { name, password, password2 } = formData;
  const [componentSize, setComponentSize] = useState('small');
  const [isLoadingSignUpBtn, setIsLoadingSignUpBtn] = useState(false);

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

  const validateRequired = (value) => {
    return value ? undefined : 'required';
  };

  const yourInfo = (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
        password2: '',
      }}
      onSubmit={(values) => {
        setIsLoadingSignUpBtn(true);
        if (values.password !== values.password2) {
          setAlert('Passwords do not match', 'error');
          setIsLoadingSignUpBtn(false);
        } else {
          if (auth && auth.user && auth.user.email) {
            let email = auth.user.email;

            if (regId) {
              register(
                {
                  name: values.name,
                  email,
                  password: values.password,
                  regId,
                },
                (cancelTokenSrc) => {
                  setIsLoadingSignUpBtn(false);
                  cancelTokenSrc.cancel();
                  authRedirect(auth, history);
                }
              );
            } else {
              register(
                {
                  name: values.name,
                  email,
                  password: values.password,
                },
                () => {
                  setIsLoadingSignUpBtn(false);
                  authRedirect(auth, history);
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
              size: componentSize,
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
      <div className='pending-registration-wrapper'>
        <div className='landing-text'>
          <h2 style={{ fontSize: '1.6rem' }}>Join your school community</h2>
          <h4 style={{ fontSize: '.8rem' }}>
            Together is better, ask for help, offer help, schedule playdate ...
          </h4>
        </div>
        <div className='landing-form-wrapper'>
          <h2>Sign-Up</h2>
          {yourInfo}
          <Text className='form-info-text'>
            Already have an account?{' '}
            <Link to='/login' className='link'>
              Sign In
            </Link>
          </Text>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

PendingRegistration.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  isLoading: state.school.isLoading,
});

export default connect(mapStateToProps, {
  setAlert,
  getuserbyregistrationid,
  register,
})(PendingRegistration);

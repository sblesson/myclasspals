import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Formik, ErrorMessage } from 'formik';
import { Typography } from 'antd';
import { SubmitButton, Input, Form, FormItem, FormikDebug } from 'formik-antd';
import { login } from '../../actions/auth';
import Landing from './Landing';
import { authRedirect } from '../../utils/authRedirect';
import PropTypes from 'prop-types';

const Login = ({ login, auth, history }) => {
  const [componentSize, setComponentSize] = useState('small');
  const [isLoadingSignInBtn, setIsLoadingSignInBtn] = useState(false);

  const { Title, Text } = Typography;

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
        password: ''
      }}
      onSubmit={values => {
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
    <div className='row' style={{ marginTop: '20px' }}>
      <Landing />
      <div className='col col-4' style={{ background: '#fff' }}>
        <Title className='form-title-text' level={4}>
          Sign In
        </Title>
        {yourInfo}
        <Text className='form-info-text'>
          Don't have an account? <Link to='/register'>Sign Up</Link>
        </Text>
      </div>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth
});

export default connect(mapStateToProps, { login })(Login);

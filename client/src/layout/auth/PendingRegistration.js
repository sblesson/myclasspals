import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
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

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      if (auth && auth.user && auth.user.email) {
        let email = auth.user.email;
        //setGroupId(auth.user.pendingInvitedUserGroups[0].id);
        if (token) {
          let regId = token;
          register({
            name,
            email,
            password,
            regId
          });
        } else {
          register({
            name,
            email,
            password
          });
        }

        //getGroupDetails(groupId);
      }
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <p className='lead'>
        <i className='fas fa-user' /> Create Your Account
      </p>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='password2'
            value={password2}
            onChange={e => onChange(e)}
          />
        </div>
        <input
          type='submit'
          className='btn btn-primary'
          value='Register'
          style={{ width: '100%' }}
        />
      </form>
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

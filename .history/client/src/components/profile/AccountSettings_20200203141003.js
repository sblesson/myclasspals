import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  createProfile,
  deleteAccount,
  getCurrentProfile
} from '../../actions/profile';
import LeftNav from '../leftnav/LeftNav';
import Account from './account/Account';
const AccountSettings = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  deleteAccount,
  history
}) => {
  const [formData, setFormData] = useState({
    username: '',
    location: '',
    role: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: ''
  });

  useEffect(() => {
    getCurrentProfile();

    setFormData({});
  }, [loading, getCurrentProfile]);

  const { username, location, status } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history, true);
  };

  return (
    <Fragment>
      <div className='row'>
        <LeftNav screen='profile' />
        <div id='main'>
          <Account />
          <article>
            <p>
              <i className='fas fa-user' /> Edit your profile
            </p>
            <small>* = required field</small>
            <form className='form' onSubmit={e => onSubmit(e)}>
              <div className='form-group'>
                <input
                  type='text'
                  placeholder='username'
                  name='username'
                  value={username}
                  onChange={e => onChange(e)}
                />
              </div>
              <div className='form-group'>
                <input
                  type='text'
                  placeholder='Location'
                  name='location'
                  value={location}
                  onChange={e => onChange(e)}
                />
                <small className='form-text'>
                  City & state suggested (eg. Boston, MA)
                </small>
              </div>
              <input
                type='submit'
                value='Save'
                className='btn btn-primary my-1'
              />
            </form>
          </article>

          <div className='my-2'>
            <button className='btn btn-danger' onClick={() => deleteAccount()}>
              <i className='fas fa-user-minus' /> Delete My Account
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

AccountSettings.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, {
  createProfile,
  getCurrentProfile,
  deleteAccount
})(withRouter(AccountSettings));

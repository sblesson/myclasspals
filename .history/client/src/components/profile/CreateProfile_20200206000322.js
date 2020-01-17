import React, { useEffect, useState, Fragment } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { auth } from '../../../actions/auth';

import EditAccountModal from './modal/EditAccountModal';
import DeleteAccountModal from './modal/DeleteAccountModal';

import './Account.scss';
const Account = ({ auth }) => {
  const userData = {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
    address: {
      street: 'Kulas Light',
      suite: 'Apt. 556',
      city: 'Gwenborough',
      state: 'California',
      zipcode: '92998-3874',
      geo: {
        lat: '-37.3159',
        lng: '81.1496'
      }
    },
    phone: '1-770-736-8031 x56442',
    website: 'hildegard.org',
    company: {
      name: 'Romaguera-Crona',
      catchPhrase: 'Multi-layered client-server neural-net',
      bs: 'harness real-time e-markets'
    }
  };

  const userDetails = (
    <div className='profile-content-details' key={auth.user._id}>
      <EditAccountModal />
      <DeleteAccountModal />

      <div className='user-info-item'>
        <div className='user-info-content'>{auth.user.name} </div>
      </div>
      <div className='user-info-item'>
        <div className='user-info-content'>{userData.name} </div>
      </div>
      <div className='user-info-item'>
        <i className='fas fa-mobile'></i>
        <div className='user-info-content'>{userData.phone} </div>
      </div>
      <div className='user-info-item'>
        <i class='fas fa-at'></i>
        <div className='user-info-content'>{userData.email} </div>
      </div>

      <div className='user-info-item'>
        <i className='fas fa-map-marker big'></i>
        <div className='user-info-content'>
          {userData.address.street}, {userData.address.suite}
          {userData.address.city}, {userData.address.state}{' '}
          {userData.address.zipcode}
        </div>
      </div>
    </div>
  );

  return (
    <Fragment>
      <div className='profile-component-container'>
        <div className='profile-component-header'>
          <h4 className='profile-component-title'>My Account</h4>
        </div>
        <div className='profile-component-content'> {userDetails}</div>
      </div>
    </Fragment>
  );
};

Account.propTypes = {
  auth: PropTypes.object.isRequired
  //deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {})(Account);

const CreateProfile = ({
  createProfile,
  getCurrentProfile,
  profile: { profile, loading },
  history
}) => {
  const [formData, setFormData] = useState({
    company: '',
    website: '',
    location: '',
    status: '',
    interests: '',
    username: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: '',
    child: ''
  });
  const [displaySocialInputs, toggleSocialInputs] = useState(false);
  const { company, website, location, status, interests, username } = formData;
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history);
  };
  useEffect(() => {
    getCurrentProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getCurrentProfile]);
  return loading && profile === null ? (
    <Redirect to='/dashboard' />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Create Your Profile</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Github Username'
            name='username'
            value={username}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>
        <div className='form-group'>
          <textarea
            placeholder='A short bio of yourself'
            name='bio'
            value={bio}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>Tell us a little about yourself</small>
        </div>
        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Save
        </Link>
      </form>
    </Fragment>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile
});
export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(CreateProfile)
);

import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  createProfile
  //deleteAccount,
} from '../../actions/profile';
import LeftNav from '../leftnav/LeftNav';
import Account from './account/Account';
const AccountSettings = ({
  profile: { profile, loading },
  createProfile,
  //deleteAccount,
  history
}) => {
  const [formData, setFormData] = useState({
    username: '',
    location: '',
    role: '',
    interests: '',
    username: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: ''
  });

  useEffect(() => {
    setFormData({});
  }, [loading]);

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
        </div>
      </div>
    </Fragment>
  );
};

AccountSettings.propTypes = {
  createProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
  //deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, {
  createProfile

  //deleteAccount
})(withRouter(AccountSettings));

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { auth } from '../../../actions/auth';
import ProfileModal from '../../modal/profilemodal/ProfileModal';
import './School.scss';
const Account = ({ auth }) => {
  const userDetails = (
    <div className='profile-content-details' key={auth.user._id}>
      <div>
        {/*         <span onClick={() => deleteSchool(userItem._id)} className=''>
          Delete
        </span> */}
      </div>
      <div className='username'>{auth.user.name}</div>
      <div>
        <span className='email'>{userItem.email}</span>
      </div>
    </div>
  );

  return (
    <Fragment>
      <div className='profile-component-container'>
        <div className='profile-component-header'>
          <ProfileModal />

          <h4 className='profile-component-title'>My Account</h4>
        </div>
        <div className='profile-component-content'>{userDetails}</div>
      </div>
    </Fragment>
  );
};

Account.propTypes = {
  auth: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {})(Account);

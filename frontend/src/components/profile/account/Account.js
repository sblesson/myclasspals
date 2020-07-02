import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import EditAccountModal from './modal/EditAccountModal';

import './Account.scss';
const Account = ({ auth }) => {
  const userDetails = (
    <div className='profile-content-details' key={auth.user._id}>
      <EditAccountModal />

      <div className='user-info-item'>
        <div className='user-info-content'>{auth.user.name} </div>
      </div>
      {auth.user.phone && (
        <div className='user-info-item'>
          <i className='fas fa-mobile'></i>
          <div className='user-info-content'>{auth.user.phone} </div>
        </div>
      )}

      <div className='user-info-item'>
        <i className='fas fa-at'></i>
        <div className='user-info-content'>{auth.user.email} </div>
      </div>
      {auth.user.city ? (
        <div className='user-info-item'>
          <i className='fas fa-map-marker big'></i>
          <div className='user-info-content'>
            {auth.user.city}, {auth.user.state} {auth.user.zipcode}
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );

  return (
    <div className='main-container'>
      {auth && auth.user && (
        <div className='profile-component-container'>
          <div className='profile-component-header'>
            <h4 className='profile-component-title'>My Account</h4>
          </div>
          <div className='profile-component-content'> {userDetails}</div>
        </div>
      )}
    </div>
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

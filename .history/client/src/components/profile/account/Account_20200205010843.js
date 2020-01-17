import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { auth } from '../../../actions/auth';

import AccountModal from './modal/AccountModal';
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
      <div></div>
      <div className='username'>{auth.user.name}</div>
      <hr />
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
        <i className='fas fa-map-marker'></i>
        <div className='user-info-content'>
          {userData.address.street}, {userData.address.suite}
          <div>
            {userData.address.city}, {userData.address.state}
            {userData.address.zipcode}
          
        </div>
      </div>
    </div>
  );

  return (
    <Fragment>
      <div className='profile-component-container'>
        <div className='profile-component-header'>
          <AccountModal />

          <h4 className='profile-component-title'>My Account</h4>
        </div>
        <div className='profile-component-content'>{userDetails}</div>
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

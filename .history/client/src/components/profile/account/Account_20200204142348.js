import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { auth } from '../../../actions/auth';
import { modal } from '../../../actions/modal';

import AccountModal from '../../modal/account/AccountModal';
import './Account.scss';
const Account = ({ auth, toggleModal }) => {
  const userDetails = (
    <div className='profile-content-details' key={auth.user._id}>
      <div></div>
      <div className='username'>{auth.user.name}</div>
      <div></div>
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
  auth: PropTypes.object.isRequired,
  modal: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {})(Account);

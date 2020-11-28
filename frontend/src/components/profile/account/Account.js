import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Layout } from 'antd';

/* import EditAccountModal from './modal/EditAccountModal'; */

import './Account.scss';
const Account = ({ auth }) => {
  const { Content } = Layout;

  const userDetails = (
    <div className='profile-content-details' key={auth.user._id}>
      {/*       <EditAccountModal />
       */}

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
    </div>
  );

  return (
    <Content>
      <div className='wrapper'>
        {auth && auth.user && (
          <div className='profile-component-container'>
            <div className='profile-component-header'>
              <h4 className='profile-component-title'>My Account</h4>
            </div>
            <div className='profile-component-content'> {userDetails}</div>
          </div>
        )}
      </div>
    </Content>
  );
};

Account.propTypes = {
  auth: PropTypes.object.isRequired,
  //deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(Account);

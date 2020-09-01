import React, { useEffect } from 'react';
import { Layout } from 'antd';

import { connect } from 'react-redux';
import UserMenu from './UserMenu';
import GuestMenu from './GuestMenu';
import './TopNavbar.scss';
import logo from '../../assets/images/cblogo.png';

const TopNavbar = ({ auth: { isAuthenticated } }) => {
  const { Header } = Layout;

  return (
    <Header
      style={{
        position: 'fixed',
        zIndex: 1,
        width: '100%',
      }}
      className='top-menu'
    >
      <div className='logo float-left'>
        <span className='logo-text'>clazzbuddy</span>
      </div>
      <div className='float-right'>
        {isAuthenticated ? <UserMenu /> : <GuestMenu />}
      </div>
    </Header>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(TopNavbar);

import React, { useEffect } from 'react';
import { Layout } from 'antd';

import { connect } from 'react-redux';
import UserMenu from './UserMenu';
import GuestMenu from './GuestMenu';
import './TopNavbar.scss';

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
      {isAuthenticated ? <UserMenu /> : <GuestMenu />}
    </Header>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(TopNavbar);

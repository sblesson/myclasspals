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
        display: 'flex',
        cursor: 'pointer',
      }}
      className='top-menu'
    >
      <div
        className='logo'
        style={{
          flex: 0.5,
          height: '1.8rem',
        }}
      ></div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          flex: 0.65,
        }}
      >
        {isAuthenticated ? <UserMenu /> : <GuestMenu />}
      </div>
    </Header>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(TopNavbar);

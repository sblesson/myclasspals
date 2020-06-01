import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import UserMenu from './UserMenu';
import GuestMenu from './GuestMenu';
import { Drawer, Button } from 'antd';
import './TopNavbar.scss';

const TopNavbar = ({ auth: { isAuthenticated, loading, user } }) => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <nav className='menuBar'>
      <div className='logo'>
        <a href=''>logo</a>
      </div>
      <div className='menuCon'>
        <div className='leftMenu'></div>
        <div className='rightMenu'>
          {isAuthenticated ? <UserMenu /> : <GuestMenu />}
        </div>
        {/*     <Button className='barsMenu' type='primary' onClick={showDrawer}>
          <span className='barsBtn'></span>
        </Button>
        <Drawer
          title='Basic Drawer'
          placement='right'
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          {isAuthenticated ? <UserMenu /> : <GuestMenu />}
        </Drawer> */}
      </div>
    </nav>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {})(TopNavbar);

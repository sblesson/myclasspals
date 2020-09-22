import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Drawer, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

const GuestMenu = () => {
  let selectedKey = window.location.pathname.split('/')[1];
  selectedKey = selectedKey ? selectedKey : 'register';
  const mobileBreakPoint = '768';
  const [windowSize, setWindowSize] = useState(global.window.innerWidth);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(global.window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [global.window]);

  const toggleDrawer = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const onCloseDrawer = () => {
    setSidebarCollapsed(false);
  };

  const GuestMenuList = () => {
    return (
      <Menu
        mode={sidebarCollapsed ? 'inline' : 'horizontal'}
        defaultSelectedKeys={[selectedKey]}
      >
        <Menu.Item key='home'>
          <Link to='/'>{'Home'}</Link>
        </Menu.Item>
        <Menu.Item key='login'>
          <Link to='/login'>{'Login'}</Link>
        </Menu.Item>
        <Menu.Item key='about'>
          <Link to='/about-us'>{'About Us'}</Link>
        </Menu.Item>
        <Menu.Item key='contact'>
          <Link to='/contact-us'>{'Contact Us'}</Link>
        </Menu.Item>
      </Menu>
    );
  };

  return (
    <Fragment>
      <Button
        type='primary'
        onClick={toggleDrawer}
        className={
          windowSize <= mobileBreakPoint
            ? sidebarCollapsed
              ? 'displayOnMobile barsMenuLeftDrawer float-right'
              : 'displayOnMobile barsMenu float-right'
            : 'hideOnDesktop'
        }
      >
        <MenuOutlined />
      </Button>
      {windowSize <= mobileBreakPoint && (
        <Drawer
          placement='right'
          closable={true}
          mask={false}
          onClose={onCloseDrawer}
          visible={sidebarCollapsed}
          className='hideOnDesktop'
        >
          <GuestMenuList />
        </Drawer>
      )}
      {windowSize > mobileBreakPoint && (
        <div className='float-right'>
          <GuestMenuList />
        </div>
      )}
    </Fragment>
  );
};

export default GuestMenu;

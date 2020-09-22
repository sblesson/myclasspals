import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Drawer, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { logout } from '../../actions/auth';

const SubMenu = Menu.SubMenu;

const UserMenu = () => {
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

  const LoggedInMenuList = () => {
    return (
      <div className='float-right'>
        <Menu
          mode='horizontal'
          theme='light'
          mode={sidebarCollapsed ? 'inline' : 'horizontal'}
          defaultSelectedKeys={[selectedKey]}
        >
          <Menu.Item key='dashboard'>
            <Link to='/dashboard'>{'Home'}</Link>
          </Menu.Item>
          <Menu.Item key='groups'>
            <Link to='/groups'>{'Groups'}</Link>
          </Menu.Item>
          <Menu.Item key='messages'>
            <Link to='/messages'>{'Message'}</Link>
          </Menu.Item>
          <SubMenu title={<span>User</span>}>
            <Menu.Item key='account'>
              {' '}
              <Link to='/account'>{'Account'}</Link>
            </Menu.Item>
            <Menu.Item key='logout' onClick={logout}>
              Log out
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    );
  };

  return (
    <Fragment>
      {windowSize <= mobileBreakPoint &&
        window.location.pathname.indexOf('messages') !== -1 && (
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
        )}

      {windowSize <= mobileBreakPoint &&
        window.location.pathname.indexOf('messages') !== -1 && (
          <Drawer
            placement='right'
            closable={true}
            mask={false}
            onClose={onCloseDrawer}
            visible={sidebarCollapsed}
            className='hideOnDesktop'
          >
            <LoggedInMenuList />
          </Drawer>
        )}
      {windowSize > mobileBreakPoint && (
        <div className='float-right'>
          <LoggedInMenuList />
        </div>
      )}
    </Fragment>
  );
};

UserMenu.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default connect(null, { logout })(UserMenu);

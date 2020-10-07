import React from 'react';

import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import './TopNavbar.scss';

const SubMenu = Menu.SubMenu;

const UserMenu = () => {
  let selectedKey = window.location.pathname.split('/')[1];
  selectedKey = selectedKey ? selectedKey : 'register';

  const LoggedInMenu = () => {
    return (
      <Menu
        theme='light'
        mode={'horizontal'}
        defaultSelectedKeys={[selectedKey]}
      >
        <Menu.Item key='dashboard'>
          <Link to='/dashboard'>{'Home'}</Link>
        </Menu.Item>
        <Menu.Item key='events'>
          <Link to='/events'>{'Events'}</Link>
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
    );
  };
  return <LoggedInMenu />;
};

UserMenu.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default connect(null, { logout })(UserMenu);

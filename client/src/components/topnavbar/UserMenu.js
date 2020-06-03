import React, { Fragment, useEffect, useState } from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { logout } from '../../actions/auth';

const SubMenu = Menu.SubMenu;

const UserMenu = ({ logout }) => {
  return (
    <Menu mode='horizontal' defaultSelectedKeys={['dashboard']}>
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
  );
};
UserMenu.propTypes = {
  logout: PropTypes.func.isRequired
};

export default connect(null, { logout })(UserMenu);

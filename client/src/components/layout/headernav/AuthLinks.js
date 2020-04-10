import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import DropDownMenu from '../dropdownmenu/DropDownMenu';
import './HeaderNav.scss';

const AuthLinks = (isLoggedIn = false) => {
  console.log(isLoggedIn);
  if (isLoggedIn) {
    return (
      <Menu borderless className='top-menu' fixed='top'>
        <Menu.Item header className='logo'>
          <div className='column docs-icon-set-column'>
            <p className='name'>ZZ</p>
          </div>
        </Menu.Item>
        <Menu.Menu className='nav-container'>
          <Menu.Menu position='right'>
            <Menu.Item>
              <Link to='/dashboard'>{'Home'}</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to='/groups'>{'Groups'}</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to='/messages'>{'Messages'}</Link>
            </Menu.Item>
            <Menu.Item>
              <DropDownMenu />
            </Menu.Item>
          </Menu.Menu>
        </Menu.Menu>
      </Menu>
    );
  } else {
    return (
      <Menu borderless className='top-menu' fixed='top'>
        <Menu.Item header className='logo'>
          <div class='column docs-icon-set-column'>
            <p class='name'>ZZ</p>
          </div>
        </Menu.Item>
        <Menu.Menu className='nav-container'>
          <Menu.Menu position='right'>
            <Menu.Item>
              <Link to='/dashboard'>{'Login'}</Link>
            </Menu.Item>
          </Menu.Menu>
        </Menu.Menu>
      </Menu>
    );
  }
};

export default AuthLinks;

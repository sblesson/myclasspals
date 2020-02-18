import React from 'react';
import { Menu, Form, Input } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import DropDownMenu from '../dropdownmenu/DropDownMenu';

import './HeaderNav.scss';

const GuestLinks = () => {
  return (
    <Menu borderless className='top-menu' fixed='top'>
      <Menu.Item header className='logo'>
        <div class='column docs-icon-set-column'>
          <i aria-hidden='true' class='braille big icon'></i>
          <p class='name'>clazzbuddy</p>
        </div>
      </Menu.Item>
      <Menu.Menu className='nav-container'>
        <Menu.Menu position='right'>
          <Menu.Item>
            <Link to='/register'>{'Sign Up'}</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to='/login'>{'Login'}</Link>
          </Menu.Item>
        </Menu.Menu>
      </Menu.Menu>
    </Menu>
  );
};

export default GuestLinks;

import React from 'react';
import { Image, Menu, Form, Input, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import DropDownMenu from '../dropdownmenu/DropDownMenu';

import './HeaderNav.scss';
import logo from '../../../assets/images/logo.jpg';

const AuthLinks = (isLoggedIn = false) => {
  console.log(isLoggedIn);
  if (isLoggedIn) {
    return (
      <Menu borderless className='top-menu' fixed='top'>
        <Menu.Item header className='logo'>
          <div className='column docs-icon-set-column'>
            <i aria-hidden='true' className='braille big icon'></i>
            <p className='name'>clazzbuddy</p>
          </div>
        </Menu.Item>
        <Menu.Menu className='nav-container'>
          <Menu.Item className='search-input'>
            <Form>
              <Form.Field>
                <Input placeholder='Search' size='small' action='Go' />
              </Form.Field>
            </Form>
          </Menu.Item>
          <Menu.Menu position='right'>
            <Menu.Item>
              <Link to='/dashboard'>{'Home'}</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to='/view-profile'>
                {'Community'}
                {/*       <Icon className='header-icon fal fa-address-book' size='small' /> */}
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link to='/groups'>
                {'Groups'}
                {/*       <Icon className='header-icon fal fa-address-book' size='small' /> */}
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link to='/profiles'>
                {'Directory'}
                {/*       <Icon className='header-icon fal fa-address-book' size='small' /> */}
              </Link>
            </Menu.Item>
            {/*         <Menu.Item>
            <Icon className='header-icon' name='alarm' size='large' />
          </Menu.Item> */}
            <Menu.Item>
              <Link to='/messages'>
                {'Messages'}
                {/*         <Icon
              className='header-icon'
              name='facebook messenger'
              size='large'
            /> */}
              </Link>
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
            <i aria-hidden='true' class='braille big icon'></i>
            <p class='name'>clazzbuddy</p>
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
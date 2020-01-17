import React from 'react';
import { Image, Menu, Form, Input, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import DropDownMenu from '../dropdownmenu/DropDownMenu';
import AutoCompleteSearch from '../autoCompleteSearch/AutoCompleteSearch';


import './HeaderNav.scss';
import logo from '../../assets/images/logo.jpg';

const HeaderNav = () => {
  return (
    <Menu borderless className='top-menu' fixed='top'>
      <Menu.Item header className='logo'>
        <Image src={logo} size='tiny' />
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
            <Link to='/profiles'>
              {' '}
              <Icon
                className='header-icon fal fa-address-book'
                name='directory'
                size='large'
              />
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Icon className='header-icon' name='alarm' size='large' />
          </Menu.Item>
          <Menu.Item>
            <Icon
              className='header-icon'
              name='facebook messenger'
              size='large'
            />
          </Menu.Item>
          <Menu.Item>
            <DropDownMenu />
          </Menu.Item>
        </Menu.Menu>
      </Menu.Menu>
    </Menu>
  );
};

export default HeaderNav;

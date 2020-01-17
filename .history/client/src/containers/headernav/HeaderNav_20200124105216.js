import React from 'react';
import { Redirect } from 'react-router-dom';
import { Image, Menu, Segment, Form, Input, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import DropDownMenu from '../dropdownmenu/DropDownMenu';
import AutoCompleteSearch from '../../components/autocompletesearch/AutoCompleteSearch';

import './HeaderNav.scss';
import logo from '../../assets/images/logo.jpg';

const HeaderNav = () => {
  return (
    <div>
    <Menu borderless className='top-menu' fixed='top'>
      <Menu.Item header className='logo'>
        <Image src={logo} size='tiny' />
      </Menu.Item>
      <Menu.Menu className='nav-container'>
        <Menu.Item>
          <AutoCompleteSearch />
          {/*     <Form>
            <Form.Field>
              <Input placeholder='Search' size='small' action='Go' />
            </Form.Field>
          </Form> */}
        </Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item>
            <Link to='/dashboard'>{'Home'}</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to='/profiles'>{'Directory'}</Link>
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
     <Segment>
     <img src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />
   </Segment>
   <div>
  );
};

export default HeaderNav;

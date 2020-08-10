import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';

const GuestMenu = () => {
  let selectedKey = window.location.pathname.split('/')[1];
  selectedKey = selectedKey ? selectedKey : 'register';

  return (
    <Menu mode='horizontal' defaultSelectedKeys={[selectedKey]}>
      <Menu.Item key='home'>
        <Link to='/'>{'Home'}</Link>
      </Menu.Item>
      {/*       <Menu.Item key='register'>
        <Link to='/register'>{'Sign Up'}</Link>
      </Menu.Item> */}
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

export default GuestMenu;

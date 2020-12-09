import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';

const GuestMenu = ({ isMobile }) => {
  let selectedKey = window.location.pathname.split('/')[1];
  selectedKey = selectedKey ? selectedKey : 'register';

  const GuestMenuList = () => {
    return (
      <Menu
        mode={isMobile ? 'vertical' : 'horizontal'}
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

  return <GuestMenuList />;
};

export default GuestMenu;

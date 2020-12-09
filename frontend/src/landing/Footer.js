import React from 'react';
import { Layout } from 'antd';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';

import './Footer.scss';

const Footer = ({ isFixedFooter }) => {
  const { Footer } = Layout;

  return (
    <Footer className={isFixedFooter ? 'fixed-footer' : 'footer'}>
      <Menu mode='horizontal'>
        <Menu.Item key='about'>
          <Link to='/' className='footer-link-text'>
            {'About Us'}
          </Link>
        </Menu.Item>
        <Menu.Item key='contact'>
          <Link to='/contact-us' className='footer-link-text'>
            {'Contact Us'}
          </Link>
        </Menu.Item>
        <Menu.Item key='privacy'>
          <Link to='/privacy' className='footer-link-text'>
            {'Privacy Policy'}
          </Link>
        </Menu.Item>
        <Menu.Item key='terms'>
          <Link to='/terms' className='footer-link-text'>
            {'Terms and Conditions'}
          </Link>
        </Menu.Item>
      </Menu>
      <div className='text-muted copyright-footer-text'>
        Copyright ©2020 myclasspals, inc. All rights reserved.
      </div>
    </Footer>
  );
};

export default Footer;

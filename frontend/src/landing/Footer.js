import React from 'react';
import { Layout } from 'antd';
import { Link } from 'react-router-dom';
import './Footer.scss';

const Footer = () => {
  const { Footer } = Layout;

  return (
    <Footer style={{ textAlign: 'center' }}>
      <div class='container'>
        <div class='row'>
          <div class='col-lg-3 col-md-3 col-sm-4 col-xs-12'>
            <div class='footer-section col-xs-12'>
              <p class='text-muted copyright-footer-text'>
                Copyright ©2020 clazzbuddy, inc
              </p>
            </div>
          </div>
          <div class='col-lg-5 col-md-5 col-sm-4 col-xs-12'>
            <ul>
              <li>
                <a href='#'>About</a>
              </li>

              <li>
                <a href='#'>Contact</a>
              </li>
            </ul>
          </div>

          <div class='col-lg-4 col-md-4 col-sm-4 col-xs-12'>
            <ul>
              <li>
                <a href='#'>Terms &amp; Conditions</a>
              </li>

              <li>
                <a href='#'>Privacy Policy</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Footer>
  );
  /*   return (
    <div
      className='ui inverted vertical footer segment'
      style={{ background: '#f3fafd', color: '#333', fontSize: '8px' }}
    >
      <div className='ui center aligned container'>
        <div className='ui stackable inverted divided grid m-top-20'>
          <div className='three wide column'>
            <h4 className='ui inverted header' style={{ color: '#444' }}>
              Company
            </h4>
            <div className='ui inverted link list'>
              <Link className='item' style={{ color: '#444' }} to='about-us'>
                About Us
              </Link>
              <Link className='item' style={{ color: '#444' }} to='faq'>
                FAQ
              </Link>
              <Link className='item' style={{ color: '#444' }} to='careers'>
                Careers
              </Link>
            </div>
          </div>
          <div className='three wide column'>
            <h4 className='ui inverted header' style={{ color: '#444' }}>
              Resources
            </h4>
            <div className='ui inverted link list'>
              <Link className='item' style={{ color: '#444' }} to='our-mission'>
                Our Mission
              </Link>
              <Link className='item' style={{ color: '#444' }} to='our-story'>
                Our Story
              </Link>
              <Link className='item' style={{ color: '#444' }} to='our-mission'>
                Our Values
              </Link>
            </div>
          </div>
          <div className='three wide column'>
            <h4 className='ui inverted header' style={{ color: '#444' }}>
              Community
            </h4>
            <div className='ui inverted link list'>
              <Link className='item' style={{ color: '#444' }} to='guidelines'>
                Guidelines
              </Link>
              <Link
                className='item'
                style={{ color: '#444' }}
                to='privacy-policy'
              >
                Privacy Policy
              </Link>
              <Link className='item' style={{ color: '#444' }} to='Help'>
                Help
              </Link>
            </div>
          </div>
          <div className='seven wide column'>
            <h4 className='ui inverted header' style={{ color: '#444' }}>
              Together we can!!
            </h4>
            <p className='item' style={{ color: '#444' }}>
              Our mission is to connect families and build stronger communities
            </p>
          </div>
        </div>
        <div className='ui inverted section divider'></div>
        <div className='ui horizontal inverted small divided link list'>
          <Link className='item' style={{ color: '#444' }} to='contact-us'>
            Contact Us
          </Link>
          <Link className='item' style={{ color: '#444' }} to='tandc'>
            Terms and Conditions
          </Link>
          <Link className='item' style={{ color: '#444' }} to='privacy-policy'>
            Privacy Policy
          </Link>
        </div>
        <div className='ui inverted small divided link list m-bottom-15'>
          <p className='item' style={{ color: '#444' }}>
            Copyright © 2020 clazzbuddy, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  ); */
};

export default Footer;

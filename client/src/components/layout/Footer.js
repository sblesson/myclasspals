import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='ui inverted vertical footer segment'>
      <div className='ui center aligned container'>
        <div className='ui stackable inverted divided grid m-top-20'>
          <div className='three wide column'>
            <h4 className='ui inverted header'>Company</h4>
            <div className='ui inverted link list'>
              <Link className='item' to='about-us'>
                About Us
              </Link>
              <Link className='item' to='faq'>
                FAQ
              </Link>
              <Link className='item' to='careers'>
                Careers
              </Link>
            </div>
          </div>
          <div className='three wide column'>
            <h4 className='ui inverted header'>Resources</h4>
            <div className='ui inverted link list'>
              <Link className='item' to='our-mission'>
                Our Mission
              </Link>
              <Link className='item' to='our-story'>
                Our Story
              </Link>
              <Link className='item' to='our-mission'>
                Our Values
              </Link>
            </div>
          </div>
          <div className='three wide column'>
            <h4 className='ui inverted header'>Community</h4>
            <div className='ui inverted link list'>
              <Link className='item' to='guidelines'>
                Guidelines
              </Link>
              <Link className='item' to='privacy-policy'>
                Privacy Policy
              </Link>
              <Link className='item' to='Help'>
                Help
              </Link>
            </div>
          </div>
          <div className='seven wide column'>
            <h4 className='ui inverted header'>Together we can!!</h4>
            <p>
              We believe in building stronger community by connecting parents
              &amp; guardians
            </p>
          </div>
        </div>
        <div className='ui inverted section divider'></div>
        <div className='ui horizontal inverted small divided link list'>
          <Link className='item' to='contact-us'>
            Contact Us
          </Link>
          <Link className='item' to='tandc'>
            Terms and Conditions
          </Link>
          <Link className='item' to='privacy-policy'>
            Privacy Policy
          </Link>
        </div>
        <div className='ui inverted small divided link list m-bottom-15'>
          <p className='item'>
            Copyright © 2020 clazzbuddy, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;

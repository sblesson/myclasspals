import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='ui inverted vertical footer segment'>
      <div className='ui center aligned container'>
        <div className='ui stackable inverted divided grid'>
          <div className='three wide column'>
            <h4 className='ui inverted header'>Company</h4>
            <div className='ui inverted link list'>
              <Link className='item'>About</Link>
              <Link className='item'>Our Story</Link>
              <Link className='item'>Careers</Link>
            </div>
          </div>
          <div className='three wide column'>
            <h4 className='ui inverted header'>Resources</h4>
            <div className='ui inverted link list'>
              <Link className='item'>Guidelines</Link>
              <Link className='item'>Privacy</Link>
              <Link className='item'>Help</Link>
            </div>
          </div>
          <div className='three wide column'>
            <h4 className='ui inverted header'>Community</h4>
            <div className='ui inverted link list'>
              <Link className='item'>Guidelines</Link>
              <Link className='item'>Privacy</Link>
              <Link className='item'>Help</Link>
            </div>
          </div>
          <div className='seven wide column'>
            <h4 className='ui inverted header'>Copyright</h4>
            <p>Copyright © 2020 clazzbuddy, Inc. All rights reserved.</p>
          </div>
        </div>
        <div className='ui inverted section divider'></div>
        <div className='ui horizontal inverted small divided link list'>
          <Link className='item'>Site Map</Link>
          <Link className='item'>Contact Us</Link>
          <Link className='item'>Terms and Conditions</Link>
          <Link className='item'>Privacy Policy</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;

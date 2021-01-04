import React from 'react';
import Footer from './Footer';
import AboutServices from './AboutServices';

const AboutUs = () => {
  return (
    <div className='about-page'>
      <div className='row'>
        <div className='about-bg'></div>
      </div>

      <div className='row' style={{ marginTop: '20px' }}>
        {' '}
        <AboutServices />
      </div>
    </div>
  );
};

export default AboutUs;

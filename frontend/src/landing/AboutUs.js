import React from 'react';
import Footer from './Footer';
import Services from './AboutServices';

const AboutUs = () => {
  return (
    <div>
      <div className='row'>
        <div className='about-bg'></div>
      </div>

      <div className='row' style={{ marginTop: '20px' }}>
        {' '}
        <Services />
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;

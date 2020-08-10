import React from 'react';

const AboutServices = () => {
  return (
    <div className='col'>
      <section className='landing-inner services'>
        <h1>About Us </h1>

        <div className='row'>
          <div className='service-container' style={{ width: '100%' }}>
            <div className='services-card service-one'></div>

            <div className='service-description'>
              <h3>Our Story</h3>
              <div>
                {' '}
                It was a journey of stepping into the unknown and following a
                dream.
              </div>
            </div>
          </div>
          <div className='service-container' style={{ width: '100%' }}>
            <div className='service-description'>
              <h3>Our Mission</h3>
              <div>Connecting families and building stronger communities</div>
            </div>
            <div className='services-card service-two'></div>
          </div>

          <div className='service-container'>
            <div className='services-card service-three'></div>
            <div className='service-description'>
              <h3>Our Values</h3>
              <div>
                When families in school unite, there are many things to discuss.
                Share your interest. Offer help, spread kindness and make new
                buddies.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutServices;

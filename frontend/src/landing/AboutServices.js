import React from 'react';

const AboutServices = () => {
  return (
    <div className='col'>
      <section className='landing-inner services'>
        <h1>About Us </h1>

        <div className='row'>
          <div className='service-container' style={{ width: '100%' }}>
            <div className='service-description'>
              <h3>Our Story</h3>
              <div>
                Clazzbuddy is the community that brings families in school
                together. When families unite and support one another, we can
                create stronger communities. Parents can ask their questions and
                get help from other families. If you have a talent share it with
                others. Let's learn together. If you are struggling, ask for
                help. Your community is there to help you. Share your interest.
                Offer help, spread kindness and make new buddies.
              </div>
            </div>
          </div>
          <div className='service-container' style={{ width: '100%' }}>
            <div className='service-description'>
              <h3>Our Mission</h3>
              <div>
                We believe in connecting families and building stronger
                communities
              </div>
            </div>
          </div>

          <div className='service-container' style={{ width: '100%' }}>
            <div className='service-description'>
              <h3>Our Values</h3>
              <ul>
                <li>We Care </li> <li>Empower</li> <li>Team of trust </li>{' '}
                <li>We commit and deliver</li>
                <li>User focused </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutServices;

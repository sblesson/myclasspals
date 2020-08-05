import React from 'react';

const Services = () => {
  return (
    <div className='col'>
      <section className='landing-inner services'>
        <h2>How families in schools connect?</h2>

        <div className='service-container'>
          <div className='services-card service-one'></div>
          <div className='service-description'>
            <h3>Discover Groups</h3>
            <div>
              Connect with other families in school. Create a profile, search
              school and join groups. Share posts with other parents in your
              childs classroom
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='service-container' style={{ width: '100%' }}>
            <div className='service-description'>
              <h3>Together Is Better</h3>
              <div>
                Challenging times can always bring us closer. You are not alone,
                your community is there to support you. Join the network.
              </div>
            </div>
            <div className='services-card service-two'></div>
          </div>

          <div className='service-container'>
            <div className='services-card service-three'></div>
            <div className='service-description'>
              <h3>Make Friends</h3>
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

export default Services;

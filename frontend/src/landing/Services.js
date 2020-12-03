import React from 'react';

const Services = () => {
  return (
    <section
      className='landing-inner services'
      style={{ fontSize: '1.2rem', textAlign: 'left' }}
    >
      <div style={{ color: '#46bdc6', fontSize: '2.4rem' }}>
        5 reasons to join?
      </div>
      <div>
        <ol>
          <li>
            <strong>It&#39;s free</strong>
            <p>There are no hidden fees.</p>
          </li>
          <li>
            <strong>Benefit your child</strong>
            <p>
              Research shows that when families are more involved in school and
              community, it will benefit the overall academic experience of your
              child.
            </p>
          </li>
          <li>
            {' '}
            <strong>Start a Movement</strong>
            <p>
              Learn & grow together. Make more of an impact in your community.
              Start new movements like volunteering, bookclub, etc.
            </p>
          </li>
          <li>
            {' '}
            <strong>Be a role model</strong>
            <p>
              Have more involment in school community and take initiatives that
              show you are leading by example.
            </p>
          </li>
          <li>
            <strong>Get Deeper Meaningful Connections</strong>
            <p>Schedule playdate, book club, lego club, walk to park, etc.</p>
          </li>
        </ol>
      </div>
      <div style={{ color: '#46bdc6', fontSize: '2.2rem' }}>More benefits</div>
      <div className='service-container'>
        <div className='services-card service-one'></div>
        <div className='service-description'>
          <strong style={{ color: '#46bdc6' }}>
            Discover School Community
          </strong>
          <div>
            Connect with other families in school. Create a profile, join school
            community and share posts with other parents in your child&apos;s
            class
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='service-container' style={{ width: '100%' }}>
          <div className='service-description'>
            <strong style={{ color: '#46bdc6' }}>Together Is Better</strong>
            <div>
              Challenging times can bring us closer. Join your school community.
            </div>
          </div>
          <div className='services-card service-two'></div>
        </div>

        <div className='service-container'>
          <div className='services-card service-three'></div>
          <div className='service-description'>
            <strong style={{ color: '#46bdc6' }}>Make Friends</strong>
            <div>
              When families in school unite, there are many things to discuss.
              Share your interest. Offer help, spread kindness and make new
              friends.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;

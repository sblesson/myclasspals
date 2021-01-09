import React from 'react';

const Services = () => {
  return (
    <section
      className='landing-inner services'
      style={{ fontSize: '1.2rem', textAlign: 'left' }}
    >
      <div style={{ color: '#0cadc5', fontSize: '2.4rem' }}>
        5 reasons to join?
      </div>
      <div>
        <ol>
          <li>
            <strong>Benefit your child</strong>
            <p>
              Research shows that when families are more involved in school and
              community, it will benefit the overall academic experience of your
              child.
            </p>
          </li>
          <li>
            <strong>Strong Relationships Create Strong Kids</strong>
            <p>
              Research shows kids do well are the ones who have strong, stable
              supportive relationships. Strong community builds strong, happy
              kids.
            </p>
          </li>
          <li>
            <strong>Schedule quality time</strong>
            <p>
              Schedule activities as part of daily or weekly routine. Activities
              such as virtual playdate, story time, virtual lunch or dinner,
              book club, show and tell, lego club, sing songs, share photos, DIY
              craft, bake cookies etc.
            </p>
          </li>
          <li>
            <strong>Be a role model</strong>
            <p>
              Have more involvement in the school community and take initiatives
              that show you are leading by example.
            </p>
          </li>
          <li>
            {' '}
            <strong>Amazing communities, happy future</strong>
            <p>
              Happy parents, teachers and students with supportive communities
              are likely to have happy optimistic futures.
            </p>
          </li>
        </ol>
      </div>
      <div style={{ color: '#0cadc5', fontSize: '2.2rem' }}>More benefits</div>
      <div className='service-container'>
        <div className='services-card service-one'></div>
        <div className='service-description'>
          <strong style={{ color: '#0cadc5' }}>Make Friends</strong>
          <div>
            When families in school unite, there are many things to discuss.
            Share your interest. Offer help, spread kindness and make new
            friends.
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='service-container' style={{ width: '100%' }}>
          <div className='service-description'>
            <strong style={{ color: '#0cadc5' }}>Together Is Better</strong>
            <div>
              Challenging times can bring us closer. Join your school community.
            </div>
          </div>
          <div className='services-card service-two'></div>
        </div>

        <div className='service-container'>
          <div className='services-card service-three'></div>
          <div className='service-description'>
            <strong style={{ color: '#0cadc5' }}>
              Discover School Community
            </strong>
            <div>
              Connect with other families in school. Create account, join school
              community and share posts with other families.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;

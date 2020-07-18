import React from 'react';

const Landing = () => {
  return (
    <div className='col col-8'>
      <section>
        <div>
          <img
            src='https://d19rpgkrjeba2z.cloudfront.net/static/images/groups/default-cover4@2x.svg'
            alt='Custom banner image for this neighborhood group.'
            data-testid='groups-page-header-image'
          ></img>
        </div>
        <div className='dark-overlay'>
          <div className='landing-inner'>
            <h1 className='x-large'>Social network for parent&#39;s</h1>
            <h1 className='large'>
              Connect with other parents in your child&#39;s classroom
            </h1>
            <p className='lead'>
              Create a profile, search school and share posts with other parents
              in your childs classroom
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;

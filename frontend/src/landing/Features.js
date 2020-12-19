import React from 'react';
import {
  CalendarOutlined,
  SmileOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';

import './Features.scss';

const Features = () => {
  return (
    <div className='row  mx-auto feature-list'>
      <div className='col-md-4'>
        <div className='info feature-box text-center p-3 p-md-4 mx-auto'>
          <ShareAltOutlined
            className='feature-icon'
            style={{ fontSize: '2.8rem', color: '#4FC2C2' }}
          />
          <div className='description'>
            <h5 className='feature-title mb-3'>Join Community</h5>
            <p>
              Connect with other families, make new friends. Support one
              another. Create groups for playing sports, chess,
              art-science-math-debate clubs, carpool, book clubs, after care
              support, meal planning tips etc.
            </p>
          </div>
        </div>
      </div>
      <div className='col-md-4'>
        <div className='info feature-box text-center p-3 p-md-4 mx-auto'>
          <SmileOutlined
            className='feature-icon mx-auto'
            style={{ fontSize: '2.8rem', color: '#4FC2C2' }}
          />
          <div className='description'>
            <h5 className='feature-title mb-3'>Authentic Connection</h5>
            <p>
              Talk to other families and get informed. Create deeper connection.
              Be the voice and make the change.
            </p>
          </div>
        </div>
      </div>
      <div className='col-md-4'>
        <div className='info feature-box text-center p-3 p-md-4 mx-auto'>
          <CalendarOutlined
            className='feature-icon mx-auto'
            style={{ fontSize: '2.8rem', color: '#4FC2C2' }}
          />
          <div className='description'>
            <h5 className='feature-title mb-3'>Co-ordinate Events</h5>
            <p>
              Schedule events, playdate, birthday party, volunteering, PTA
              meetings, scouts meetings. The possibilities are endless!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;

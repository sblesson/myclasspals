import React from 'react';
import {
  NotificationOutlined,
  SmileOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';

import './Features.scss';

const Features = () => {
  return (
    <div className='row  mx-auto feature-list'>
      <div className='col-md-4'>
        <div className='info feature-box text-center p-3 p-md-4 mx-auto'>
          <NotificationOutlined
            className='feature-icon mx-auto'
            style={{ fontSize: '2.8rem', color: '#45b6dc' }}
          />
          <div className='description'>
            <h5 className='feature-title mb-3'>CONNECT</h5>
            <p>
              The saying "it takes a village to raise a child", our village is
              the school community. Connect with other families, make new
              buddies. Support one another. Create buddy groups for playing
              sports, chess, art-science-math-debate clubs, carpool, book clubs,
              after care support, meal planning tips etc..
            </p>
          </div>
        </div>
      </div>
      <div className='col-md-4'>
        <div className='info feature-box text-center p-3 p-md-4 mx-auto'>
          <ShareAltOutlined
            className='feature-icon'
            style={{ fontSize: '2.8rem', color: '#45b6dc' }}
          />
          <div className='description'>
            <h5 className='feature-title mb-3'>COMMUNICATE</h5>
            <p>
              Talk to other families in school and get informed. Be the voice
              and make the change.
            </p>
          </div>
        </div>
      </div>
      <div className='col-md-4'>
        <div className='info feature-box text-center p-3 p-md-4 mx-auto'>
          <SmileOutlined
            className='feature-icon mx-auto'
            style={{ fontSize: '2.8rem', color: '#45b6dc' }}
          />

          <div className='description'>
            <h5 className='feature-title mb-3'>COORDINATE</h5>
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

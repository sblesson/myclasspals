import React, { useEffect, useState, Fragment } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import _ from 'lodash';
import { Steps, Button, message, Tabs } from 'antd';

import { createProfile } from '../../actions/profile';

import UserAccountForm from './UserAccountForm';
import DiscoverGroup from '../groups/DiscoverGroup';
import ProfileCreateGroup from './ProfileCreateGroup';

import './CreateProfile.scss';

const CreateProfile = ({
  createProfile,
  profile: { profile, loading },
  auth,
  history,
  match
}) => {
  const { TabPane } = Tabs;

  const [activeKey, setActiveKey] = useState(match.params.id);
  const [currentStep, setCurrentStep] = useState(0);

  const handleTabChange = activeKey => setActiveKey(activeKey);

  const goToManageGroups = e => {
    setActiveKey('2');
  };

  const [profileData, setProfileData] = useState({
    name: '',
    phone: '',
    street: '',
    suite: '',
    city: '',
    state: '',
    zipcode: '',
    isTandCAccepted: false
  });
  const Step = Steps.Step;

  const handleSubmitProfile = e => {
    e.preventDefault();
    console.log(profileData);
    createProfile(profileData, history);
    history.push('/dashboard');
  };

  const next = () => {
    console.log(currentStep);
    const current = currentStep + 1;
    console.log(current);

    setCurrentStep({ current });
  };
  const prev = () => {
    const current = currentStep - 1;
    setCurrentStep({ current });
  };
  const steps = [
    {
      title: 'First',
      content: 'First-content'
    },
    {
      title: 'Second',
      content: 'Second-content'
    },
    {
      title: 'Last',
      content: 'Last-content'
    }
  ];

  return loading &&
    auth &&
    auth.user.userGroup &&
    auth.user.userGroup.lenth > 0 ? (
    <Redirect to='/dashboard' />
  ) : (
    <Fragment>
      <div className='create-profile-component-content'>
{/*         <div>
          <Steps current={currentStep}>
            {steps.map(item => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
          <div className='steps-content'>{steps[1].content}</div>
          <div className='steps-action'>
            {currentStep < steps.length - 1 && (
              <Button type='primary' onClick={() => next()}>
                Next
              </Button>
            )}
            {currentStep === steps.length - 1 && (
              <Button
                type='primary'
                onClick={() => message.success('Processing complete!')}
              >
                Done
              </Button>
            )}
            {currentStep > 0 && (
              <Button style={{ marginLeft: 8 }} onClick={() => prev()}>
                Previous
              </Button>
            )}
          </div>
        </div> */}
        <Tabs
          defaultActiveKey='1'
          activeKey={activeKey}
          onChange={handleTabChange}
          //tabPosition='left'
        >
          <TabPane
            tab={<Link to='/create-profile/1'>Enter Your Profile</Link>}
            key='1'
          >
            <UserAccountForm profileData={profileData} />
          </TabPane>

          <TabPane
            tab={<Link to='/create-profile/2'>Discover Groups</Link>}
            key='2'
          >
            <DiscoverGroup newRegistration={true} />
          </TabPane>
          <TabPane
            tab={<Link to='/create-profile/3'>Create Group</Link>}
            key='3'
          >
            <ProfileCreateGroup />
          </TabPane>
        </Tabs>
      </div>
    </Fragment>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile
});
export default connect(mapStateToProps, {
  createProfile
})(withRouter(CreateProfile));

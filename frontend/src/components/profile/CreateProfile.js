import React, { useState, useEffect, Fragment } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import _ from 'lodash';
import { Steps } from 'antd';

import UserProfileForm from './UserProfileForm';
import DiscoverGroup from '../groups/DiscoverGroup';

import './CreateProfile.scss';

const CreateProfile = ({ auth, history }) => {
  useEffect(() => {
    if (auth && auth.user) {
      let user = auth.user;
      if (user.userGroup && user.userGroup.length > 0) {
        history.push('/dashboard');
      } else if (
        user.requestedUserGroup &&
        user.requestedUserGroup.length > 0
      ) {
        history.push('/groups');
      } else if (user.city) {
        handleStepChange(current);
      }
    }
  }, [auth]);
  const { Step } = Steps;

  const [current, setCurrentStep] = useState(0);

  const handleStepChange = current => {
    current = current + 1;
    setCurrentStep(current);
  };
  const steps = [
    {
      title: 'Enter your profile',
      subTitle: '(step 1 of 2)',
      content: (
        <UserProfileForm onStepChange={handleStepChange} current={current} />
      )
    },
    {
      title: 'Manage your group',
      subTitle: '(step 2 of 2)',
      content: <DiscoverGroup newRegistration={true} />
    }
  ];

  return auth && auth.user.userGroup && auth.user.userGroup.length > 0 ? (
    <Redirect to='/dashboard' />
  ) : (
    <Fragment>
      <div className='create-profile-wrapper'>
        <Steps
          current={current}
          size='small'
          className='profile-step'
          /* onChange={handleStepChange} */
        >
          {steps.map(item => (
            <Step
              key={item.title}
              title={item.title}
              subTitle={item.subTitle}
            />
          ))}
        </Steps>
        <div className='steps-content'>{steps[current].content}</div>
      </div>
    </Fragment>
  );
};

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile
});
export default connect(mapStateToProps, {})(withRouter(CreateProfile));

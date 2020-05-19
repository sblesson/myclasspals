import React, { useState, Fragment } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import _ from 'lodash';
import { Steps } from 'antd';

import UserAccountForm from './UserProfileForm';
import DiscoverGroup from './DiscoverGroup';

import './CreateProfile.scss';

const CreateProfile = ({ auth }) => {
  const { Step } = Steps;

  const [current, setCurrentStep] = useState(1);

  const handleStepChange = current => {
    current = current + 1;
    setCurrentStep(current);
  };
  const steps = [
    {
      title: 'Enter your profile',
      content: (
        <UserAccountForm onStepChange={handleStepChange} current={current} />
      )
    },
    {
      title: 'Manage your group',
      content: <DiscoverGroup newRegistration={true} />
    }
  ];

  return auth && auth.user.userGroup && auth.user.userGroup.lenth > 0 ? (
    <Redirect to='/dashboard' />
  ) : (
    <Fragment>
      <div className='create-profile-component-content'>
        <Steps
          current={current}
          size='small'
          className='profile-step'
          /* onChange={handleStepChange} */
        >
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
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

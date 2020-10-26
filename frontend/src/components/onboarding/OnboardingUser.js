import React, { useState, useEffect, Fragment } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import CreateClassGroup from '../groups/modal/CreateGroupModal';
import JoinGroup from '../groups/modal/DiscoverGroupModal';

import './OnboardingUser.scss';

const OnboardingUser = ({ auth, history }) => {
  useEffect(() => {
    if (auth && auth.user) {
      let user = auth.user;
      if (user.userGroup && user.userGroup.length > 0) {
        history.push('/dashboard');
      } else if (
        user.requestedUserGroup &&
        user.requestedUserGroup.length > 0
      ) {
        history.push('/dashboard');
      }
    }
  }, [auth]);

  return auth && auth.user.userGroup && auth.user.userGroup.length > 0 ? (
    <Redirect to='/dashboard' />
  ) : (
    <Fragment>
      <div className='onboarding-wrapper'>
        <JoinGroup newRegistration={true} />
        <CreateClassGroup newRegistration={true} />
      </div>
    </Fragment>
  );
};

OnboardingUser.propTypes = {
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
});
export default connect(mapStateToProps, {})(withRouter(OnboardingUser));

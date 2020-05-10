import React, { useEffect, useState, Fragment } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import _ from 'lodash';

import { Tabs } from 'antd';

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

  const handleSubmitProfile = e => {
    e.preventDefault();
    console.log(profileData);
    createProfile(profileData, history);
    history.push('/dashboard');
  };

  return loading &&
    auth &&
    auth.user.userGroup &&
    auth.user.userGroup.lenth > 0 ? (
    <Redirect to='/dashboard' />
  ) : (
    <Fragment>
      <div className='create-profile-component-content'>
        <Tabs
          defaultActiveKey='1'
          activeKey={activeKey}
          onChange={handleTabChange}
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

import React, { useEffect, useState, Fragment } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import _ from 'lodash';

import { createProfile, getCurrentProfile } from '../../actions/profile';

import { Tab, Button, Checkbox } from 'semantic-ui-react';

import UserAccountForm from './UserAccountForm';
import AddChildForm from './AddChildForm';
import WelcomeForm from './WelcomeForm';

import './CreateProfile.scss';

const CreateProfile = ({
  createProfile,
  getCurrentProfile,
  profile: { profile, loading },
  history
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleTabChange = (e, { activeIndex }) => setActiveIndex(activeIndex);

  const handlePageChange = e => {
    setActiveIndex(e.target.value);
    console.log(profileData);
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

  const panes = [
    {
      menuItem: 'Your Info',
      render: () => (
        <Tab.Pane attached={false}>
          <UserAccountForm profileData={profileData} />

          <Button
            content='Proceed'
            color='pink'
            className='actionBtnWrapper'
            onClick={handlePageChange}
            value={1}
          />
        </Tab.Pane>
      )
    },
    {
      menuItem: "Child's Class Info",
      render: () => (
        <Tab.Pane attached={false}>
          <AddChildForm profileData={profileData} showwAddChildButton={true} />

          <Button
            content='Proceed'
            className='actionBtnWrapper'
            color='pink'
            onClick={handlePageChange}
            value={2}
          />
        </Tab.Pane>
      )
    },
    {
      menuItem: 'Summary',
      render: () => (
        <Tab.Pane attached={false}>
          <WelcomeForm />
          <Checkbox
            label={'I agree to the Terms and Conditions'}
            defaultIndeterminate={profileData.isTandCAccepted}
            name='isTandCAccepted'
            onChange={(e, data) => onChangeCheckBoxHandler(e, data)}
          />
          <Button
            content='Submit'
            className='actionBtnWrapper'
            color='pink'
            disabled={profileData.isTandCAccepted}
            onClick={handleSubmitProfile}
          />
        </Tab.Pane>
      )
    }
  ];

  const onChangeCheckBoxHandler = (event, data) => {
    profileData.isTandCAccepted = data.checked;
  };

  const handleSubmitProfile = e => {
    e.preventDefault();
    console.log(profileData);
    createProfile(profileData, history);
    history.push('/dashboard');
  };
  useEffect(() => {
    getCurrentProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getCurrentProfile]);
  return loading && profile === null ? (
    <Redirect to='/dashboard' />
  ) : (
    <Fragment>
      <div className='create-profile-component-container'>
        <div className='create-profile-component-header'>
          <h4 className='create-profile-component-title'>
            Create Your Profile
          </h4>
        </div>
        <div className='create-profile-component-content'>
          <small>Don\'t worry you change change this info later </small>
          <br />
          <small>* = required field</small>

          <Tab
            menu={{ secondary: true, pointing: true }}
            panes={panes}
            activeIndex={activeIndex}
            onTabChange={handleTabChange}
          />
        </div>
      </div>
    </Fragment>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile,
  isLoading: state.school.isLoading
});
export default connect(mapStateToProps, {
  createProfile,
  getCurrentProfile
})(withRouter(CreateProfile));

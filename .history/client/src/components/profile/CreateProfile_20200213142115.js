import React, { useEffect, useState, Fragment } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import _ from 'lodash';

import {
  addSchool,
  createProfile,
  getCurrentProfile
} from '../../actions/profile';

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
  const handleRangeChange = e => setActiveIndex(e.target.value);

  const [profileData, setProfileData] = useState({
    user: {
      name: '',
      email: '',
      phone: '',
      address: {
        street: '',
        suite: '',
        city: '',
        state: '',
        zipcode: ''
      }
    },
    community: [
      {
        schoolName: '',
        classRoom: '',
        grade: '',
        childName: ''
      }
    ],
    isTandCAccepted: false
  });

  const panes = [
    {
      menuItem: 'Your Info',
      render: () => (
        <Tab.Pane attached={false}>
          <UserAccountForm user={profileData.user} />
          <Button
            content='Proceed'
            className='float-right'
            color='pink'
            onClick={handleRangeChange}
            value={1}
          />
        </Tab.Pane>
      )
    },
    {
      menuItem: "Child's Info",
      render: () => (
        <Tab.Pane attached={false}>
          <AddChildForm community={profileData.community} />
          <Button
            content='Proceed'
            className='float-right'
            color='pink'
            onClick={handleRangeChange}
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
            checked={profileData.isTandCAccepted}
            name='isTandCAccepted'
            onChecked={e => onChangeCheckBoxHandler(e)}
          />
          <Button
            content='Submit'
            className='float-right'
            color='pink'
            onClick={handleSubmitProfile}
          />
        </Tab.Pane>
      )
    }
  ];

  const onChangeCheckBoxHandler = (event,data) => {
    //this.setState({ [data.name]: value });
    //profileData[event.target.name] = event.checked;
    console.log(event);
    console.log(event.target.checked);
    console.log(profileData.isAcceptedTandC);
  };

  const handleSubmitProfile = e => {
    e.preventDefault();
    console.log(profileData);
    //createProfile(profileData, history);
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
      <div class='create-profile-component-container'>
        <div class='create-profile-component-header'>
          <h4 class='create-profile-component-title'>Create Your Profile</h4>
        </div>
        <div class='create-profile-component-content'>
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
  profile: PropTypes.object.isRequired,
  addSchool: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile,
  isLoading: state.school.isLoading
});
export default connect(mapStateToProps, {
  createProfile,
  getCurrentProfile,
  addSchool
})(withRouter(CreateProfile));

import React, { useEffect, useState, Fragment } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import _ from 'lodash';

import { Button } from 'reactstrap';
import {
  addSchool,
  createProfile,
  getCurrentProfile
} from '../../actions/profile';

import { Tab, Input, Grid, Select, Radio, Form } from 'semantic-ui-react';

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
  const [formData, setFormData] = useState({});

  state = { activeIndex: 1 }

  handleRangeChange = (e) => this.setState({ activeIndex: e.target.value })
  handleTabChange = (e, { activeIndex }) => this.setState({ activeIndex })

  activeIndex={activeIndex}
  onTabChange={this.handleTabChange}
  const profileData = {
    user: {
      name: 'Sapna Graham',
      email: 'Sincere@april.biz',
      phone: '1-770-736-8031 x56442',
      address: {
        street: 'Kulas Light',
        suite: 'Apt. 556',
        city: 'Gwenborough',
        state: 'California',
        zipcode: '92998-3874'
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
    isAcceptedTandC: false
  };

  const panes = [
    {
      menuItem: 'Your Info',
      render: () => (
        <Tab.Pane attached={false}>
          <UserAccountForm user={profileData.user} />
        </Tab.Pane>
      )
    },
    {
      menuItem: "Child's Info",
      render: () => (
        <Tab.Pane attached={false}>
          <AddChildForm community={profileData.community} />
        </Tab.Pane>
      )
    },
    {
      menuItem: 'Summary',
      render: () => (
        <Tab.Pane attached={false}>
          <WelcomeForm isAcceptedTandC={profileData.isAcceptedTandC} />
        </Tab.Pane>
      )
    }
  ];

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history);
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

          <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
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

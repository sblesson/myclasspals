import React, { useEffect, useState, Fragment } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';

import { Tab } from 'semantic-ui-react';
import './CreateProfile.scss';

const CreateProfile = ({
  createProfile,
  getCurrentProfile,
  profile: { profile, loading },
  history
}) => {
  const [formData, setFormData] = useState({});
  const panes = [
    {
      menuItem: 'Contact Information',
      render: () => <Tab.Pane attached={false}>Tab 1 Content</Tab.Pane>
    },
    {
      menuItem: 'Add Child',
      render: () => <Tab.Pane attached={false}>Tab 2 Content</Tab.Pane>
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
      <div class='newprofile-component-container'>
        <div class='profile-component-header'>
          <h4 class='profile-component-title'>My Account</h4>
        </div>
        <div class='profile-component-content'>
          {' '}
          <div class='profile-content-details'>
            <div>
              <div class='account-info-action-container'>
                <div class='account-info-edit-button-right'>
                  <span>Edit</span>
                </div>
              </div>
            </div>
            <div>
              <div class='account-info-action-container'>
                <div class='account-info-delete-button-right'>
                  <span>Delete</span>
                </div>
              </div>
            </div>
            <div class='user-info-item'>
              <div class='user-info-content'>catherine </div>
            </div>
            <div class='user-info-item'>
              <div class='user-info-content'>Leanne Graham </div>
            </div>
            <div class='user-info-item'>
              <i class='fas fa-mobile'></i>
              <div class='user-info-content'>1-770-736-8031 x56442 </div>
            </div>
            <div class='user-info-item'>
              <i class='fas fa-at'></i>
              <div class='user-info-content'>Sincere@april.biz </div>
            </div>
            <div class='user-info-item'>
              <i class='fas fa-map-marker big'></i>
              <div class='user-info-content'>
                Kulas Light, Apt. 556Gwenborough, California 92998-3874
              </div>
            </div>
          </div>
        </div>
      </div>

      <h1 className='large text-primary'>Create Your Profile</h1>
      <div className='create-profile-content'>
        <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
      </div>
      <small>* = required field</small>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Save
        </Link>
      </form>
    </Fragment>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile
});
export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(CreateProfile)
);

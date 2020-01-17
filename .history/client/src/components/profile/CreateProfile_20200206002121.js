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
      <div class='create-profile-component-container'>
        <div class='create-profile-component-header'>
          <h4 class='create-profile-component-title'>Create Your Profile</h4>
        </div>
        <div class='create-profile-component-content'>
          <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
        </div>
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

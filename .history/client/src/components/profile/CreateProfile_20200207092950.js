import React, { useEffect, useState, Fragment } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';
import { Form, FormGroup } from 'reactstrap';
import { addSchool } from '../../../../actions/profile';

import { Search, Input, Grid } from 'semantic-ui-react';

import { Tab } from 'semantic-ui-react';
import './CreateProfile.scss';

const CreateProfile = ({
  createProfile,
  getCurrentProfile,
  profile: { profile, loading },
  history,
  addSchool
}) => {
  const [formData, setFormData] = useState({});
  const panes = [
    {
      menuItem: 'Your Info',
      render: () => <Tab.Pane attached={false}>Tab 1 Content</Tab.Pane>
    },
    {
      menuItem: "Childs's Info",
      render: () => (
        <Tab.Pane attached={false}>
          <Form>
            <FormGroup className='post-form'>
              <Input
                placeholder='Name of Child'
                name='childName'
                onChange={e => onChange(e)}
                required
              />
            </FormGroup>
            <FormGroup className='post-form'>
              <Grid>
                <Grid.Column width={6}>
                  <Search
                    placeholder='Type school name'
                    loading={isLoading}
                    onResultSelect={handleResultSelect}
                    onBlur={_.debounce(handleSearchOnBlur, 500, {
                      leading: true
                    })}
                    results={results}
                    value={value}
                    resultRenderer={resultRenderer}
                    name='schoolName'
                    //onChange={e => onChange(e)}
                  />
                </Grid.Column>
              </Grid>
            </FormGroup>
            <FormGroup className='post-form'>
              <Input
                className='post-form-text-input'
                type='text'
                name='grade'
                //value={grade}
                placeholder='* Grade'
                onChange={e => onChange(e)}
              />
            </FormGroup>
            <FormGroup className='post-form'>
              <Input
                className='post-form-text-input'
                type='text'
                name='classRoom'
                //value={classRoom}
                placeholder='Class Room'
                onChange={e => onChange(e)}
              />
            </FormGroup>
          </Form>{' '}
          <Link className='btn btn-light my-1' to='/dashboard'>
            Save
          </Link>
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
          <p>
            Don\'t worry
            <br /> you change change this info later
          </p>
        </div>
        <div class='create-profile-component-content'>
          <small>* = required field</small>

          <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
        </div>
      </div>
      <Button
        color='primary'
        onClick={e => {
          e.preventDefault();
          addSchool(formData, history);
        }}
      >
        Save
      </Button>
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
  profile: state.profile
});
export default connect(mapStateToProps, {
  createProfile,
  getCurrentProfile,
  addSchool
})(withRouter(CreateProfile));

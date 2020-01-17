import React, { useEffect, useState, Fragment } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import _ from 'lodash';

import { Form, FormGroup, Button } from 'reactstrap';
import {
  addSchool,
  createProfile,
  getCurrentProfile
} from '../../actions/profile';

import { Tab, Input, Grid } from 'semantic-ui-react';

import './CreateProfile.scss';

const CreateProfile = ({
  createProfile,
  getCurrentProfile,
  profile: { profile, loading },
  history,
  addSchool,
  isLoading
}) => {
  const [formData, setFormData] = useState({});
  const panes = [
    {
      menuItem: 'Your Info',
      render: () => (
        <Tab.Pane attached={false}>
          <Form>
            <FormGroup className='account-form'>
              <Input
                placeholder='Your name'
                name='username'
                onChange={e => onChange(e)}
                required
              />
            </FormGroup>
            <FormGroup className='account-form'>
              <Input
                className='account-form-text-input'
                type='text'
                name='email'
                //value={grade}
                placeholder='Email'
                onChange={e => onChange(e)}
              />
            </FormGroup>
            <FormGroup className='account-form'>
              <Input
                className='account-form-text-input'
                type='text'
                name='street'
                //value={classRoom}
                placeholder='Street'
                onChange={e => onChange(e)}
              />
            </FormGroup>
            {/*         <article>
            <p>
              <i className='fas fa-user' /> Edit your profile
            </p>
            <small>* = required field</small>
            <form className='form' onSubmit={e => onSubmit(e)}>
              <div className='form-group'>
                <input
                  type='text'
                  placeholder='username'
                  name='username'
                  value={username}
                  onChange={e => onChange(e)}
                />
              </div>
              <div className='form-group'>
                <input
                  type='text'
                  placeholder='Location'
                  name='location'
                  value={location}
                  onChange={e => onChange(e)}
                />
                <small className='form-text'>
                  City & state suggested (eg. Boston, MA)
                </small>
              </div>
              <input
                type='submit'
                value='Save'
                className='btn btn-primary my-1'
              />
            </form>
          </article> */}
            {/*         <div className='my-2'>
            <button className='btn btn-danger' onClick={() => deleteAccount()}>
              <i className='fas fa-user-minus' /> Delete My Account
            </button>
          </div> */}

            <Button color='primary' size='lg' block>
              Add child
            </Button>
          </Form>
        </Tab.Pane>
      )
    },
    {
      menuItem: "Child's Info",
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
                  {/*      <Search
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
                  /> */}
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
          </Form>
        </Tab.Pane>
      )
    },
    {
      menuItem: 'Summary',
      render: () => (
        <Tab.Pane attached={false}>
          <article>
            Welcome to your child\'s school community. Your first post to making
            a difference is just a minute away. Click on Please take a minute to
            view term and conditions.

            <div class="ui checkbox">
  <input type="checkbox" name="tandc">
  <label>Terms and conditions</label>
</div>
            <Link to='/dashboard'>Go to dashboard</Link>
          </article>
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
  profile: state.profile,
  isLoading: state.school.isLoading
});
export default connect(mapStateToProps, {
  createProfile,
  getCurrentProfile,
  addSchool
})(withRouter(CreateProfile));

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
  const userData = {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
    address: {
      street: 'Kulas Light',
      suite: 'Apt. 556',
      city: 'Gwenborough',
      state: 'California',
      zipcode: '92998-3874',
      geo: {
        lat: '-37.3159',
        lng: '81.1496'
      }
    },
    phone: '1-770-736-8031 x56442',
    website: 'hildegard.org',
    company: {
      name: 'Romaguera-Crona',
      catchPhrase: 'Multi-layered client-server neural-net',
      bs: 'harness real-time e-markets'
    }
  };
  const panes = [
    {
      menuItem: 'Your Info',
      render: () => (
        <Tab.Pane attached={false}>
          <Form>
            <FormGroup className='new-account-form'>
              <Input
                placeholder='Your name'
                name='name'
                defaultValue={userData.name}
                onChange={e => onChange(e)}
                required
              />
            </FormGroup>
            <FormGroup className='new-account-form'>
              <Input
                placeholder='Phone number'
                name='phone'
                defaultValue={userData.phone}
                onChange={e => onChange(e)}
                required
              />
            </FormGroup>
            <FormGroup className='new-account-form'>
              <Input
                type='text'
                name='street'
                defaultValue={userData.address.street}
                placeholder='Street'
                onChange={e => onChange(e)}
              />
            </FormGroup>
            <FormGroup className='new-account-form'>
              <Input
                type='text'
                name='suite'
                defaultValue={userData.address.suite}
                placeholder='Suite'
                onChange={e => onChange(e)}
              />
            </FormGroup>
            <FormGroup className='new-account-form'>
              <Input
                type='text'
                name='city'
                defaultValue={address.city}
                placeholder='City'
                onChange={e => onChange(e)}
              />
            </FormGroup>
            <FormGroup className='new-account-form'>
              <Input
                type='text'
                name='city'
                defaultValue={address.city}
                placeholder='City'
                onChange={e => onChange(e)}
              />
            </FormGroup>

            <FormGroup className='new-account-form'>
              <Button
                className='float-right'
                color='primary'
                onClick={e => {
                  e.preventDefault();
                  //addSchool(formData, history);
                }}
              >
                Save &amp; Continue
              </Button>
            </FormGroup>
          </Form>
        </Tab.Pane>
      )
    },
    {
      menuItem: "Child's Info",
      render: () => (
        <Tab.Pane attached={false}>
          <Form>
            <FormGroup className='new-account-form'>
              <Input
                placeholder='Name of Child'
                name='childName'
                onChange={e => onChange(e)}
                required
              />
            </FormGroup>
            <FormGroup className='new-account-form'>
              <Grid>
                <Grid.Column width={6}></Grid.Column>
              </Grid>
            </FormGroup>
            <FormGroup className='new-account-form'>
              <Input
                className='post-form-text-input'
                type='text'
                name='grade'
                //value={grade}
                placeholder='* Grade'
                onChange={e => onChange(e)}
              />
            </FormGroup>
            <FormGroup className='new-account-form'>
              <Input
                className='post-form-text-input'
                type='text'
                name='classRoom'
                //value={classRoom}
                placeholder='Class Room'
                onChange={e => onChange(e)}
              />
            </FormGroup>
            <FormGroup className='new-account-form'>
              <Button
                color='primary'
                className='float-right'
                onClick={e => {
                  e.preventDefault();
                  addSchool(formData, history);
                }}
              >
                Save
              </Button>
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
            <div>
              Welcome to your child\'s school community. Your first post to
              making a difference is just a minute away. Click on Please take a
              minute to view term and conditions.
            </div>
            <div class='ui checkbox'>
              <input type='checkbox' name='tandc' />
              <label>Terms and conditions</label>
            </div>
            <br />
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

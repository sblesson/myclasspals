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
  /*   const userData = {
    id: 1,
    name: '',
    username: '',
    email: '',
    address: {
      street: '',
      suite: '',
      city: '',
      state: '',
      zipcode: '',
      geo: {
        lat: '-37.3159',
        lng: '81.1496'
      }
    },
    phone: '',
    website: '',
    company: {
      name: '',
      catchPhrase: '',
      bs: ''
    }
  }; */
  const panes = [
    {
      menuItem: 'Your Info',
      render: () => (
        <Tab.Pane attached={false}>
          <Form>
            <Form.Field
              control={Input}
              label='Your name'
              placeholder='Your name'
              name='name'
              defaultValue={userData.name}
              onChange={e => onChange(e)}
              required
            />
            <Form.Field
              control={Input}
              label='Phone number'
              placeholder='Phone number'
              name='phone'
              defaultValue={userData.phone}
              onChange={e => onChange(e)}
              required
            />
            <Form.Field
              control={Input}
              label='Street'
              placeholder='Street'
              name='street'
              defaultValue={userData.address.street}
              onChange={e => onChange(e)}
            />
            <Form.Field
              control={Input}
              label='Apt/Suite'
              placeholder='Apt/Suite'
              name='suite'
              defaultValue={userData.address.suite}
              onChange={e => onChange(e)}
            />
            <Form.Field
              control={Input}
              label='City'
              placeholder='City'
              name='city'
              defaultValue={userData.address.city}
              onChange={e => onChange(e)}
            />
            <Form.Field
              control={Input}
              label='City'
              placeholder='City'
              name='city'
              defaultValue={userData.address.city}
              onChange={e => onChange(e)}
            />

            <Form.Field widths='equal'>
              <Form.Select
                fluid
                //options={userData.address.state}
                placeholder='Gender'
              />
            </Form.Field>
            <Form.Field
              control={Input}
              label='Zip'
              placeholder='Zip'
              name='zip'
              defaultValue={userData.address.zip}
              onChange={e => onChange(e)}
            />
            <Form.Field
              control={Button}
              className='float-right'
              color='primary'
              onClick={e => {
                e.preventDefault();
                //addSchool(formData, history);
              }}
            >
              Save &amp; Continue
            </Form.Field>
            <Form.Field
              control={Button}
              className='float-right'
              color='primary'
              onClick={e => {
                e.preventDefault();
                //addSchool(formData, history);
              }}
            >
              Submit
            </Form.Field>

            <Form.Field className='new-account-form'>
              <Button className='float-right' color='primary'>
                Save &amp; Continue
              </Button>
            </Form.Field>
          </Form>
        </Tab.Pane>
      )
    },
    {
      menuItem: "Child's Info",
      render: () => (
        <Tab.Pane attached={false}>
          <Form>
            <Form.Group className='new-account-form'>
              <Input
                placeholder='Name of Child'
                name='childName'
                onChange={e => onChange(e)}
                required
              />
            </Form.Group>
            <Form.Group className='new-account-form'>
              <Grid>
                <Grid.Column width={6}></Grid.Column>
              </Grid>
            </Form.Group>
            <Form.Group className='new-account-form'>
              <Input
                className='post-form-text-input'
                type='text'
                name='grade'
                //value={grade}
                placeholder='* Grade'
                onChange={e => onChange(e)}
              />
            </Form.Group>
            <Form.Group className='new-account-form'>
              <Input
                className='post-form-text-input'
                type='text'
                name='classRoom'
                //value={classRoom}
                placeholder='Class Room'
                onChange={e => onChange(e)}
              />
            </Form.Group>
            <Form.Group className='new-account-form'>
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
            </Form.Group>
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

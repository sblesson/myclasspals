import React, { useEffect, useState, Fragment } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import _ from 'lodash';

import { createProfile, getCurrentProfile } from '../../../actions/profile';

import {
  Input,
  Grid,
  Select,
  Radio,
  Form,
  Button,
  Checkbox
} from 'semantic-ui-react';

const AddChildForm = ({
  createProfile,
  getCurrentProfile,
  profile: { profile, loading },
  history,
  addSchool,
  isLoading
}) => {
  const [formData, setFormData] = useState({});
  const childData = {
    id: 1,
    childName: 'Leanne Graham',
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
  const yourInfo = (
    <Form>
      <Form.Field
        control={Input}
        label='Your Child\s name'
        placeholder='Your Child\s name'
        name='childName'
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

      {/*       <Form.Field widths='equal'>
        <Form.Select
          fluid
          //options={userData.address.state}
          placeholder='Gender'
        />
      </Form.Field> */}
      <Form.Field
        control={Input}
        label='Zip'
        placeholder='Zip'
        name='zip'
        defaultValue={userData.address.zip}
        onChange={e => onChange(e)}
      />
      <Form.Field
        control={Checkbox}
        label='I agree to the Terms and Conditions'
      />
      <Form.Field
        control={Button}
        className='float-right'
        color='pink'
        onClick={e => {
          e.preventDefault();
          //addSchool(formData, history);
        }}
      >
        Save &amp; Continue
      </Form.Field>
    </Form>
  );

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history);
  };

  return <Fragment>{yourInfo}</Fragment>;
};

AddFormForm.propTypes = {
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
})(withRouter(AddChildForm));

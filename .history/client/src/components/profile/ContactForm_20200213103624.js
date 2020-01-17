import React, { useEffect, useState, Fragment } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import _ from 'lodash';

import {
  Input,
  Grid,
  Select,
  Radio,
  Form,
  Button,
  Checkbox
} from 'semantic-ui-react';

const ContactForm = ({ user }) => {
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
  const yourInfo = (
    <Form>
      <Form.Field
        control={Input}
        placeholder='Your Name'
        name='name'
        defaultValue={user.name}
        onChange={e => onChange(e)}
        required
      />
      <Form.Field
        control={Input}
        placeholder='Phone Number'
        name='phone'
        defaultValue={user.phone}
        onChange={e => onChange(e)}
        required
      />
      <Form.Field
        control={Input}
        placeholder='Street'
        name='street'
        defaultValue={user.address.street}
        onChange={e => onChange(e)}
      />
      <Form.Field
        control={Input}
        placeholder='Apt/Suite'
        name='suite'
        defaultValue={user.address.suite}
        onChange={e => onChange(e)}
      />
      <Form.Field
        control={Input}
        placeholder='City'
        name='city'
        defaultValue={user.address.city}
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
        placeholder='Zip'
        name='zip'
        defaultValue={user.address.zip}
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
          createProfile(formData, history);
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

ContactForm.propTypes = {
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
})(withRouter(ContactForm));

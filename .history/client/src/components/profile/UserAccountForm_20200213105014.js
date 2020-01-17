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

const UserAccountForm = ({ user }) => {
  const [user, setFormData] = useState({ user });

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
        control={Button}
        className='float-right'
        color='pink'
        onClick={e => {
          e.preventDefault();
          //createProfile(formData, history);
        }}
      >
        Save &amp; Continue
      </Form.Field>
    </Form>
  );

  const onChange = e =>
    setFormData({ ...user, [e.target.name]: e.target.value });

  return <Fragment>{yourInfo}</Fragment>;
};

UserAccountForm.propTypes = {
  user: PropTypes.object.isRequired
};

export default connect(null, {})(withRouter(UserAccountForm));

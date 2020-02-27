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

const UserAccountForm = ({ profileData }) => {
  //const [formData, setFormData] = useState({ user });

  const yourInfo = (
    <Form>
      <Form.Field
        control={Input}
        placeholder='Your Name'
        name='name'
        defaultValue={profileData.name}
        onChange={e => onChange(e)}
        required
      />
      <Form.Field
        control={Input}
        placeholder='Phone Number'
        name='phone'
        defaultValue={profileData.phone}
        onChange={e => onChange(e)}
        required
      />
      <Form.Field
        control={Input}
        placeholder='Street'
        name='street'
        defaultValue={profileData.street}
        onChange={e => onChange(e)}
      />
      <Form.Field
        control={Input}
        placeholder='Apt/Suite'
        name='suite'
        defaultValue={profileData.suite}
        onChange={e => onChange(e)}
      />
      <Form.Field
        control={Input}
        placeholder='City'
        name='city'
        defaultValue={profileData.city}
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
        name='zipcode'
        defaultValue={profileData.zip}
        onChange={e => onChange(e)}
      />
    </Form>
  );

  const onChange = e => {
    profileData[e.target.name] = e.target.value;
  };

  return <Fragment>{yourInfo}</Fragment>;
};

UserAccountForm.propTypes = {
  profileData: PropTypes.object.isRequired
};

export default connect(null, {})(withRouter(UserAccountForm));

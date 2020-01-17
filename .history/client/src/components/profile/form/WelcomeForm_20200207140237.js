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
  Checkbox,
  Search
} from 'semantic-ui-react';

const WelcomeForm = ({
  createProfile,
  getCurrentProfile,
  profile: { profile, loading },
  history,
  addSchool,
  isLoading
}) => {
  const [formData, setFormData] = useState({});
  const childData = {
    id: 2,
    childName: 'Leanne Graham',
    grade: 'Apt. 556',
    classroom: 'Gwenborough',
    school: {
      name: 'Kulas Light',
      street: 'Apt. 556',
      suite: 'Apt. 556',
      city: 'Apt. 556',
      state: 'California',
      zipcode: '92998-3874'
    }
  };
  /*   const childData = {
    id: 2,
    childName: '',
    grade: '',
    classroom: '',
    school: {
      name: '',
      street: '',
      suite: '',
      city: '',
      state: '',
      zipcode: ''
    }
  }; */

  const welcomInfo = (
    <article>
      <div>
        Welcome to your child\'s school community. Your first post to making a
        difference is just a minute away. Click on Please take a minute to view
        term and conditions.
      </div>
      <div class='ui checkbox'>
        <input type='checkbox' name='tandc' />
        <label>Terms and conditions</label>
      </div>
      <br />
      <Link to='/dashboard'>Go to dashboard</Link>
    </article>
  );

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history);
  };

  return <Fragment>{yourInfo}</Fragment>;
};

export default connect(null, {
  createProfile,
  getCurrentProfile
})(withRouter(WelcomeForm));

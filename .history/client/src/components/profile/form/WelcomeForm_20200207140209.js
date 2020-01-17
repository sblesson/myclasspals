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

  const yourInfo = (

  );

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history);
  };

  return <Fragment>{yourInfo}</Fragment>;
};

WelcomeForm.propTypes = {
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
})(withRouter(WelcomeForm));

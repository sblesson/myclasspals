import React, { useEffect, useState, Fragment } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import _ from 'lodash';

import { Form, Checkbox } from 'semantic-ui-react';

const WelcomeForm = () => {
  const welcomeInfo = (
    <article>
      <div>
        Welcome to your child\'s school community. Your first post to making a
        difference is just a minute away. Click on Please take a minute to view
        term and conditions.
      </div>
      <Form.Field
        control={Checkbox}
        label='I agree to the Terms and Conditions'
      />

      <Link to='/dashboard'>Go to dashboard</Link>
    </article>
  );

  return <Fragment>{welcomeInfo}</Fragment>;
};

export default connect(null, {
  createProfile,
  getCurrentProfile
})(withRouter(WelcomeForm));

import React, { Fragment } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';

import _ from 'lodash';

import { Form, Checkbox } from 'semantic-ui-react';

const WelcomeForm = () => {
  const welcomeInfo = (
    <article>
      <div>
        Welcome to class room &amp; school community of your child. Parenting is
        challenging, but you are not alone. Our mission is to connect families
        and build stronger community. Please take a minute to review term and
        conditions.
        <br />
        Enjoy!!
      </div>
      <Form.Field
        control={Checkbox}
        label='I agree to the Terms and Conditions'
      />

      <Link to='/dashboard'>Go to dashboard</Link>

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
    </article>
  );

  return <Fragment>{welcomeInfo}</Fragment>;
};

export default connect(null, {})(withRouter(WelcomeForm));

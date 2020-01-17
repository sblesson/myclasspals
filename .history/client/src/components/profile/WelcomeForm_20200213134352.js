import React, { Fragment } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';

import _ from 'lodash';

import { Form, Checkbox } from 'semantic-ui-react';

const WelcomeForm = profileData => {
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
      <Checkbox
        label={'I agree to the Terms and Conditions'}
        checked={this.state.cb2}
        name='isTandCAccepted'
        onChange={this.checkboxChangeHandler}
      />
      <Form.Field
        control={Checkbox}
        label='I agree to the Terms and Conditions'
        name='isTandCAccepted'
        onChange={e => onChange(e)}
      />

      <Link to='/dashboard'>Go to dashboard</Link>
    </article>
  );

  const checkboxChangeHandler = (event, data) => {
    //profileData[event.target.name] = event.checked;
    console.log(event);
    console.log(data);
  };

  return <Fragment>{welcomeInfo}</Fragment>;
};

export default connect(null, {})(withRouter(WelcomeForm));

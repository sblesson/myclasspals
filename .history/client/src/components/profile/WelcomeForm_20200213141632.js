import React, { Fragment } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { Button } from 'reactstrap';

import _ from 'lodash';

import { Form, Checkbox } from 'semantic-ui-react';

const WelcomeForm = ({ isAcceptedTandC }) => {
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
        checked={isTandCAccepted}
        name='isTandCAccepted'
        onChange={e => checkboxChangeHandler(e)}
      />

      <Link to='/dashboard'>Go to dashboard</Link>
    </article>
  );

  return <Fragment>{welcomeInfo}</Fragment>;
};
WelcomeForm.propTypes = {
  isAcceptedTandC: PropTypes.bool
};

export default WelcomeForm;

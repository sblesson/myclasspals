import React, { Fragment } from 'react';

import _ from 'lodash';

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
    </article>
  );

  return <Fragment>{welcomeInfo}</Fragment>;
};

export default WelcomeForm;

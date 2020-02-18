import React, { Fragment } from 'react';
import Footer from './Footer';

const FAQ = () => {
  return (
    <Fragment>
      <h1 className='large text-primary'>Frequently asked questions</h1>

      <p className='large'>Do I need to enter my child information?</p>
      <p className='large'>Is it safe?</p>
      <p className='large'>Privacy protection</p>
      <p className='large'>What happens when school year ends?</p>
      <p className='large'>How do we get help?</p>
      <Footer />
    </Fragment>
  );
};

export default FAQ;

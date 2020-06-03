import React from 'react';
import { Result } from 'antd';
import { Link } from 'react-router-dom';

const Page404 = () => {
  return (
    <Result
      status='500'
      title='500'
      subTitle='Sorry, something went wrong.'
      //extra={<Link to='/dashboard'>{'Home'}</Link>}
    />
  );
};

export default Page404;

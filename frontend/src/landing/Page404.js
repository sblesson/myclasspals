import React from 'react';
import { Result } from 'antd';
import { Link } from 'react-router-dom';

const Page404 = () => {
  return (
    <Result
      status='404'
      title='404'
      subTitle='Sorry, the page you visited does not exist.'
      //extra={<Link to='/dashboard'>{'Home'}</Link>}
    />
  );
};

export default Page404;
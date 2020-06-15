import React from 'react';
import { Result } from 'antd';
import { Link } from 'react-router-dom';

const Page403 = () => {
  return (
    <Result
      status='403'
      title='403'
      subTitle='Sorry, you are not authorized to access this page.'
      //extra={<Link to='/login'>{'Login'}</Link>}
    />
  );
};

export default Page403;

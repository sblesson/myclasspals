import React from 'react';
import { Result } from 'antd';
import { Link } from 'react-router-dom';

const Page401 = () => {
  return (
    <Result
      status='401'
      title='401'
      subTitle='Sorry, you are not authorized to access this page.'
      //extra={<Link to='/login'>{'Login'}</Link>}
    />
  );
};

export default Page401;

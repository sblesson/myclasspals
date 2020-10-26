import React from 'react';
import { Layout } from 'antd';

import CreateInviteForm from './CreateInviteForm';
const Invite = () => {
  const { Content } = Layout;

  return (
    <Content
      className='wrapper'
      style={{ width: '80%', margin: '2rem auto', padding: '2rem' }}
    >
      <CreateInviteForm />
    </Content>
  );
};

export default Invite;

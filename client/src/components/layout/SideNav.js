import React from 'react';
import { Menu } from 'antd';
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined
} from '@ant-design/icons';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

//import { useHistory } from 'react-router';

const SideNav = history => {
  //const history = useHistory();

  const handleUserClick = () => {
    history.push('/login');
  };

  const handleVideosClick = () => {
    history.push('/register');
  };

  const handleFileClick = () => {
    history.push('/');
  };

  return (
    <div>

      <Menu theme='dark' mode='inline' defaultSelectedKeys={['1']}>
        <Menu.Item key='1' onClick={handleUserClick}>
          <UserOutlined />
          <span> Users</span>
        </Menu.Item>
        <Menu.Item key='2' onClick={handleVideosClick}>
          <VideoCameraOutlined />
          <span> Videos</span>
        </Menu.Item>
        <Menu.Item key='3' onClick={handleFileClick}>
          <UploadOutlined />
          <span> Files</span>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default withRouter(SideNav);

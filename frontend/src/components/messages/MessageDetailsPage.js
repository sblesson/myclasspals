import React, { useEffect } from 'react';

import { PageHeader, Descriptions, Dropdown, Menu, Spin } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import Ellipsis from 'ant-design-pro/lib/Ellipsis';

import _ from 'lodash';
import MessageDetails from './MessageDetails';
import DeleteMessageModal from './modal/DeleteMessageModal';

import './MessageDetailsPage.scss';

const MessageDetailsPage = ({ isMobile, loading, currentPost, userEmail }) => {
  console.log(' MessageDetailsPage' + loading);
  useEffect(() => {
    return () => {
      //called when component is going to unmount
      currentPost = null;
    };
  }, [currentPost]);
  const menu = (
    <Menu>
      <Menu.Item>
        {' '}
        <DeleteMessageModal postType='message' />
      </Menu.Item>
    </Menu>
  );

  if (loading) {
    return <Spin />;
  } else {
    return (
      <div className='wrapper'>
        <PageHeader
          ghost={false}
          onBack={isMobile ? () => window.history.back() : false}
          title={
            <Ellipsis length={80} tooltip>
              {currentPost.subject}
            </Ellipsis>
          }
          subTitle={currentPost.description}
          extra={
            <Dropdown
              overlay={menu}
              placement='bottomCenter'
              className='ant-dropdown-link'
            >
              <EllipsisOutlined />
            </Dropdown>
          }
        >
          <MessageDetails currentMessage={currentPost} userEmail={userEmail} />
        </PageHeader>
      </div>
    );
  }
};

export default MessageDetailsPage;

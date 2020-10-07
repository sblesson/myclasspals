import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { PageHeader, Descriptions, Dropdown, Menu, Spin, Empty } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import Ellipsis from 'ant-design-pro/lib/Ellipsis';

import _ from 'lodash';
import MessageDetails from './MessageDetails';
import DeleteMessageModal from './modal/DeleteMessageModal';

import './MessageDetailsPage.scss';

const MessageDetailsPage = ({
  post: { currentPost },
  isMobile,
  loading,
  userEmail,
}) => {
  console.log(' MessageDetailsPage');
  console.log(currentPost);

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
  } else if (currentPost !== null) {
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
          <MessageDetails userEmail={userEmail} />
        </PageHeader>
      </div>
    );
  } else {
    return <Empty description={'Message not exist'} />;
  }
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, {})(MessageDetailsPage);

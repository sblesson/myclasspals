import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import { Avatar, Card, Menu, Dropdown, List, Typography } from 'antd';
import Ellipsis from 'ant-design-pro/lib/Ellipsis';

import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { deletePost } from '../../actions/post';
import DeletePostModal from './modal/DeletePostModal';
import { MessageOutlined } from '@ant-design/icons';

import './PostItem.scss';

const PostItem = ({
  style,
  post: {
    _id,
    userId,
    subject,
    message,
    userName,
    avatar,
    user,
    likes,
    thanks,
    groupId,
    comments,
    postedDate,
  },
  showActions,
  showAllComments,
  isSinglePost,
}) => {
  const { Paragraph } = Typography;

  const { Meta } = Card;

  const firstLetterUserName = (userName) => {
    if (typeof userName !== 'string') return '';
    return userName.charAt(0).toUpperCase();
  };

  const onClick = (key) => {
    if (key === 'deletepost') {
    } else if (key === 'editpost') {
    }
  };

  const menu = (
    <Menu onClick={onClick}>
      <Menu.Item key='deletepost'>
        {' '}
        <DeletePostModal postId={_id} postType='post' />
      </Menu.Item>
      <Menu.Item key='editpost'>Edit</Menu.Item>
    </Menu>
  );
  const allComments = comments !== null && comments && comments.length > 0 && (
    <List
      itemLayout='horizontal'
      dataSource={comments}
      style={{ overflow: 'hidden' }}
      renderItem={(comment) => (
        <CommentItem
          key={comment._id}
          comment={comment}
          postId={_id}
          groupId={groupId}
          isSinglePost={isSinglePost}
        />
      )}
    />
  );
  const IconText = ({ icon, text }) => (
    <Link to={`/posts/${_id}/${groupId}`}>
      {' '}
      {React.createElement(icon)}{' '}
      <span className='comment-count-text'>
        {comments.length > 1
          ? `${comments.length} comments`
          : `${comments.length} comment`}
      </span>
    </Link>
  );

  const lastThreeComments = comments !== null &&
    comments &&
    comments.length > 0 && (
      <List
        itemLayout='horizontal'
        dataSource={comments.slice(-3)}
        style={{ overflow: 'hidden' }}
        renderItem={(comment) => (
          <CommentItem
            key={comment._id}
            comment={comment}
            postId={_id}
            groupId={groupId}
            isSinglePost={isSinglePost}
          />
        )}
      />
    );

  return (
    <div className='feed' style={{ width: '100%' }}>
      <Card
        className={isSinglePost ? 'single-feed-card' : 'feed-card'}
        title={
          <Link to={`/profile/${groupId}/${userId}`}>
            <Meta
              avatar={
                <Avatar className='avatar-icon' size='large'>
                  {userId.charAt(0)}
                </Avatar>
              }
              title={<span className='feed-author-title'>{userId}</span>}
              description={
                <div className='feed-author-time'>
                  <Moment fromNow ago>
                    {postedDate}
                  </Moment>
                </div>
              }
            />
          </Link>
        }
        extra={
          <Dropdown overlay={menu} placement='bottomCenter'>
            <a
              className='ant-dropdown-link'
              onClick={(e) => e.preventDefault()}
            >
              <EllipsisOutlined />
            </a>
          </Dropdown>
        }
      >
        <Link className='feed-title' to={`/posts/${_id}/${groupId}`}>
          <Meta
            title={
              <Ellipsis length={100} tooltip>
                {subject}
              </Ellipsis>
            }
          />
        </Link>
        <Paragraph ellipsis={{ rows: 2, expandable: true, symbol: 'more' }}>
          {message}
        </Paragraph>

        {comments && comments.length > 0 ? (
          <IconText icon={MessageOutlined} key='list-vertical-message' />
        ) : (
          ''
        )}
        {showActions && (
          <div style={{ marginBottom: '2rem' }}>
            {showAllComments ? allComments : lastThreeComments}
            <CommentForm
              postId={_id}
              groupId={groupId}
              userId={userId}
              userName={userName}
              isSinglePost={isSinglePost}
            />{' '}
          </div>
        )}
      </Card>
    </div>
  );
};

PostItem.defaultProps = {
  showActions: true,
  showAllComments: false,
  isSinglePost: false,
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  showActions: PropTypes.bool,
  showAllComments: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(PostItem);

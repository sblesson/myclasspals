import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Avatar, Button, Dropdown, Menu, List } from 'antd';
import Ellipsis from 'ant-design-pro/lib/Ellipsis';

import DeleteCommentModal from './modal/DeletePostModal';
import { EllipsisOutlined } from '@ant-design/icons';

const CommentItem = ({
  postId,
  comment: { _id, message, userName, avatar, user, postedDate, subject },
  isSinglePost
}) => {
  const firstLetterUserName = userName => {
    if (typeof userName !== 'string') return '';
    return userName.charAt(0).toUpperCase();
  };
  const menu = (
    <Menu>
      <Menu.Item key='deletepost'>
        {' '}
        <DeleteCommentModal
          postId={postId}
          commentId={_id}
          postType='comment'
          isSinglePost={isSinglePost}
        />
      </Menu.Item>
    </Menu>
  );
  return (
    <List.Item
      className='feed-comment'
      actions={[
        <Dropdown overlay={menu} placement='bottomCenter'>
          <a className='ant-dropdown-link' onClick={e => e.preventDefault()}>
            <EllipsisOutlined />
          </a>
        </Dropdown>
      ]}
    >
      <List.Item.Meta
        avatar={
          <Link to={`/profile/${_id}`}>
            <Avatar
              style={{
                backgroundColor: '#00a2ae',
                verticalAlign: 'middle'
              }}
              shape='circle'
              size='small'
            >
              {firstLetterUserName(userName)}
            </Avatar>
          </Link>
        }
        title={subject}
        description={
          <Ellipsis length={200} tooltip>
            {message}
          </Ellipsis>
        }
      />
    </List.Item>
  );
};

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired
};

export default CommentItem;

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Avatar, Card, Dropdown, Menu, List } from 'antd';
import Ellipsis from 'ant-design-pro/lib/Ellipsis';

import DeleteCommentModal from './modal/DeletePostModal';
import { EllipsisOutlined } from '@ant-design/icons';
import './PostItem.scss';

const CommentItem = ({
  postId,
  comment: { _id, message, userName, userId, avatar, postedDate, subject },
  isSinglePost,
}) => {
  const { Meta } = Card;

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
          <a className='ant-dropdown-link' onClick={(e) => e.preventDefault()}>
            <EllipsisOutlined />
          </a>
        </Dropdown>,
      ]}
    >
      <Meta
        avatar={
          <Avatar className='avatar-icon' size='small'>
            {userId.charAt(0)}
          </Avatar>
        }
        description={
          <div>
            <Link to={`/profile/${postId}/${userId}`}>
              <span className='feed-author-title'>{userName}</span>
            </Link>
            <div className='feed-author-time'>
              <Moment fromNow ago>
                {postedDate}
              </Moment>
              {' ago'}
            </div>
            <Ellipsis length={200} tooltip>
              {message}
            </Ellipsis>
          </div>
        }
      />
    </List.Item>
  );
};

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
};

export default CommentItem;

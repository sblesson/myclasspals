import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { Avatar, Button, Dropdown, Menu, List } from 'antd';
import Ellipsis from 'ant-design-pro/lib/Ellipsis';

import { deleteComment, deleteSinglePostComment } from '../../actions/post';
import DeleteCommentModal from './modal/DeletePostModal';
import { EllipsisOutlined } from '@ant-design/icons';
const CommentItem = ({
  postId,
  comment: { _id, message, userName, avatar, user, postedDate },
  auth,
  deleteComment,
  isSinglePost,
  deleteSinglePostCommenš
}) => {
  const firstLetterUserName = userName => {
    if (typeof userName !== 'string') return '';
    return userName.charAt(0).toUpperCase();
  };
  const menu = (
    <Menu>
      <Menu.Item key='deletepost'>
        {' '}
        <DeleteCommentModal postId={_id} postType='comment' />
      </Menu.Item>
      <Menu.Item key='editpost'>Edit</Menu.Item>
    </Menu>
  );
  return (
    <List.Item className='feed-comment'>
      <List.Content floated='right'>
        <Dropdown overlay={menu} placement='bottomCenter'>
          <a className='ant-dropdown-link' onClick={e => e.preventDefault()}>
            <EllipsisOutlined />
          </a>
        </Dropdown>{' '}
      </List.Content>
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

      <div className='comment-author'>
        <span className='comment-author-title'>{userName}</span>
        <div className='comment-author-time'>
          <Moment fromNow ago>
            {postedDate}
          </Moment>
        </div>
      </div>

      <List.Content>
        <List.Description style={{ marginTop: 8 }}>
          <Ellipsis length={200} tooltip>
            {message}
          </Ellipsis>
        </List.Description>
      </List.Content>
    </List.Item>
  );
};

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
  deleteSinglePostComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {
  deleteComment,
  deleteSinglePostComment
})(CommentItem);

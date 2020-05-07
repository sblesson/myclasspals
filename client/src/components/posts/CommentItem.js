import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { Avatar, Card } from 'antd';
import Ellipsis from 'ant-design-pro/lib/Ellipsis';

import { deleteComment, deleteSinglePostComment } from '../../actions/post';
import { Image, List, Button } from 'semantic-ui-react';

const CommentItem = ({
  postId,
  comment: { _id, message, userName, avatar, user, postedDate },
  auth,
  deleteComment,
  isSinglePost,
  deleteSinglePostComment
}) => {
  const firstLetterUserName = userName => {
    if (typeof userName !== 'string') return '';
    return userName.charAt(0).toUpperCase();
  };
  return (
    <List.Item>
      <List.Content floated='right'>
        {!auth.loading && user === auth.user._id && (
          <Button
            onClick={() => {
              if (isSinglePost) {
                deleteSinglePostComment(postId, _id);
              } else {
                //deleting from dashboard
                deleteComment(postId, _id);
              }
            }}
            type='button'
            content='Delete'
            color='pink'
            size='tiny'
          ></Button>
        )}
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

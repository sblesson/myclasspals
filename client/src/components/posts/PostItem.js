import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import { Avatar, Card } from 'antd';
import Ellipsis from 'ant-design-pro/lib/Ellipsis';
import { Menu, List, Button, Image } from 'semantic-ui-react';

import { addLike, removeLike, deletePost } from '../../actions/post';
import './PostItem.scss';

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: {
    _id,
    subject,
    message,
    userName,
    avatar,
    user,
    likes,
    thanks,
    comments,
    postedDate
  },
  showActions,
  showAllComments,
  isSinglePost
}) => {
  const [isLiked, setLike] = useState(false);

  const toggleLike = _id => {
    setLike(!isLiked);

    if (isLiked) {
      addLike(_id);
    } else {
      removeLike(_id);
    }
  };
  const firstLetterUserName = userName => {
    if (typeof userName !== 'string') return '';
    return userName.charAt(0).toUpperCase();
  };

  return (
    <div className='feed'>
      <List.Item>
        <List.Content floated='right'>
          {!auth.loading && user === auth.user._id && (
            <Button
              onClick={() => deletePost(_id)}
              type='button'
              content='Delete'
              className='btn btn-danger'
              size='tiny'
            ></Button>
          )}
        </List.Content>
        <List.Content>
          <List.Header>
            <Link to={`/profile/${_id}`}>
              {' '}
              <Avatar
                style={{
                  backgroundColor: '#00a2ae',
                  verticalAlign: 'middle'
                }}
                shape='circle'
                size='64'
              >
                {firstLetterUserName(userName)}
              </Avatar>
              <div className='feed-author'>
                <span className='feed-author-title'>{userName}</span>
                <div className='feed-author-time'>
                  <Moment fromNow ago>
                    {postedDate}
                  </Moment>
                </div>
              </div>
            </Link>
          </List.Header>
          <List.Header style={{ marginTop: 8 }}>
            <Link className='feed-title' to={`/posts/${_id}`}>
              <Ellipsis length={100} tooltip>
                {subject}
              </Ellipsis>
            </Link>
          </List.Header>

          <List.Description style={{ marginTop: 8 }}>
            <Ellipsis length={200} tooltip>
              {message}
            </Ellipsis>
          </List.Description>
        </List.Content>
      </List.Item>

      {showActions && (
        <Fragment>
          <Menu>
            <Menu.Item name='thank' onClick={() => toggleLike(_id)}>
              <i className='far fa-smile'></i>&nbsp;&nbsp; Thank
            </Menu.Item>
            <Menu.Item name='Comment' onClick={() => toggleLike(_id)}>
              <i className='far fa-comment-alt'></i>&nbsp;&nbsp;Comment
            </Menu.Item>

            <Menu.Menu position='right'>
              {likes && likes.length > 0 && (
                <Menu.Item name='thanked'>
                  <i className='far fa-smile'></i> &nbsp;&nbsp;{likes.length}
                </Menu.Item>
              )}
              {comments && comments.length > 0 && (
                <Menu.Item name='commented'>
                  <i className='far fa-comment-alt'></i>&nbsp;&nbsp;
                  {comments.length}
                </Menu.Item>
              )}
            </Menu.Menu>
          </Menu>
          {showAllComments === true ? (
            <List divided relaxed>
              {comments && comments.length > 0 ? (
                comments.map(comment => (
                  <CommentItem
                    key={comment._id}
                    comment={comment}
                    postId={_id}
                    isSinglePost={isSinglePost}
                  />
                ))
              ) : (
                <hr />
              )}
            </List>
          ) : (
            <List divided relaxed>
              {comments && comments.length > 0 ? (
                comments
                  .slice(comments.length - 3, comments.length)
                  .map(comment => (
                    <CommentItem
                      key={comment._id}
                      comment={comment}
                      postId={_id}
                    />
                  ))
              ) : (
                <hr />
              )}
            </List>
          )}
          <CommentForm postId={_id} isSinglePost={isSinglePost} />{' '}
        </Fragment>
      )}
    </div>
  );
};

PostItem.defaultProps = {
  showActions: true,
  showAllComments: false,
  isSinglePost: false
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  showActions: PropTypes.bool,
  showAllComments: PropTypes.bool
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);

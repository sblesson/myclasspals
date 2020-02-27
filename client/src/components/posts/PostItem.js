import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import { Menu, Segment, List, Button, Image } from 'semantic-ui-react';

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
    name,
    avatar,
    user,
    likes,
    thanks,
    comments,
    date
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
  return (
    <Segment className='post bg-white p-1'>
      <List.Item>
        <Image avatar src={avatar} />
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
            <Link to={`/profile/${_id}`}>{name}</Link>
          </List.Header>
          <List.Header>
            <Link to={`/posts/${_id}`}>{subject}</Link>
          </List.Header>

          <List.Description>
            {message}
            <p className='post-date'>
              Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
            </p>
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
              {likes.length > 0 && (
                <Menu.Item name='thanked'>
                  <i className='far fa-smile'></i> &nbsp;&nbsp;{likes.length}
                </Menu.Item>
              )}
              {comments.length > 0 && (
                <Menu.Item name='commented'>
                  <i className='far fa-comment-alt'></i>&nbsp;&nbsp;
                  {comments.length}
                </Menu.Item>
              )}
            </Menu.Menu>
          </Menu>
          {showAllComments === true ? (
            <List divided relaxed>
              {comments.length > 0 ? (
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
              {comments.length > 0 ? (
                comments
                  .slice(0, 3)
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
    </Segment>
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

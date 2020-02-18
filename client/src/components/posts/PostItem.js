import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

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
  showActions
}) => (
  <div className='post bg-white p-1'>
    <div className='row'>
      <Link to={`/profile/${user}`}>
        <div className='avatar-container'>
          <img className='avatar-img' src={avatar} alt='' />
          <span className='author-name'>{name}</span>
        </div>
      </Link>
    </div>
    <div className='post-message-container'>
      <div className='post-content-wrapper'>
        <Link to={`/posts/${_id}`} className='post-message-title-container'>
          <h5 className='post-heading'>{subject}</h5>
        </Link>

        <p className='my-1 post-message'>{message}</p>
        <div className='post-date'>
          Posted on <Moment format='LLLL'>{date}</Moment>
        </div>

        <div className='action-status-container'>
          {/*  <div className='action-status-item-container'>
          {likes.length > 0 && <span>{likes.length} Agreed</span>}
        </div> */}
          <div className='action-status-item-container'>
            {likes.length > 0 && <span>{likes.length} Thanked</span>}
          </div>
          <div className='action-status-item-container'>
            {comments.length > 0 && (
              <span className='comment-count'>{comments.length} commented</span>
            )}
          </div>
        </div>
      </div>

      {showActions && (
        <Fragment>
          {/*         <div
            className='action-item-container m-left-minus-5'
            onClick={() => addLike(_id)}
          >
            <i className='fas fa-thumbs-up' />
            <span className='action-label'>Agree</span>
          </div> */}
          <div
            className='action-item-container'
            onClick={() => removeLike(_id)}
          >
            <i className='far fa-smile'></i>
            <span className=' action-label'>Thank</span>
          </div>
          <div className='action-item-container' onClick={() => addLike(_id)}>
            <i className='fas fa-comments m-left'></i>

            <span className='action-label'>Comment</span>
          </div>
          <div className='comments'>
            {comments.map(comment => (
              <CommentItem key={comment._id} comment={comment} postId={_id} />
            ))}
          </div>

          <CommentForm postId={_id} />

          {!auth.loading && user === auth.user._id && (
            <button
              onClick={() => deletePost(_id)}
              type='button'
              className='btn btn-danger'
            >
              <i className='fas fa-times' />
            </button>
          )}
        </Fragment>
      )}
    </div>
  </div>
);

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  showActions: PropTypes.bool
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);

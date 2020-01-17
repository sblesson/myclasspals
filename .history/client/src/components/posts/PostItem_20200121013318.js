import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';
import './PostItem.scss';

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, text, name, avatar, user, likes, thanks, comments, date },
  showActions
}) => (
  <div className='post bg-white p-1 my-1'>
    <div className='row'>
      <Link to={`/profile/${user}`}>
        <div className='avatar-container'>
          <img className='avatar-img' src={avatar} alt='' />
          <span className='author-name'>{name}</span>
        </div>
      </Link>
    </div>
    <div className='post-message-container'>
      <Link to={`/posts/${_id}`} className='post-message-title-container'>
        <h5 className='content-title'>Looking for Indian cook</h5>
      </Link>
      <p className='my-1'>heading</p>

      <p className='my-1'>{text}</p>
      <div className='post-date'>
        Posted on <Moment format='LLLL'>{date}</Moment>
      </div>

      <div className='action-status'>
        <div className='inline-container'>
          {likes.length > 0 && <span>{likes.length} Agreed</span>}
        </div>
        <div className='inline-container'>
          {thanks.length > 0 && <span>{thanks.length} Thanked</span>}
        </div>
        <div className='inline-container'>
          {comments.length > 0 && (
            <span className='comment-count'>{comments.length} commented</span>
          )}
        </div>
      </div>

      {showActions && (
        <Fragment>
          <div className='inline-container' onClick={() => addLike(_id)}>
            <i className='fas fa-thumbs-up' />
            <span className='m-left-5'>Agree</span>
          </div>
          <div className='inline-container' onClick={() => removeLike(_id)}>
            <i className='fas fa-hands-helping'></i>
            <span className='m-left-5'>Thank</span>
          </div>
          <div className='inline-container' onClick={() => addLike(_id)}>
            <i class='fas fa-comments m-left'></i>

            <span className='m-left-5'>Comment</span>
          </div>
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

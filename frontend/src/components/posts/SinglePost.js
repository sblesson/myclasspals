import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../../layout/Spinner';
import PostItem from './PostItem';
import { getPost } from '../../actions/post';

const SinglePost = ({ getPost, post: { currentPost, loading }, match }) => {
  let groupId = null;
  useEffect(() => {
    getPost(match.params.id);
    groupId = match.params.groupId;
  }, [getPost, match]);

  return loading || currentPost === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link
        to={`/dashboard/${match.params.groupId}`}
        style={{ fontSize: '0.750rem', cursor: 'pointer' }}
      >
        Back To Posts
      </Link>
      <PostItem
        post={currentPost}
        showActions={true}
        showAllComments={true}
        isSinglePost={true}
      />
    </Fragment>
  );
};

SinglePost.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPost })(SinglePost);

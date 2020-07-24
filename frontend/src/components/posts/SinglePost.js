import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../../layout/Spinner';
import PostItem from './PostItem';
import { getPost } from '../../actions/post';
import { LeftCircleOutlined } from '@ant-design/icons';

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
        style={{
          fontSize: '1rem',
          marginLeft: '1rem',
          marginTop: '1rem',
          cursor: 'pointer',
          display: 'inline-block'
        }}
      >
        <LeftCircleOutlined />
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

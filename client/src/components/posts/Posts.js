import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../../layout/Spinner';
import PostItem from '../posts/PostItem';
import { List } from 'antd';

const Posts = ({ post: { posts, categories, loading } }) => {
  return (
    <Fragment>
      {posts.loading ? (
        <Spinner />
      ) : (
        <List
          itemLayout='horizontal'
          dataSource={posts}
          style={{ overflow: 'hidden' }}
          renderItem={item => <PostItem post={item} />}
        />
      )}
    </Fragment>
  );
};

Posts.propTypes = {
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, {})(Posts);

import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import PostModal from '../modal/post/PostModal';
import { getPosts, getPostCategories } from '../../actions/post';
import LeftNav from '../leftnav/LeftNav';
import './Posts.scss';
const Posts = ({ getPosts, getPostCategories, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
    getPostCategories();
  }, [getPosts]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='row'>
        <LeftNav />

        <div id='main'>
          <article>
            <PostModal />
            <div className='posts'>
              {posts.map(post => (
                <PostItem key={post._id} post={post} />
              ))}
            </div>
          </article>
        </div>
      </div>
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPosts, getPostCategories })(Posts);

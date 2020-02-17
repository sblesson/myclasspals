import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
<<<<<<< HEAD
import PostModal from '../modal/post/PostModal';
import { getPosts, getPostCategories } from '../../actions/post';
import LeftNav from '../leftnav/LeftNav';
import './Posts.scss';
const Posts = ({ getPosts, getPostCategories, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
    getPostCategories();
=======
import PostForm from './PostForm';
import { getPosts } from '../../actions/post';
import SideNav from '../sidenav/SideNav';
import './Posts.scss';
const Posts = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
>>>>>>> 54881ad2f7c207c5f89b336585b0b07518654a00
  }, [getPosts]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='row'>
<<<<<<< HEAD
        <LeftNav />

        <div id='main'>
          <article>
            <PostModal />
=======
        <div className='col-2'>
          <SideNav />
        </div>
        <article class='post-container'>
          <div className='col-10'>
            <h1 className='large text-primary'>Posts</h1>
            <p className='lead'>
              <i className='fas fa-user' /> Welcome to the community
            </p>
            <PostForm />
>>>>>>> 54881ad2f7c207c5f89b336585b0b07518654a00
            <div className='posts'>
              {posts.map(post => (
                <PostItem key={post._id} post={post} />
              ))}
            </div>
<<<<<<< HEAD
          </article>
        </div>
=======
          </div>
        </article>
>>>>>>> 54881ad2f7c207c5f89b336585b0b07518654a00
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

<<<<<<< HEAD
export default connect(mapStateToProps, { getPosts, getPostCategories })(Posts);
=======
export default connect(mapStateToProps, { getPosts })(Posts);
>>>>>>> 54881ad2f7c207c5f89b336585b0b07518654a00

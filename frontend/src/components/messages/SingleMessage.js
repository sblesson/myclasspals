import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import MessageDetailsPage from './MessageDetailsPage';

import { getPost } from '../../actions/post';

const SingleMessage = ({ post, getPost, auth, history, match }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const isCurrent = useRef(true);
  let messageId;

  useEffect(() => {
    return () => {
      //called when component is going to unmount
      isCurrent.current = false;
    };
  }, []);

  useEffect(() => {
    if (match && match.params && match.params.id) {
      messageId = match.params.id;
      //user clicked on another group from dashboard leftnav groups menu,
      //get messageId from params
      if (isCurrent.current) {
        post.loading = true;
        getPost(messageId, (cancelTokenSrc) => {
          post.loading = false;
          cancelTokenSrc.cancel();
        });
      }
    }

    return () => {
      //todo
    };
  }, [getPost, match]);

  //For single message view, if page expands show message list and message
  useEffect(() => {
    if (!isMobile && match && match.params && match.params.id) {
      messageId = match.params.id;

      history.push('/messages/' + messageId);
    }
  }, [isMobile, match]);

  return (
    <>
      {post && post.loading ? (
        <Spin />
      ) : (
        <div style={{ display: 'flex' }}>
          {post !== null && post.currentPost && (
            <MessageDetailsPage
              loading={post.loading}
              isMobile={isMobile}
              currentPost={post.currentPost}
              userEmail={auth.user.email}
            ></MessageDetailsPage>
          )}
        </div>
      )}
    </>
  );
};

SingleMessage.propTypes = {
  getPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getPost,
})(SingleMessage);

import React from 'react';
import { connect } from 'react-redux';

import MessageList from './MessageList';

const MessagesSider = React.memo(
  ({ post, messageUrl, userEmail }) => {
    console.log(post.currentPost);
    return (
      <div className='sider'>
        {post && post.messages && post.messages.length > 0 && (
          <MessageList
            messages={post.messages}
            messageUrl={messageUrl}
            userEmail={userEmail}
          />
        )}
      </div>
    );
  },
  (prevProps, nextProps) => {
    if (prevProps.messageUrl !== nextProps.messageUrl) {
      return false;
    } else if (
      prevProps.post &&
      prevProps.post.currentPost &&
      nextProps.post.currentPost &&
      prevProps.post.currentPost._id !== nextProps.post.currentPost._id
    ) {
      return false;
    } else {
      return true;
    }
  }
);

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, {})(MessagesSider);

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment, addCommentToSinglePost } from '../../actions/post';
import { Button } from 'antd';

import './CommentItem.scss';

const CommentForm = ({
  postId,
  isSinglePost,
  addComment,
  addCommentToSinglePost
}) => {
  const [text, setText] = useState('');
  const keyPress = e => {
    if (e.keyCode == 13) {
      onChatFormSubmit(e);
    }
  };
  const onChatFormSubmit = e => {
    e.preventDefault();
    if (text) {
      if (isSinglePost) {
        addCommentToSinglePost(postId, { text });
      } else {
        addComment(postId, text);
      }
      setText('');
    }
  };
  return (
    <div className='comment-form'>
      <form
        className='form my-1'
        onSubmit={e => {
          onChatFormSubmit(e);
        }}
      >
        <textarea
          name='message'
          className='comment-text'
          placeholder='Write a comment...'
          style={{
            borderRadius: '40px',
            height: '35px',
            padding: '8px',
            overflow: 'hidden'
          }}
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => setText(e.target.value)}
          required
        />
        <Button
          htmlType='button'
          onClick={onChatFormSubmit}
          type='primary'
          style={{ float: 'right', marginTop: 5 }}
          className='btn-primary reply-btn'
        >
          Send
        </Button>
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  isSinglePost: PropTypes.bool.isRequired,
  addComment: PropTypes.func.isRequired,
  addCommentToSinglePost: PropTypes.func.isRequired
};

export default connect(null, { addComment, addCommentToSinglePost })(
  CommentForm
);

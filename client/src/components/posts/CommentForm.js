import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment, addCommentToSinglePost } from '../../actions/post';
import { Button } from 'semantic-ui-react';

import './CommentItem.scss';

const CommentForm = ({
  postId,
  isSinglePost,
  addComment,
  addCommentToSinglePost
}) => {
  const [text, setText] = useState('');

  return (
    <div className='comment-form'>
      <form
        className='form my-1'
        onSubmit={e => {
          e.preventDefault();
          if (isSinglePost) {
            addCommentToSinglePost(postId, { text });
          } else {
            addComment(postId, text);
          }
          setText('');
        }}
      >
        <textarea
          name='message'
          className='comment-text'
          placeholder='Write a comment...'
          value={text}
          onChange={e => setText(e.target.value)}
          required
        />
        <Button
          type='submit'
          content='Reply'
          color='pink'
          className='reply-btn'
          size='tiny'
        ></Button>
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

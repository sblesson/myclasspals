import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';
import { Button } from 'semantic-ui-react';

import './CommentItem.scss';

const CommentForm = ({ postId, addComment }) => {
  const [text, setText] = useState('');

  return (
    <div className='comment-form'>
      <form
        className='form my-1'
        onSubmit={e => {
          e.preventDefault();
          addComment(postId, { text });
          setText('');
        }}
      >
        <textarea
          name='text'
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
  addComment: PropTypes.func.isRequired
};

export default connect(null, { addComment })(CommentForm);

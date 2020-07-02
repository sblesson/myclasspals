import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment, addCommentToSinglePost } from '../../actions/post';
import { Button } from 'antd';

import './CommentItem.scss';

const CommentForm = ({
  postId,
  groupId,
  userId,
  userName,
  isSinglePost,
  addComment,
  addCommentToSinglePost
}) => {
  const [formData, setFormData] = useState({
    message: '',
    groupId: groupId,
    userId: userId,
    userName: userName
  });

  const [text, setText] = useState('');
  const keyPress = e => {
    if (e.keyCode == 13) {
      onChatFormSubmit(e);
    }
  };
  const onChatFormSubmit = e => {
    e.preventDefault();
    if (formData.message) {
      if (isSinglePost) {
        addCommentToSinglePost(postId, formData);
      } else {
        addComment(postId, formData);
      }
      setFormData({ ...formData, ['message']: '' });
    }
  };
  return (
    <div className='comment-form'>
      <form
        onSubmit={e => {
          onChatFormSubmit(e);
        }}
      >
        <textarea
          name='message'
          className='form-control comment-rounded-textarea '
          rows='2'
          placeholder='Write a comment...'
          value={formData.message}
          
          onChange={e =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
          onKeyDown={e =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
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

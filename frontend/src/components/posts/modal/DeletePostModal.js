import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { deletePost, deleteComment } from '../../../actions/post';
import { Modal } from 'antd';

import _ from 'lodash';

const DeletePostModal = ({
  deletePost,
  deleteComment,
  postId,
  postType,
  commentId,
  isSinglePost,
  post,
}) => {
  const [headerTitle, setHeaderTitle] = useState("Please don't delete me!");

  const [visible, setModalVisibility] = useState(false);

  const showModal = () => {
    setModalVisibility(true);
  };

  const hideModal = () => {
    setModalVisibility(false);
  };
  const toggleModal = () => {
    setModalVisibility(!visible);
  };
  const handleDelete = () => {
    if (postType === 'comment') {
      deleteComment(postId, commentId, isSinglePost);
    } else if (postId) {
      deletePost(postId);
    } else if (post && post.currentPost && post.currentPost._id) {
      deletePost(post.currentPost._id);
    }
    hideModal();
    if (window.location.href.indexOf('dashboard') == -1) {
      //if deleting post from single post page
      let groupId = window.location.pathname.split('/').pop();

      window.location.href = `/dashboard/${groupId}`;
    }
  };
  return (
    <div>
      <div className='account-info-action-container' onClick={toggleModal}>
        <div className='account-info-delete-button-right'>
          <span>Delete</span>
        </div>
      </div>
      <Modal
        title={headerTitle}
        centered
        visible={visible}
        okButtonProps={{ danger: true }}
        onOk={handleDelete}
        okText='Delete'
        onCancel={toggleModal} //pass close logic here
        destroyOnClose={true}
        cancelButtonProps={{ style: { display: 'none' } }}
        destroyOnClose={true}
      >
        <div>
          Deleting this {postType} will removes it forever. Are you sure you
          want to delete?
        </div>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, {
  deletePost,
  deleteComment,
})(DeletePostModal);

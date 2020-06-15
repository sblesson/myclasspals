import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { deletePost } from '../../../actions/post';
import { Modal } from 'antd';

import _ from 'lodash';

const DeletePostModal = ({ deletePost, postId, postType }) => {
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
    deletePost(postId);
    hideModal();
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
        onOk={handleDelete}
        okText='Delete'
        onCancel={toggleModal} //pass close logic here
        destroyOnClose={true}
        cancelButtonProps={{ style: { display: 'none' } }}
        destroyOnClose={true}
      >
        <div>
          'Deleting this {postType} will removes it forever. Are you sure you
          want to delete?'
        </div>
      </Modal>
    </div>
  );
};

export default connect(null, { deletePost })(DeletePostModal);

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { deleteAccount } from '../../../actions/profile';
import { Modal } from 'antd';

import _ from 'lodash';

const DeleteAccountModal = ({ deletePost, postId, postType }) => {
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
    deleteAccount();
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
          "Are you sure you want to delete this account? You won't be able to
          access this account after this action. Remember, this action CANNOT be
          undone!"
        </div>
      </Modal>
    </div>
  );
};

export default connect(null, { deleteAccount })(DeleteAccountModal);

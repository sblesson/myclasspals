import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { deleteUser, logout } from '../../../../actions/auth';
import { Modal } from 'antd';

import _ from 'lodash';
import './AccountModal.scss';

const DeleteAccountModal = ({ deleteUser, logout, auth }) => {
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
    deleteUser(auth.user.email);
    hideModal();
    logout();
    window.location.href = '/login';
  };
  return (
    <div>
      <div className='account-info-action-container' onClick={toggleModal}>
        <div className='account-info-delete-link'>
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

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { deleteUser, logout })(
  DeleteAccountModal
);

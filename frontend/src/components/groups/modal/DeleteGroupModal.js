import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { deleteGroup } from '../../../actions/group';
import { Modal } from 'antd';

import _ from 'lodash';

const DeleteGroupModal = ({ deleteGroup, groupId }) => {
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
    deleteGroup(groupId);
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
          Deleting this grouop will removes it forever. Are you sure you want to
          delete?
        </div>
      </Modal>
    </div>
  );
};

const mapStateToProps = state => ({
  group: state.group
});

export default connect(mapStateToProps, {
  deleteGroup
})(DeleteGroupModal);

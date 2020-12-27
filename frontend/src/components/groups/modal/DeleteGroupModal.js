import React, { useState } from 'react';
import { connect } from 'react-redux';
import { deleteGroup } from '../../../actions/group';
import { Modal } from 'antd';

import _ from 'lodash';
import './DeleteGroupModal.scss';

const DeleteGroupModal = ({ deleteGroup, groupId, group }) => {
  const [headerTitle, setHeaderTitle] = useState("Please don't delete me!");

  const [visible, setModalVisibility] = useState(false);

  const hideModal = () => {
    setModalVisibility(false);
  };
  const toggleModal = () => {
    setModalVisibility(!visible);
  };
  const handleDelete = () => {
    deleteGroup(groupId, () => {
      console.log(group.useGroup);
      console.log(group.currentGroup);
      console.log('evenry deleted');
    });
    hideModal();
  };
  return (
    <>
      <div className='delete-group-modal' onClick={toggleModal}>
        <span>Delete</span>
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
        className='delete-group-modal'
      >
        <div>
          Deleting this group will removes it forever. Are you sure you want to
          delete?
        </div>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => ({
  group: state.group,
});
export default connect(mapStateToProps, {
  deleteGroup,
})(DeleteGroupModal);

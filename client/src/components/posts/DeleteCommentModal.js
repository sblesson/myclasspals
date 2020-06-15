import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { deleteComment, deleteSinglePostComment } from '../../actions/post';

import _ from 'lodash';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const DeleteCommentModal = ({
  deleteComment,
  deleteSinglePostComment,
  isSinglePost,
  postId,
  commentId
}) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <div className='account-info-action-container' onClick={toggle}>
        <div className='account-info-delete-button-right'>
          <span>Delete</span>
        </div>
      </div>
      <Modal isOpen={modal} fade={false} toggle={toggle}>
        <ModalHeader toggle={toggle}>{"Please don't delete me!"}</ModalHeader>
        <ModalBody>
          {
            'Deleting this comment will removes it forever. Are you sure you want to delete?'
          }
        </ModalBody>
        <ModalFooter>
          <Button
            color='danger'
            onClick={e => {
              e.preventDefault();
              if (isSinglePost) {
                deleteSinglePostComment(postId, commentId);
              } else {
                deleteComment(postId, commentId);
              }
            }}
          >
            Delete
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default connect(null, { deleteComment, deleteSinglePostComment })(
  DeleteCommentModal
);

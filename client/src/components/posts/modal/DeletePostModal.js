import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { deletePost } from '../../../actions/post';

import _ from 'lodash';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

//import './AccountModal.scss';

const DeleteAccountModal = ({ deletePost }) => {
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
            'Deleting post will removes it forever. Are you sure you want to delete?'
          }
        </ModalBody>
        <ModalFooter>
          <Button
            color='danger'
            onClick={e => {
              e.preventDefault();
              deletePost();
            }}
          >
            Delete
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default connect(null, { deletePost })(DeleteAccountModal);

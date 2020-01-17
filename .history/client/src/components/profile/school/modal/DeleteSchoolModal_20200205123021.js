import React, { useState } from 'react';
import _ from 'lodash';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { deleteSchool } from '../../../../actions/profile';

import './SchoolModal.scss';

const DeleteSchoolModal = () => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <div className='school-info-action-container' onClick={toggle}>
        <div className='school-info-delete-button-right'>
          <span>Delete</span>
        </div>
      </div>
      <Modal isOpen={modal} fade={false} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          {"Delete your child's school community"}
        </ModalHeader>
        <ModalBody>
          {
            "Are you sure you want to delete your child's current school community? You won't be able to access this community after this action. You can create new one by clicking 'Add child link'"
          }
        </ModalBody>
        <ModalFooter>
          <Button
            color='danger'
            onClick={e => {
              e.preventDefault();
              //addSchool(formData, history);
            }}
          >
            Delete
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default DeleteSchoolModal;

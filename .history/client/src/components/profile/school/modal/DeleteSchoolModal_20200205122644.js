import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import _ from 'lodash';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import PropTypes from 'prop-types';
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
        <ModalHeader toggle={toggle}>{'Delete account forever'}</ModalHeader>
        <ModalBody>
          {
            "Are you sure you want to delete your child'scurrent school community? You won't be able to access this account after this action."
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

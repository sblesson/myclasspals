import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { Link, withRouter } from 'react-router-dom';
import { Search, Input, Grid, Header, Segment, Label } from 'semantic-ui-react';
import _ from 'lodash';

import {
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  FormText,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';

import PropTypes from 'prop-types';
import './AccountModal.scss';

const AccountModal = () => {
  const [formData, setFormData] = useState({
    schoolName: '',
    schoolCity: '',
    schoolState: '',
    schoolZip: '',
    grade: '',
    classRoom: '',
    childName: ''
  });
  const [modal, setModal] = useState(false);

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleResultSelect = (e, { result }) => {
    setFormData({ ...formData, ['schoolName']: result.title });
  };

  const onCool = e => {
    console.log('this is cool');
  };
  const toggle = () => setModal(!modal);

  return (
    <div>
      <div className='account-info-action-container' onClick={toggle}>
        <div className='account-info-edit-button-right'>
          <span>Edit</span>
        </div>
      </div>
      <Modal isOpen={modal} fade={false} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          {"Connect to your child's class community"}
        </ModalHeader>
        <ModalBody>
        {"Are you sure you want to delete this account? You won't be able "}

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

export default AccountModal;

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { Link, withRouter } from 'react-router-dom';
import { Search, Input, Grid, Header, Segment, Label } from 'semantic-ui-react';
import _ from 'lodash';
import { openModal } from '../../../actions/modal';

import ModalManager from '../../common/ModalManager';

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

const AccountModal = ({ openModal }) => {
  const [formData, setFormData] = useState({
    schoolName: '',
    schoolCity: '',
    schoolState: '',
    schoolZip: '',
    grade: '',
    classRoom: '',
    childName: ''
  });

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleResultSelect = (e, { result }) => {
    setFormData({ ...formData, ['schoolName']: result.title });
  };


  const onBtnClick = e => {
    openModal({
      header: 'Test content',
      content: 'Test content 2'
    });
  }
  return (
    <div>
      <ModalManager />

      <Button
        onClick={() =>
         
        }
      >
        Open modal
      </Button>

      <ModalBody>
        <Form>
          <FormGroup className='account-form'>
            <Input
              placeholder='Your name'
              name='username'
              onChange={e => onChange(e)}
              required
            />
          </FormGroup>
          <FormGroup className='account-form'>
            <Input
              className='account-form-text-input'
              type='text'
              name='email'
              //value={grade}
              placeholder='Email'
              onChange={e => onChange(e)}
            />
          </FormGroup>
          <FormGroup className='account-form'>
            <Input
              className='account-form-text-input'
              type='text'
              name='street'
              //value={classRoom}
              placeholder='Street'
              onChange={e => onChange(e)}
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button
          color='primary'
          onClick={e => {
            e.preventDefault();
            //addSchool(formData, history);
          }}
        >
          Save
        </Button>
      </ModalFooter>
    </div>
  );
};

export default connect(null, { openModal })(withRouter(AccountModal));

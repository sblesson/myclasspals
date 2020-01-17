import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { Link, withRouter } from 'react-router-dom';
import { Search, Input, Grid, Header, Segment, Label } from 'semantic-ui-react';
import _ from 'lodash';


import ModalWrapper from '../../common/ModalWrapper';
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

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleResultSelect = (e, { result }) => {
    setFormData({ ...formData, ['schoolName']: result.title });
  };

  const onCool = e => {
    console.log('this is cool');
  };
  const renderChildren = () => {
    console.log('inside render');
    return (
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
    );
  };
  return (
    <div>
      <ModalWrapper
        title='Edit Account'
        width={800}
        okText={'Save'}
        onOk={onCool}
        isOpen={true}
        children={renderChildren}
      ></ModalWrapper>
    </div>
  );
};

export default AccountModal;

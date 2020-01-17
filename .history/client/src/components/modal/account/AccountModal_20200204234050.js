import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { Link, withRouter } from 'react-router-dom';
import { Search, Input, Grid, Header, Segment, Label } from 'semantic-ui-react';
import _ from 'lodash';
import { openModal } from '../../../actions/modal';

import ModalManager from '../../common/ModalManager';
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

  const onCool = e => {
    console.log('this is cool');
  };
  const renderChildren = () => 
  return (
    <div>
      <ModalWrapper
        title='Edit Account'
        width={800}
        okText={'Save'}
        onOk={onCool}
        isOpen={true}
      >
        <ModalBody>
    
        </ModalBody>
      </ModalWrapper>
    </div>
  );
};

export default connect(null, { openModal })(withRouter(AccountModal));

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

  const onBtnClick = e => {
    openModal({
      header: 'Test content',
      content: 'Test content 2'
    });
  };
  return (
    <div>
      <ModalWrapper
        title='Edit text item'
        width={800}
        okDisabled={!this.state.isValid}
      >
        {/* some DOM */}

        <input value={this.props.id} onChange={this.onIdChange.bind(this)} />

        {/* some more DOM */}
      </ModalWrapper>
    </div>
  );
};

export default connect(null, { openModal })(withRouter(AccountModal));

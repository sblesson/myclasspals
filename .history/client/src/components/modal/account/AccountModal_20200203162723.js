import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { Link, withRouter } from 'react-router-dom';
import { Search, Input, Grid, Header, Segment, Label } from 'semantic-ui-react';
import _ from 'lodash';
import { hideModal } from '../../../actions/modal';

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

const AccountModal = ({ isOpen, history }) => {
  const [formData, setFormData] = useState({
    schoolName: '',
    schoolCity: '',
    schoolState: '',
    schoolZip: '',
    grade: '',
    classRoom: '',
    childName: ''
  });

  //const [modal, setModal] = useState(false);
  /* 
  useEffect(() => {
    getSchoolData();
  }, [getSchoolData]); */

  const toggle = () => setModal(!modal);

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleResultSelect = (e, { result }) => {
    setFormData({ ...formData, ['schoolName']: result.title });
  };

  const handleSearchOnBlur = event => {
    value = event.target && event.target.value ? event.target.value : '';
    setTimeout(() => {
      isLoading = false;

      if (value) {
        getSchoolData(value);
      }
    }, 300);
  };

  return (
    <div>
      <Modal isOpen={isOpen} fade={false}>
        <ModalHeader>{'Edit Account'}</ModalHeader>
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
      </Modal>
    </div>
  );
};

AccountModal.propTypes = {
  isOpen: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  console.log(state);
  return {
    isOpen: state.modal.isOpen
  };
};

export default connect(mapStateToProps, {})(withRouter(AccountModal));

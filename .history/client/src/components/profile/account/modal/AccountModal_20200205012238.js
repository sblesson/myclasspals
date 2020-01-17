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

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleResultSelect = (e, { result }) => {
    setFormData({ ...formData, ['schoolName']: result.title });
  };

  const onCool = e => {
    console.log('this is cool');
  };
  const toggle = () => setModal(!modal);

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
      <div>
        <div className='profile-action-container' onClick={toggle}>
          <div className='profile-action-button'>
            <i className='fas fa-plus-circle'></i>
            <span className='add-more'>Edit</span>
          </div>
        </div>
        <Modal isOpen={modal} fade={false} toggle={toggle}>
          <ModalHeader toggle={toggle}>
            {"Connect to your child's class community"}
          </ModalHeader>
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
              {/*         <article>
            <p>
              <i className='fas fa-user' /> Edit your profile
            </p>
            <small>* = required field</small>
            <form className='form' onSubmit={e => onSubmit(e)}>
              <div className='form-group'>
                <input
                  type='text'
                  placeholder='username'
                  name='username'
                  value={username}
                  onChange={e => onChange(e)}
                />
              </div>
              <div className='form-group'>
                <input
                  type='text'
                  placeholder='Location'
                  name='location'
                  value={location}
                  onChange={e => onChange(e)}
                />
                <small className='form-text'>
                  City & state suggested (eg. Boston, MA)
                </small>
              </div>
              <input
                type='submit'
                value='Save'
                className='btn btn-primary my-1'
              />
            </form>
          </article> */}

              {/*         <div className='my-2'>
            <button className='btn btn-danger' onClick={() => deleteAccount()}>
              <i className='fas fa-user-minus' /> Delete My Account
            </button>
          </div> */}
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button
              color='primary'
              onClick={e => {
                e.preventDefault();
                addSchool(formData, history);
              }}
            >
              Save
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
 
};

export default AccountModal;

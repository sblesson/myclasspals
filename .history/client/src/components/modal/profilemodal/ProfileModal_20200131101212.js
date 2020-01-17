import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Input } from 'semantic-ui-react';

import {
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addSchool } from '../../../actions/profile';
import './ProfileModal.scss';

const ProfileModal = ({ addSchool, history }) => {
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

  const toggle = () => setModal(!modal);

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div>
      <div className='new-post-form' onClick={toggle}>
        <div className='profile-action-button'>
          <i className='fas fa-plus-circle'></i>
          <span className='add-more'>Add more child?</span>
        </div>
      </div>
      <Modal isOpen={modal} fade={false} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          {"Connect to your child's class room community"}
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup className='post-form'>
              <div class='ui input'>
                <input type='text' placeholder='Your child\'s...' />
              </div>

              <input
                type='text'
                placeholder='* Name of Child'
                name='childName'
                //value={childName}
                onChange={e => onChange(e)}
                required
              />
            </FormGroup>
            <FormGroup className='post-form'>
              <input
                type='text'
                placeholder='* School Name'
                name='schoolName'
                //value={schoolName}
                onChange={e => onChange(e)}
                required
              />
            </FormGroup>
            <FormGroup className='post-form'>
              <Input
                className='post-form-text-input'
                type='text'
                name='grade'
                //value={grade}
                placeholder='* Grade'
                onChange={e => onChange(e)}
              />
            </FormGroup>
            <FormGroup className='post-form'>
              <Input
                className='post-form-text-input'
                type='text'
                name='classRoom'
                //value={classRoom}
                placeholder='Class Room'
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

ProfileModal.propTypes = {
  addSchool: PropTypes.func.isRequired
};

export default connect(null, { addSchool })(withRouter(ProfileModal));

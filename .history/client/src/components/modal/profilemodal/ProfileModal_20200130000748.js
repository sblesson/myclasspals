import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
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
import './PostModal.scss';

const ProfileModal = ({ addSchool, history }) => {
  const [text, setText] = useState('');
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
        <div className='bg-post-head p'>
          Want to connect with your child's classroom parents?
        </div>
      </div>
      <Modal isOpen={modal} fade={false} toggle={toggle}>
        <ModalHeader toggle={toggle}> Add Your Child's Class</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup
              tag='fieldset'
              className='post-form post-form-radio-options-container'
            >
      
              {topics.map(function(topic, index) {
                return (
                  <FormGroup check key={index}>
                    <Label check>
                      <Input
                        type='radio'
                        name='topics'
                        value={topic}
                        category={topic.category_id}
                        onChange={e => onChange(e)}
                      />{' '}
                      {topic.title}
                    </Label>
                  </FormGroup>
                );
              })}
            </FormGroup>
            <FormGroup
              tag='fieldset'
              className='post-form post-form-radio-options-container'
            >
              <legend className='col-form-label'>Choose Group</legend>
              {all_groups.map(function(group, index) {
                return (
                  <FormGroup check key={index}>
                    <Label check>
                      <Input
                        type='radio'
                        name='group_id'
                        value={group.group_id}
                        onChange={e => onChange(e)}
                      />{' '}
                      {group.name}
                    </Label>
                  </FormGroup>
                );
              })}
            </FormGroup>
            <FormGroup className='post-form'>
              <Input
                className='post-form-text-input'
                type='text'
                name='subject'
                placeholder='Subject'
                onChange={e => onChange(e)}
              />
            </FormGroup>
            <FormGroup className='post-form'>
              <textarea
                className='post-form-text-input post-form-textarea'
                name='message'
                cols='30'
                rows='5'
                placeholder='Enter your message ...'
                onChange={e => onChange(e)}
                required
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

export default connect(null, { addPost })(withRouter(ProfileModal));

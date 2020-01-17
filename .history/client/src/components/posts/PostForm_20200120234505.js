import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
  Col,
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
import { addPost } from '../../actions/post';

const PostForm = ({ addPost, history }) => {
  const [text, setText] = useState('');
  const [formData, setFormData] = useState({
    topics: '[]',
    group_id: '',
    subject: '',
    message: ''
  });

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const topics = [
    { category_id: '1', title: 'General', url: '/general' },
    { category_id: '2', title: 'Recommendations', url: '/recommendations' },
    { category_id: '3', title: 'Carpool', url: '/carpool' },
    { category_id: '4', title: 'Lost & Found', url: '/lost_and_found' },
    { category_id: '5', title: 'Volunteer', url: '/volunteer' },
    { category_id: '6', title: 'Help Needed', url: '/help' },
    { category_id: '7', title: 'Homework', url: '/homework' }
  ];
  const all_groups = [
    {
      id: 'userId',
      group_id: 'groupID room 34',
      name: 'room 34',
      type: 'inner'
    },
    {
      id: 'userId',
      group_id: 'groupID grade 6',
      name: 'grade 6 + room 34',
      type: 'outer'
    },
    {
      id: 'userId',
      group_id: 'groupID sunshine',
      name: 'sunshine',
      type: 'inner'
    },
    {
      id: 'userId',
      group_id: 'groupID prek',
      name: 'pre-k + sunshine',
      type: 'outer'
    }
  ];

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div>
      <div className='post-form' onClick={toggle}>
        <div className='bg-post-head p'>
          <h6>Post </h6>
        </div>

        <div className='post-create-textarea'>
          <div className='avatar-container'>
            <i className='fas fa-user margin-right-5 '></i>
            <span className='new-post'>What do you want to discuss?</span>
          </div>
        </div>
      </div>
      <Modal isOpen={modal} fade={false} toggle={toggle}>
        <ModalHeader toggle={toggle}> Create Post</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup tag='fieldset' row>
              <legend className='col-form-label'>Choose topics</legend>
              <Col sm={10}>
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
              </Col>
            </FormGroup>
            <FormGroup tag='fieldset' row>
              <legend className='col-form-label'>
                Choose classroom parents
              </legend>
              <Col sm={10}>
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
              </Col>
            </FormGroup>
            <FormGroup row>
              <Input
                type='text'
                name='subject'
                placeholder='Subject'
                onChange={e => onChange(e)}
              />
            </FormGroup>
            <FormGroup row>
              <textarea
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
              addPost(formData, history);
            }}
          >
            Post
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default connect(null, { addPost })(withRouter(PostForm));

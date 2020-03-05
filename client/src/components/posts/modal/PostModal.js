import React, { useState } from 'react';
import { Select } from 'antd';

import { Link, withRouter } from 'react-router-dom';
import { Accordion, Form, Menu } from 'semantic-ui-react';

import {
  Col,
  Row,
  Button,
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
import { addPost } from '../../../actions/post';
import './PostModal.scss';

const PostModal = ({ addPost, history, categories }) => {
  const [text, setText] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedGroup, setSelectedGroup] = useState(undefined);

  const [formData, setFormData] = useState({
    subject: '',
    message: '',
    category: '1',
    schoolId: '1',
    userid: '3' //get userid from db
  });

  const [modal, setModal] = useState(false);

  const [category, setSelectedCategory] = useState('');

  const toggle = () => setModal(!modal);

  const { Option } = Select;

  const topics = [
    { category_id: '1', title: 'General', url: '/general' },
    { category_id: '2', title: 'Recommendations', url: '/recommendations' },
    { category_id: '3', title: 'Carpool', url: '/carpool' },
    { category_id: '4', title: 'Lost & Found', url: '/lost_and_found' },
    { category_id: '5', title: 'Help Wanted', url: '/help' },
    { category_id: '6', title: 'Homework', url: '/homework' },
    { category_id: '7', title: 'Aftercare', url: '/aftercare' },
    { category_id: '8', title: 'Reminder', url: '/reminder' },
    { category_id: '9', title: 'Urgent', url: '/urgent' },
    { category_id: '10', title: 'Volunteering', url: '/volunteering' },
    { category_id: '11', title: 'Birthday', url: '/birthday' }
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

  console.log(categories);
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleClick = (e, titleProps) => {
    console.log('cool', titleProps);
    const { index } = titleProps;
    console.log('index', index);

    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

  const CategoryForm = (
    <Form.Group grouped>
      <Form.Radio label='Small' name='size' type='radio' value='small' />
      <Form.Radio label='Medium' name='size' type='radio' value='medium' />
      <Form.Radio label='Large' name='size' type='radio' value='large' />
      <Form.Radio label='X-Large' name='size' type='radio' value='x-large' />
    </Form.Group>
  );

  const GroupForm = (
    <Form.Group grouped>
      <Form.Radio label='Small' name='size' type='radio' value='small' />
      <Form.Radio label='Medium' name='size' type='radio' value='medium' />
      <Form.Radio label='Large' name='size' type='radio' value='large' />
      <Form.Radio label='X-Large' name='size' type='radio' value='x-large' />
    </Form.Group>
  );

  const onGroupChange = value => {
    setSelectedGroup(value);
  };

  const onCategoryChange = value => {
    setSelectedCategory(value);
  };
  return (
    <div>
      <div className='new-post-form' onClick={toggle}>
        <div className='bg-post-head p'>
          <h6>What do you want to discuss?</h6>
        </div>

        <div className='post-create-textarea'>
          <div className='avatar-container'>
            <i className='fas fa-user margin-right-5 '></i>
            <span className='new-post'>Post your inner voice </span>
          </div>
        </div>
      </div>
      <Modal isOpen={modal} fade={false} toggle={toggle}>
        <ModalHeader toggle={toggle}> Create Post</ModalHeader>
        <ModalBody>
          <Form>
            <Form.Group className='post-form'>
              <Select
                allowClear
                style={{ width: '100%' }}
                placeholder='Choose category'
                onChange={onCategoryChange}
              >
                {topics.map(function(topic, index) {
                  return <Option key={index}>{topic.title}</Option>;
                })}
              </Select>
            </Form.Group>
            <Form.Group className='post-form'>
              <Select
                allowClear
                style={{ width: '100%' }}
                placeholder='Choose group'
                onChange={onGroupChange}
              >
                {all_groups.map(function(group, index) {
                  return <Option key={index}>{group.name}</Option>;
                })}
              </Select>
            </Form.Group>
            <Form.Group className='post-form'>
              <Input
                className='post-form-text-input'
                type='text'
                name='subject'
                placeholder='Subject'
                onChange={e => onChange(e)}
              />
            </Form.Group>
            <Form.Group className='post-form'>
              <textarea
                className='post-form-text-input post-form-textarea'
                name='message'
                cols='30'
                rows='5'
                placeholder='Enter your message ...'
                onChange={e => onChange(e)}
                required
              />
            </Form.Group>
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

PostModal.propTypes = {
  addPost: PropTypes.func.isRequired
};

const mapDispatchToProps = state => ({
  hideModal: state.hideModal,
  categories: state.post.categories
});

export default connect(mapDispatchToProps, { addPost, mapDispatchToProps })(
  withRouter(PostModal)
);

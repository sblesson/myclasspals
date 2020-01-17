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
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import Collapse from '@material-ui/core/Collapse';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../../actions/post';
import './PostModal.scss';

const PostModal = ({ addPost, history }) => {
  const [text, setText] = useState('');
  const [formData, setFormData] = useState({
    topics: '[]',
    group_id: '',
    subject: '',
    message: ''
  });
  const [collapsed, setCollapsed] = React.useState(true);

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const toggleCollapse = () => {
    setCollapsed(prevValue => !prevValue);
  };

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
            <FormGroup
              tag='fieldset'
              className='post-form post-form-radio-options-container'
            >
              <legend className='col-form-label'>Choose Category</legend>
              <Collapse in={!collapsed} timeout='auto' unmountOnExit>
                {Array.isArray(items) ? (
                  <List disablePadding dense>
                    {items.map((subItem, index) => (
                      <React.Fragment key={`${subItem.name}${index}`}>
                        {subItem === 'divider' ? (
                          <Divider style={{ margin: '6px 0' }} />
                        ) : (
                          <SideNavItem
                            depth={depth + 1}
                            depthStep={depthStep}
                            item={subItem}
                          />
                        )}
                      </React.Fragment>
                    ))}
                  </List>
                ) : null}
              </Collapse>

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
  hideModal: state.hideModal
});

export default connect(null, { addPost, mapDispatchToProps })(
  withRouter(PostModal)
);

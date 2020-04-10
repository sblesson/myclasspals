import React, { useState } from 'react';
import { Select } from 'antd';
import { Upload, Button } from 'antd';
import { UploadOutlined, StarOutlined } from '@ant-design/icons';

import { withRouter } from 'react-router-dom';
import { Form } from 'semantic-ui-react';
import moment from 'moment';

import { Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Tabs } from 'antd';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost, searchPostByGroupId } from '../../../actions/post';
import { DatePicker, TimePicker } from 'antd';

import './PostModal.scss';
import { fontWeight } from '@material-ui/system';

const PostModal = ({
  addPost,
  history,
  categories,
  currentGroup,
  auth,
  searchPostByGroupId
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [categoryId, setSelectedCategory] = useState(0);

  const { TabPane } = Tabs;
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
    categoryId: 'General',
    groupId: currentGroup.id
  });

  formData.userId = auth.user._id;
  formData.userName = auth.user.name;
  console.log(formData);

  function callback(key) {
    console.log(key);
  }
  console.log('inside post modal' + categories);
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const { Option } = Select;

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

  const onCategoryChange = value => {
    setFormData({ ...formData, ['categoryId']: categories[value].title });
  };

  const uploadProps = {
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange({ file, fileList }) {
      if (file.status !== 'uploading') {
        console.log(file, fileList);
      }
    },
    defaultFileList: [
      {
        uid: '1',
        name: 'xxx.png',
        status: 'done',
        response: 'Server Error 500', // custom error message to show
        url: 'http://www.baidu.com/xxx.png'
      },
      {
        uid: '2',
        name: 'yyy.png',
        status: 'done',
        url: 'http://www.baidu.com/yyy.png'
      },
      {
        uid: '3',
        name: 'zzz.png',
        status: 'error',
        response: 'Server Error 500', // custom error message to show
        url: 'http://www.baidu.com/zzz.png'
      }
    ],
    showUploadList: {
      showDownloadIcon: true,
      downloadIcon: 'download ',
      showRemoveIcon: true,
      removeIcon: (
        <StarOutlined
          onClick={e => console.log(e, 'custom removeIcon event')}
        />
      )
    }
  };

  const postTab1Categories = categories.map(function(topic, index) {
    if (topic === 'divider') {
    }
    return <Option key={index}>{topic.title}</Option>;
  });

  const MessagePostForm = (
    <Form>
      <Form.Group className='post-form'>
        <Select
          allowClear
          style={{ width: '100%' }}
          placeholder='Choose category'
          onChange={onCategoryChange}
        >
          {categories.map(function(topic, index) {
            if (topic === 'divider') {
            }
            return <Option key={index}>{topic.title}</Option>;
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
      <Form.Group>
        <Upload {...uploadProps}>
          <Button>
            <UploadOutlined /> Upload
          </Button>
        </Upload>
      </Form.Group>
    </Form>
  );

  const EventPostForm = (
    <Form>
      <Form.Group className='post-form'>
        <Select
          allowClear
          style={{ width: '100%' }}
          placeholder='Choose event category'
          onChange={onCategoryChange}
        >
          {categories.map(function(topic, index) {
            console.log(topic, index);
            return <Option key={index}>{topic.title}</Option>;
          })}
        </Select>
      </Form.Group>
      <Form.Group className='post-form'>
        <DatePicker.RangePicker
          format='YYYY-MM-DD HH:mm'
          showTime={{ defaultValue: moment('00:00', 'HH:mm') }}
        />
      </Form.Group>
      <Form.Group className='post-form'>
        <Input
          className='post-form-text-input'
          type='text'
          name='location'
          placeholder='Address'
          onChange={e => onChange(e)}
        />
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
      <Form.Group>
        <Upload {...uploadProps}>
          <Button>
            <UploadOutlined /> Upload
          </Button>
        </Upload>
      </Form.Group>
    </Form>
  );

  const ReminderPostForm = (
    <Form>
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
  );
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
        <ModalHeader toggle={toggle}>
          Post to {currentGroup.groupName}
        </ModalHeader>
        <ModalBody>
          <Tabs defaultActiveKey='1' onChange={callback}>
            <TabPane tab='Speak Up' key='1'>
              {MessagePostForm}
            </TabPane>
            <TabPane tab="Let's Meet" key='2'>
              {EventPostForm}
            </TabPane>
            <TabPane tab='Alert' key='3'>
              {ReminderPostForm}
            </TabPane>
          </Tabs>
        </ModalBody>
        <ModalFooter>
          <Button
            color='primary'
            onClick={e => {
              e.preventDefault();
              addPost(formData, history);
              searchPostByGroupId({
                groupId: currentGroup.id
              });
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
  categories: state.post.categories,
  currentGroup: state.group.currentGroup,
  auth: state.auth
});

export default connect(mapDispatchToProps, {
  addPost,
  searchPostByGroupId,
  mapDispatchToProps
})(withRouter(PostModal));

import React, { useState, useEffect } from 'react';
import { Upload, Button } from 'antd';
import {
  PlusCircleOutlined,
  UploadOutlined,
  StarOutlined,
} from '@ant-design/icons';

import { withRouter } from 'react-router-dom';
import moment, { isMoment } from 'moment';

import { Tabs, Modal } from 'antd';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Formik, ErrorMessage, useFormik } from 'formik';
import PostCategorySelect from '../../common/postcategoryselect/PostCategorySelect';

import {
  SubmitButton,
  Input,
  Form,
  Radio,
  FormItem,
  FormikDebug,
  Select,
} from 'formik-antd';
import { addPost, addEvent } from '../../../actions/post';
import { DatePicker, TimePicker } from 'antd';

import './PostModal.scss';

const PostModal = ({ isMobile, addPost, addEvent, history, group, auth }) => {
  const { RangePicker } = TimePicker;

  const [componentSize, setComponentSize] = useState('small');
  const [activeIndex, setActiveIndex] = useState(0);

  const { TabPane } = Tabs;

  const [visible, setModalVisibility] = useState(false);

  const showModal = () => {
    setModalVisibility(true);
  };

  const hideModal = () => {
    setModalVisibility(false);
  };
  const toggleModal = () => {
    setModalVisibility(!visible);
  };

  const handleClick = (e, titleProps) => {
    const { index } = titleProps;

    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

  const uploadProps = {
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange({ file, fileList }) {
      if (file.status !== 'uploading') {
      }
    },
    defaultFileList: [
      {
        uid: '1',
        name: 'xxx.png',
        status: 'done',
        response: 'Server Error 500', // custom error message to show
        url: 'http://www.baidu.com/xxx.png',
      },
      {
        uid: '2',
        name: 'yyy.png',
        status: 'done',
        url: 'http://www.baidu.com/yyy.png',
      },
      {
        uid: '3',
        name: 'zzz.png',
        status: 'error',
        response: 'Server Error 500', // custom error message to show
        url: 'http://www.baidu.com/zzz.png',
      },
    ],
    showUploadList: {
      showDownloadIcon: true,
      downloadIcon: 'download ',
      showRemoveIcon: true,
      removeIcon: <StarOutlined onClick={(e) => {}} />,
    },
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  const validateRequired = (value) => {
    return value ? undefined : 'required';
  };
  function callback(key) {
    console.log(key);
  }

  const MessagePostForm = (
    <Formik
      initialValues={{
        categoryId: 'General',
        groupId: group.currentGroup.id,
        subject: '',
        message: '',
      }}
      onSubmit={(values, actions) => {
        addPost(values, history);
        setModalVisibility(false);
        setActiveIndex(0);
      }}
      validator={() => ({})}
      //validate={values => {}}
      render={() => (
        <div style={{ flex: 1, padding: 10 }}>
          <Form
            className='form-wrapper'
            {...formItemLayout}
            layout='vertical'
            initialValues={{
              size: componentSize,
            }}
          >
            {' '}
            <FormItem
              name='categoryId'
              label='Select Category'
              required={true}
              validate={validateRequired}
            >
              <PostCategorySelect />
            </FormItem>
            <FormItem
              name='subject'
              label='Subject'
              required={true}
              validate={validateRequired}
            >
              <Input name='subject' placeholder='Subject' />
            </FormItem>
            <FormItem name='message' label='Your Message' required={false}>
              <Input.TextArea
                className='post-form-text-input post-form-textarea'
                name='message'
                cols='30'
                rows='5'
                placeholder='Enter your message ...'
                required={false}
              />
            </FormItem>
            {/*       <Upload {...uploadProps}>
              <Button>
                <UploadOutlined /> Upload
              </Button>
            </Upload> */}
            {/*     <pre style={{ flex: 1 }}>
              <FormikDebug />
            </pre> */}
            <SubmitButton className='ant-btn btn-primary'> Post</SubmitButton>
          </Form>
        </div>
      )}
    />
  );

  const EventPostForm = (
    <Formik
      initialValues={{
        eventTitle: '',
        eventType: 'Birthday',
        groupId: group.currentGroup.id,
        location: '',
        description: '',
      }}
      onSubmit={(values, actions) => {
        addEvent(values, history);
        setModalVisibility(false);
        setActiveIndex(0);
      }}
      validator={() => ({})}
      //validate={values => {}}
      render={() => (
        <div style={{ flex: 1, padding: 10 }}>
          <Form
            className='form-wrapper'
            {...formItemLayout}
            layout='vertical'
            initialValues={{
              size: componentSize,
            }}
          >
            <FormItem
              name='eventTitle'
              label='Title'
              required={true}
              validate={validateRequired}
            >
              <Input name='eventTitle' placeholder='Event Title' />
            </FormItem>
            <FormItem
              name='eventDate'
              label='Event Date'
              required={true}
              validate={validateRequired}
            >
              <DatePicker /* onChange={onChange} */ />
            </FormItem>

            <FormItem
              name='eventTime'
              label='Event Time'
              required={true}
              validate={validateRequired}
            >
              <RangePicker
                use12Hours
                format='h:mm a' /* onChange={onChange} */
              />
            </FormItem>

            <FormItem
              name='eventLocation'
              label='Location'
              required={true}
              validate={validateRequired}
            >
              <Input
                name='eventLocation'
                placeholder='Enter address or online link'
              />
            </FormItem>
            <FormItem
              name='eventDescription'
              label='Description'
              required={false}
            >
              <Input.TextArea
                className='post-form-text-input post-form-textarea'
                name='eventDescription'
                cols='30'
                rows='5'
                placeholder='Enter event description ...'
                required={false}
              />
            </FormItem>
            <SubmitButton className='ant-btn btn-primary'> Create</SubmitButton>
          </Form>
        </div>
      )}
    />
  );

  const EventPostForm2 = (
    <Form>
      <Form.Group className='post-form'>
        <Select
          allowClear
          style={{ width: '100%' }}
          placeholder='Choose event category'
          //onChange={onCategoryChange}
        >
          {/*     {categories.map(function (topic, index) {
            return <Option key={index}>{topic.title}</Option>;
          })} */}
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
          //onChange={(e) => onChange(e)}
        />
      </Form.Group>
      <Form.Group className='post-form'>
        <Input
          className='post-form-text-input'
          type='text'
          name='subject'
          placeholder='Subject'
          //onChange={(e) => onChange(e)}
        />
      </Form.Group>
      <Form.Group className='post-form'>
        <textarea
          className='post-form-text-input post-form-textarea'
          name='message'
          cols='30'
          rows='5'
          placeholder='Enter your message ...'
          //onChange={(e) => onChange(e)}
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
      <SubmitButton className='ant-btn btn-primary'>Add</SubmitButton>
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
          //onChange={(e) => onChange(e)}
          required
        />
      </Form.Group>
    </Form>
  );
  return (
    <div>
      <div className='new-post-form' onClick={showModal}>
        <Button className='ant-btn btn-primary pinkBtn'>
          {/* <PlusCircleOutlined /> */}
          Create
        </Button>

        {/*         {!isMobile && (
          <>
            <div className='bg-post-head p'>What do you want to discuss?</div>

            <div className='post-create-textarea'>
              <div className='avatar-container'>
                <i className='fas fa-user margin-right-5 '></i>
                <span className='new-post'>Post your inner voice </span>
              </div>
            </div>
          </>
        )} */}
      </div>
      <Modal
        centered
        visible={visible}
        onOk={hideModal}
        onCancel={toggleModal} //pass close logic here
        destroyOnClose={true}
        cancelButtonProps={{ style: { display: 'none' } }}
        destroyOnClose={true}
        footer={null}
      >
        <Tabs defaultActiveKey='1' onChange={callback}>
          <TabPane tab={'Post'} key='1'>
            {MessagePostForm}
          </TabPane>
          <TabPane tab={'Event'} key='2'>
            {EventPostForm}
          </TabPane>
        </Tabs>
      </Modal>
    </div>
  );
};

PostModal.propTypes = {
  addPost: PropTypes.func.isRequired,
};

const mapDispatchToProps = (state) => ({
  group: state.group,
  auth: state.auth,
});

export default connect(mapDispatchToProps, {
  addPost,
  addEvent,
  mapDispatchToProps,
})(withRouter(PostModal));

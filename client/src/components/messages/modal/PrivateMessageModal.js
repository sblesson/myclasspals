import React, { useState } from 'react';
import { Upload, Button, Modal } from 'antd';
import { UploadOutlined, StarOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import { Formik, ErrorMessage, useFormik } from 'formik';

import { SubmitButton, Input, Form, FormItem, FormikDebug } from 'formik-antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sendPrivateMessage } from '../../../actions/post';
import MultiSelectUserSearch from '../../common/multiselectusersearch/MultiSelectUserSearch';

import './PrivateMessageModal.scss';

const PrivateMessageModal = ({ sendPrivateMessage, history, auth }) => {
  const [componentSize, setComponentSize] = useState('small');

  const [visible, setModalVisibility] = useState(false);
  const [headerTitle, setHeaderTitle] = useState('New Message');
  const showModal = () => {
    setModalVisibility(true);
  };
  const hideModal = () => {
    setModalVisibility(false);
  };
  const toggleModal = () => {
    setModalVisibility(!visible);
  };
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 }
    }
  };
  const validateRequired = value => {
    return value ? undefined : 'required';
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

  const MessageForm = (
    <Formik
      initialValues={{
        userId: auth && auth.user && auth.user._id ? auth.user._id : null,
        endUserId: '',
        subject: '',
        message: '',
        isPrivate: true
      }}
      onSubmit={(values, actions) => {
        sendPrivateMessage(values);
        setModalVisibility(false);
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
              size: componentSize
            }}
          >
            {' '}
            <FormItem
              name='endUserId'
              label='Select your buddies'
              required={true}
              validate={validateRequired}
            >
              <MultiSelectUserSearch endUsersSelect={'endUserId'} />
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
            <pre style={{ flex: 1 }}>
              <FormikDebug />
            </pre>
            <SubmitButton className='ant-btn btn-primary'> Send</SubmitButton>
          </Form>
        </div>
      )}
    />
  );

  return (
    <div>
      <div className='private-message-modal' onClick={toggleModal}>
        <Button type='primary' className='pinkBtn'>
          Message
        </Button>
      </div>
      <Modal
        title={headerTitle}
        centered
        visible={visible}
        onOk={hideModal}
        onCancel={toggleModal} //pass close logic here
        destroyOnClose={true}
        cancelButtonProps={{ style: { display: 'none' } }}
        destroyOnClose={true}
        footer={null}
      >
        {MessageForm}
      </Modal>
    </div>
  );
};

PrivateMessageModal.propTypes = {
  sendPrivateMessage: PropTypes.func.isRequired
};
const mapDispatchToProps = state => ({
  hideModal: state.hideModal,
  currentGroup: state.group.currentGroup,
  auth: state.auth
});

export default connect(mapDispatchToProps, {
  sendPrivateMessage,
  mapDispatchToProps
})(withRouter(PrivateMessageModal));

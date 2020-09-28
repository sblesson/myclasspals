import React, { useState } from 'react';
import { Upload, Button, Modal, Result } from 'antd';
import { UploadOutlined, StarOutlined, FormOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import { Formik, ErrorMessage } from 'formik';

import { SubmitButton, Input, Form, FormItem, FormikDebug } from 'formik-antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sendPrivateMessage } from '../../../actions/post';
//import AutoCompleteUserSeach from '../../common/autocompleteusersearch/AutoCompleteUserSeach';
import AutoCompleteUserSeach from '../../common/autocompleteusersearch/AutoCompleteUserSearch';

import './PrivateMessageModal.scss';

const PrivateMessageModal = ({
  sendPrivateMessage,
  history,
  auth,
  toAddress,
  noMessagesFound,
}) => {
  const [componentSize, setComponentSize] = useState('small');

  const [visible, setModalVisibility] = useState(false);
  const [headerTitle, setHeaderTitle] = useState('Send Private Message');
  const showModal = () => {
    setModalVisibility(true);
  };
  const hideModal = () => {
    console.log('hideModal');
    setModalVisibility(false);
  };
  const toggleModal = () => {
    console.log('toggleModal');

    setModalVisibility(!visible);
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
      removeIcon: (
        <StarOutlined
          onClick={(e) => console.log(e, 'custom removeIcon event')}
        />
      ),
    },
  };

  const MessageForm = (
    <Formik
      initialValues={{
        userId: auth && auth.user && auth.user._id ? auth.user._id : null,
        endUserId: toAddress ? toAddress : '',
        subject: '',
        message: '',
        isPrivate: true,
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
              size: componentSize,
            }}
          >
            {toAddress ? (
              ''
            ) : (
              <FormItem
                name='endUserId'
                label='Select your buddies'
                required={true}
                validate={validateRequired}
              >
                <AutoCompleteUserSeach />
              </FormItem>
            )}
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
            </Upload>             <pre style={{ flex: 1 }}>
              <FormikDebug />
            </pre>*/}
            <SubmitButton className='ant-btn btn-primary'> Send</SubmitButton>
          </Form>
        </div>
      )}
    />
  );
  const displayInboxCompose = (
    <div className='private-message-modal'>
      <div as='h4' className='message-head-title'>
        Inbox
      </div>
      <div
        as='h4'
        className='message-head-title message-head-link'
        onClick={showModal}
      >
        <FormOutlined className='message-head-icon' />
        Compose
      </div>
    </div>
  );

  const displayMessageButton = (
    <div className='private-message-modal' onClick={showModal}>
      <Button
        type='primary'
        className='btn-primary'
        style={{ padding: '4px 10px', fontSize: '12px' }}
      >
        Message
      </Button>
    </div>
  );

  const displayCompose = (
    <div className='private-message-modal'>
      <Result
        status='warning'
        subTitle='No messages found!'
        extra={
          <div
            as='h4'
            className='message-head-title message-head-link'
            onClick={showModal}
          >
            <FormOutlined className='message-head-icon' />
            Compose
          </div>
        }
      />
    </div>
  );

  return (
    <div className='message-body__private-message-modal'>
      {noMessagesFound && displayCompose}
      {!noMessagesFound && !toAddress && displayInboxCompose}
      {toAddress && displayMessageButton}
      <Modal
        title={headerTitle}
        centered
        visible={visible}
        onOk={hideModal}
        onCancel={hideModal} //pass close logic here
        destroyOnClose={true}
        cancelButtonProps={{ style: { display: 'none' } }}
        footer={null}
      >
        {MessageForm}
      </Modal>
    </div>
  );
};

PrivateMessageModal.propTypes = {
  sendPrivateMessage: PropTypes.func.isRequired,
};
const mapDispatchToProps = (state) => ({
  hideModal: state.hideModal,
  currentGroup: state.group.currentGroup,
  auth: state.auth,
});

export default connect(mapDispatchToProps, {
  sendPrivateMessage,
  mapDispatchToProps,
})(withRouter(PrivateMessageModal));

import React, { useState } from 'react';
import { Upload, Button } from 'antd';
import { UploadOutlined, StarOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import { Form } from 'semantic-ui-react';
import { Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sendPrivateMessage } from '../../../actions/post';
import { FormOutlined } from '@ant-design/icons';

import { Formik, ErrorMessage } from 'formik';
import AutoCompleteUserSearch from '../../common/autocompleteusersearch/AutoCompleteUserSearch';
import './PrivateMessageModal.scss';

const PrivateMessageModal = ({
  sendPrivateMessage,
  getUser,
  history,
  auth
}) => {
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
    privateMessage: true,
    userId: auth.user._id,
    endUserId: auth.user._id
  });

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

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

  return (
    <div>
      <div className='private-message-modal'>
        <div as='h4' className='message-head-title'>
          Inbox
        </div>
        <div
          as='h4'
          className='message-head-title message-head-link'
          onClick={toggle}
        >
          <FormOutlined className='message-head-icon' />
          Compose
        </div>
        {/*    <Button type='primary' className='pinkBtn'>
          Message
        </Button> */}
      </div>
      <Modal isOpen={modal} fade={false} toggle={toggle}>
        <ModalHeader toggle={toggle}> Send Your Message</ModalHeader>
        <ModalBody>
          <Form>
            <Form.Group>
              <AutoCompleteUserSearch />
            </Form.Group>
            <Form.Group className='private-message-modal-field'>
              <Input
                className='post-form-text-input'
                type='text'
                name='subject'
                placeholder='Subject'
                onChange={e => onChange(e)}
              />
            </Form.Group>
            <Form.Group className='private-message-modal-field'>
              <Input
                className='post-form-text-input'
                type='text'
                name='subject'
                placeholder='Subject'
                onChange={e => onChange(e)}
              />
            </Form.Group>
            <Form.Group className='private-message-modal-field'>
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
        </ModalBody>
        <ModalFooter>
          <Button
            color='primary'
            onClick={e => {
              e.preventDefault();
              sendPrivateMessage(formData, history);
            }}
          >
            Send
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

PrivateMessageModal.propTypes = {
  sendPrivateMessage: PropTypes.func.isRequired
};

const mapDispatchToProps = state => ({
  hideModal: state.hideModal,
  auth: state.auth
});

export default connect(mapDispatchToProps, {
  sendPrivateMessage,
  mapDispatchToProps
})(withRouter(PrivateMessageModal));

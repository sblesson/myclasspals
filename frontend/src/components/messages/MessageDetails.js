import React, { Fragment, useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Menu, Layout, Divider, Empty, Spin } from 'antd';
import {
  getPrivateMessages,
  getPost,
  addMessageReply,
} from '../../actions/post';
import PrivateMessageModal from './modal/PrivateMessageModal';
import {
  Comment,
  Form,
  Button,
  List,
  Input,
  Card,
  Dropdown,
  Avatar,
} from 'antd';
import Ellipsis from 'ant-design-pro/lib/Ellipsis';

import './Messages.scss';
const MessageDetails = ({ post: { currentPost }, addMessageReply }) => {
  const [chatFormData, setChatForm] = useState({
    submitting: false,
    value: '',
  });

  const { TextArea } = Input;

  const onChatSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const formData = {
      message: chatFormData.value,
      endUserId: currentPost.endUserId,
      subject: currentPost.subject,
    };

    setChatForm({ ...chatFormData, ['submitting']: true });
    setChatForm({ ...chatFormData, ['value']: '' });
    addMessageReply(currentPost._id, formData);
  };

  const onChangeChatMessage = (event) => {
    event.preventDefault();
    setChatForm({ ...chatFormData, ['value']: event.target.value });
  };

  return (
    <>
      {currentPost ? (
        <Card style={{ width: '100%' }}>
          <List>
            <List.Item>
              <Comment
                avatar={
                  <Avatar size='small' className='avatar-icon' gap={4}>
                    {currentPost.userId.charAt(0)}
                  </Avatar>
                }
                key={currentPost._id}
                author={currentPost.endUserId}
                content={currentPost.message}
              ></Comment>
            </List.Item>
            {currentPost.comments &&
              currentPost.comments.length > 0 &&
              currentPost.comments.map((comment, index) => (
                <List.Item key={index}>
                  <Comment
                    key={comment._id}
                    author={comment.userId}
                    avatar={
                      <Avatar className='avatar-icon' size='small' gap={4}>
                        {comment.userId.charAt(0)}
                      </Avatar>
                    }
                    content={comment.message}
                    datetime={comment.datetime}
                  />
                </List.Item>
              ))}
          </List>
          <Divider style={{ margin: 0 }} />

          <Comment
            style={{ width: '100%' }}
            content={
              <div>
                <Form.Item>
                  <TextArea
                    name='reply'
                    className='input-block-level form-control'
                    onChange={(e) => onChangeChatMessage(e)}
                    placeholder='Type a message'
                    value={chatFormData.value}
                  />
                </Form.Item>
                <Form.Item>
                  <Button
                    htmlType='button'
                    onClick={onChatSubmit}
                    type='primary'
                    style={{ float: 'right' }}
                    className='btn-primary'
                  >
                    Send
                  </Button>
                </Form.Item>
              </div>
            }
          />
        </Card>
      ) : (
        <PrivateMessageModal noMessagesFound={true} />
      )}
    </>
  );
};

MessageDetails.propTypes = {
  getPrivateMessages: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, {
  getPrivateMessages,
  getPost,
  addMessageReply,
})(MessageDetails);

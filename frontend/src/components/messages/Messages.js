import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Menu, Layout, Divider, Empty, Spin } from 'antd';
import {
  getPrivateMessages,
  getPost,
  addMessageReply
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
  Avatar
} from 'antd';
import DeletePostModal from '../posts/modal/DeletePostModal';
import { EllipsisOutlined } from '@ant-design/icons';
import Ellipsis from 'ant-design-pro/lib/Ellipsis';

import './Messages.scss';
const Messages = ({
  getPrivateMessages,
  getPost,
  addMessageReply,
  post: { messages, loading, currentPost },
  auth,
  history
}) => {
  const { Sider, Content } = Layout;

  const [messagePanelSelected, setMessagePanelItemSelected] = useState(null);

  const [chatFormData, setChatForm] = useState({
    submitting: false,
    value: ''
  });
  useEffect(() => {
    if (auth && auth.user && auth.user.email) {
      getPrivateMessages({ userId: auth.user.email, isPrivate: true });
    } else {
      const email = localStorage.getItem('userEmail');
      getPrivateMessages({ userId: email, isPrivate: true });
    }
  }, [getPrivateMessages, auth.user._id]);

  useEffect(() => {
    const recentPost =
      messages && messages.length > 0
        ? messagePanelSelected
          ? messagePanelSelected
          : messages[0]
        : null;
    if (recentPost) {
      getPost(recentPost._id);
      const redirectUrl = `/messages/${recentPost._id}`;
      history.push(redirectUrl);
      setMessagePanelItemSelected(recentPost);
    }
  }, [messages]);

  const { TextArea } = Input;

  const handleMessageItemClick = (item, event) => {
    setMessagePanelItemSelected(item);
    getPost(item._id);
    const redirectUrl = `/messages/${item._id}`;
    history.push(redirectUrl);
  };

  const onChatSubmit = event => {
    event.preventDefault();
    event.stopPropagation();

    const formData = {
      message: chatFormData.value,
      endUserId: messagePanelSelected.endUserId,
      subject: messagePanelSelected.subject
    };

    setChatForm({ ...chatFormData, ['submitting']: true });
    setChatForm({ ...chatFormData, ['value']: '' });
    addMessageReply(messagePanelSelected._id, formData);
  };

  const onChangeChatMessage = event => {
    event.preventDefault();
    setChatForm({ ...chatFormData, ['value']: event.target.value });
  };

  const menu = (
    <Menu>
      <Menu.Item>
        {' '}
        <DeletePostModal postType='post' />
      </Menu.Item>
    </Menu>
  );

  return (
    <Fragment>
      {loading ? (
        <Spin />
      ) : (
        <Layout>
          {messages && messages.length > 0 ? (
            <Sider
              style={{
                overflow: 'auto',
                height: '100vh',
                position: 'fixed',
                left: '50',
                right: '10'
              }}
              className='message-inbox-list'
            >
              <div className='message-head'>
                <PrivateMessageModal />
              </div>
              <List
                //className='message-list'
                itemLayout='horizontal'
                dataSource={messages}
                renderItem={message => (
                  <List.Item
                    onClick={event => handleMessageItemClick(message, event)}
                    className={
                      messagePanelSelected === message ? ' selected' : ''
                    }
                  >
                    <List.Item.Meta
                      avatar={
                        <Avatar size='large' gap={4} className='avatar-icon'>
                          {auth.user.email === message.endUserId
                            ? message.userId.charAt(0)
                            : message.endUserId
                            ? message.endUserId.charAt(0)
                            : ''}
                        </Avatar>
                      }
                      title={
                        <Ellipsis length={40} tooltip>
                          {message.subject}
                        </Ellipsis>
                      }
                      description={
                        <Ellipsis length={40} tooltip>
                          {auth.user.email === message.endUserId
                            ? message.userId
                            : message.endUserId}
                        </Ellipsis>
                      }
                    />
                  </List.Item>
                )}
              />
            </Sider>
          ) : (
            ''
          )}
          <Content
            style={{
              marginLeft: 200,
              marginTop: '24',
              overflow: 'initial'
            }}
          >
            {currentPost ? (
              <Card
                title={
                  <Ellipsis length={80} tooltip>
                    {currentPost.subject}
                  </Ellipsis>
                }
                extra={
                  <Dropdown
                    overlay={menu}
                    placement='bottomCenter'
                    className='ant-dropdown-link'
                  >
                    <EllipsisOutlined />
                  </Dropdown>
                }
                style={{ width: '50%' }}
              >
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
                            <Avatar
                              className='avatar-icon'
                              size='small'
                              gap={4}
                            >
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
                          onChange={e => onChangeChatMessage(e)}
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
          </Content>
        </Layout>
      )}
    </Fragment>
  );
};

Messages.propTypes = {
  getPrivateMessages: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth
});

export default connect(mapStateToProps, {
  getPrivateMessages,
  getPost,
  addMessageReply
})(Messages);

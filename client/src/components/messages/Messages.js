import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Menu, Layout, Divider, Empty } from 'antd';
import Spinner from '../../layout/Spinner';
import {
  getPrivateMessages,
  getPost,
  addMessageReply
} from '../../actions/post';
import PrivateMessageModal from './modal/PrivateMessageModal';
import {
  Comment,
  Avatar,
  Form,
  Button,
  List,
  Input,
  Card,
  Dropdown
} from 'antd';
import DeletePostModal from '../posts/modal/DeletePostModal';
import { EllipsisOutlined } from '@ant-design/icons';
import Ellipsis from 'ant-design-pro/lib/Ellipsis';

import './Messages.scss';
const Messages = ({
  getPrivateMessages,
  getPost,
  addMessageReply,
  post: { posts, loading, currentPost },
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
    const recentPost = posts && posts.length > 0 ? posts[0] : null;
    if (recentPost) {
      setMessagePanelItemSelected(recentPost);
      getPost(recentPost._id);
      const redirectUrl = `/messages/${recentPost._id}`;
      history.push(redirectUrl);
    }
  }, [posts]);

  const { TextArea } = Input;

  const handleMessageItemClick = (item, event) => {
    setMessagePanelItemSelected(item);
    getPost(item._id);
    const redirectUrl = `/messages/${item._id}`;
    history.push(redirectUrl);
  };

  const onChatSubmit = async event => {
    event.preventDefault();

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
        <Spinner />
      ) : (
        <Layout>
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
            {posts && posts.length > 0 ? (
              <List
                //className='message-list'
                itemLayout='horizontal'
                dataSource={posts}
                renderItem={message => (
                  <List.Item
                    onClick={event => handleMessageItemClick(message, event)}
                    className={
                      messagePanelSelected === message ? ' selected' : ''
                    }
                  >
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          style={{
                            verticalAlign: 'middle',
                            background:
                              '#2980b9' /* fallback for old browsers */,
                            background:
                              '-webkit-linear-gradient(to right top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1)' /* Chrome 10-25, Safari 5.1-6 */,
                            background:
                              'linear-gradient(to right top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1)' /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
                            marginLeft: 8
                          }}
                          size='large'
                          gap={4}
                        >
                          <p className='capitalize'>
                            {auth.user.email === message.endUserId
                              ? message.userId.charAt(0)
                              : message.endUserId.charAt(0)}
                          </p>
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
            ) : (
              ''
            )}
          </Sider>
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
                  <Dropdown overlay={menu} placement='bottomCenter'>
                    <EllipsisOutlined />
                  </Dropdown>
                }
                style={{ width: '50%' }}
              >
                <List>
                  <List.Item>
                    <Comment
                      avatar={
                        <Avatar
                          style={{
                            verticalAlign: 'middle',
                            background:
                              '#2980b9' /* fallback for old browsers */,
                            background:
                              '-webkit-linear-gradient(to right top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1)' /* Chrome 10-25, Safari 5.1-6 */,
                            background:
                              'linear-gradient(to right top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1)' /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
                          }}
                          size='small'
                          gap={4}
                        >
                          <p className='capitalize'>
                            {currentPost.endUserId.charAt(0)}
                          </p>
                        </Avatar>
                      }
                      key={currentPost._id}
                      author={currentPost.endUserId}
                      content={currentPost.message}
                    ></Comment>
                  </List.Item>
                  {currentPost.comments && currentPost.comments.length > 0 && (
                    <List.Item>
                      <List
                        itemLayout='horizontal'
                        dataSource={currentPost.comments}
                        style={{ overflow: 'hidden', width: '100%' }}
                        renderItem={comment => (
                          <List.Item>
                            <Comment
                              key={comment._id}
                              author={comment.endUserId}
                              avatar={
                                <Avatar
                                  style={{
                                    verticalAlign: 'middle',
                                    background:
                                      '#2980b9' /* fallback for old browsers */,
                                    background:
                                      '-webkit-linear-gradient(to right top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1)' /* Chrome 10-25, Safari 5.1-6 */,
                                    background:
                                      'linear-gradient(to right top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1)' /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
                                  }}
                                  size='small'
                                  gap={4}
                                >
                                  <p className='capitalize'>
                                    {comment.endUserId.charAt(0)}
                                  </p>
                                </Avatar>
                              }
                              content={comment.message}
                              datetime={comment.datetime}
                            />
                          </List.Item>
                        )}
                      />
                    </List.Item>
                  )}
                </List>
                <Divider />
                <List.Item>
                  <Comment
                    content={
                      <div>
                        <Form.Item>
                          <TextArea
                            name='reply'
                            className='input-block-level form-control'
                            style={{ height: '20%', width: '100%' }}
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
                </List.Item>
              </Card>
            ) : (
              <Empty className='empty-container' description={false} />
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

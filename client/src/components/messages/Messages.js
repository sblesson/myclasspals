import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { searchPost, getPost, addMessageReply } from '../../actions/post';
import { FormOutlined } from '@ant-design/icons';
import PrivateMessageModal from './modal/PrivateMessageModal';
import { Comment, Avatar, Form, Button, List, Input, Card } from 'antd';

import { UserOutlined } from '@ant-design/icons';
import Ellipsis from 'ant-design-pro/lib/Ellipsis';

import './Messages.scss';
const Messages = ({
  searchPost,
  getPost,
  addMessageReply,
  post: { posts, loading, currentPost },
  auth,
  history
}) => {
  const [messagePanelSelected, setMessagePanelItemSelected] = useState(null);
  const [chatFormData, setChatForm] = useState({
    submitting: false,
    value: ''
  });
  useEffect(() => {
    if (auth && auth.user && auth.user.email) {
      searchPost({ userId: auth.user.email, isPrivate: true });
    } else {
      const email = localStorage.getItem('userEmail');
      searchPost({ userId: email, isPrivate: true });
    }
  }, [searchPost, auth.user._id]);

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

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className='row message-head'>
            <PrivateMessageModal />
          </div>
          <div className='row'>
            <div className='col-xs-1 col-sm-3 col-md-3 col-lg-3 message-inbox-list'>
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
                              backgroundColor: '#46bfd1'
                            }}
                            size='small'
                            icon={<UserOutlined />}
                          ></Avatar>
                        }
                        title={
                          <Ellipsis length={40} tooltip>
                            {message.endUserId}
                          </Ellipsis>
                        }
                        description={
                          <Ellipsis length={40} tooltip>
                            {message.subject}
                          </Ellipsis>
                        }
                      />
                    </List.Item>
                  )}
                />
              ) : (
                'No messages found'
              )}
            </div>
            <div className='col-xs-6 col-sm-6 col-md- col-lg-6 message-chat-history'>
              {currentPost ? (
                <Comment
                  //avatar={<i className='fas fa-users icon-group'></i>}

                  avatar={
                    <Avatar
                      src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
                      alt='Han Solo'
                    />
                  }
                >
                  <p>{currentPost.subject}</p>
                  <p>{currentPost.endUserId}</p>
                </Comment>
              ) : (
                'No message history'
              )}
              {currentPost &&
                currentPost.comments &&
                currentPost.comments.length > 0 &&
                currentPost.comments.map((item, index) => (
                  <Comment
                    key={index}
                    //avatar={<i className='fas fa-users icon-group'></i>}

                    avatar={
                      <Avatar
                        src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
                        alt='Han Solo'
                      />
                    }
                  >
                    <p>{item.message}</p>
                    <p>{item.endUserId}</p>
                  </Comment>
                ))}
              <Comment
                content={
                  <div>
                    <Form.Item>
                      <TextArea
                        name='reply'
                        rows={4}
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
            </div>{' '}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Messages.propTypes = {
  searchPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth
});

export default connect(mapStateToProps, {
  searchPost,
  getPost,
  addMessageReply
})(Messages);

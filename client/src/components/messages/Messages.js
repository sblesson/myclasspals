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
  post: { posts, loading, post },
  auth,
  history
}) => {
  useEffect(() => {
    searchPost({ userId: auth.user.email, isPrivate: true });
  }, [searchPost, auth.user._id]);
  const [messagePanelSelected, setMessagePanelItemSelected] = useState(null);
  const [chatMessage, setChatMessage] = useState(null);

  const { TextArea } = Input;

  const handleMessageItemClick = (item, event) => {
    console.log(item);
    setMessagePanelItemSelected(item);
    getPost(item._id);

    const redirectUrl = `/messages/${item._id}`;
    console.log(redirectUrl);
    history.push(redirectUrl);
  };

  const onChatSubmit = async e => {
    e.preventDefault();
    console.log(e);
    console.log(messagePanelSelected);
    const formData = {
      message: chatMessage,
      //endUserId: messagePanelSelected.endUserId,
      isPrivate: true,
      subject: messagePanelSelected.subject
    };
    addMessageReply(messagePanelSelected._id, formData);
  };
  const onChangeChatMessage = event => {
    setChatMessage(event.target.value);
  };
  const comments = [
    {
      author: 'Han Solo',
      avatar:
        'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      content: <p>{'this.state.value'}</p>,
      datetime: '12-12-12'
    },
    {
      author: 'Saaaa dsdfs',
      avatar:
        'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      content: <p>{'this.state.value'}</p>,
      datetime: '12-12-12'
    }
  ];
  const CommentList = ({ comments }) => (
    <List
      dataSource={comments}
      itemLayout='horizontal'
      renderItem={props => <Comment {...props} />}
    />
  );

  const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <div>
      <Form.Item>
        <TextArea
          // name='reply'
          rows={4}
          onChange={e => onChangeChatMessage(e)}
          placeholder='Type a message'
        />
      </Form.Item>
      <Form.Item>
        <Button
          htmlType='submit'
          loading={submitting}
          onClick={onChatSubmit}
          type='primary'
        >
          Send
        </Button>
      </Form.Item>
    </div>
  );
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className='message-head'>
            <PrivateMessageModal />
          </div>
          <div className='row'>
            <div className='col-xs-1 col-sm-3 col-md-3 col-lg-3'>
              {posts && posts.length > 0 ? (
                <List
                  className='message-list'
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
                          <Ellipsis length={100} tooltip>
                            {message.subject}
                          </Ellipsis>
                        }
                        description={
                          <Ellipsis length={100} tooltip>
                            {message.userId}
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

            <div className='col-xs-6 col-sm-6 col-md- col-lg-6'>
              {post ? (
                <Card style={{ width: 300 }}>
                  <p>{post.endUserId}</p>

                  <p>{post.subject}</p>
                  <p>{post.endUserId}</p>
                  <p>{post.message}</p>
                </Card>
              ) : (
                'No message history'
              )}
              {comments.length > 0 && <CommentList comments={posts.comments} />}
              <Comment
                avatar={
                  <Avatar
                    src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
                    alt='Han Solo'
                  />
                }
                content={
                  <Editor

                  //onChange={this.handleChange}
                  //onSubmit={this.handleSubmit}
                  //submitting={submitting}
                  //value={value}
                  />
                }
              />

              {/*              <List
                className='message-content'
                itemLayout='horizontal'
                dataSource={post}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
                      }
                      title={<a href='https://ant.design'>{item.subject}</a>}
                      description={item.message}
                    />
                  </List.Item>
                )}
              /> */}
            </div>
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

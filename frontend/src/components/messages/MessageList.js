import React, { useState } from 'react';
import { List, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import Ellipsis from 'ant-design-pro/lib/Ellipsis';

const MessageList = React.memo(({ messages, messageUrl, userEmail }) => {
  console.log('MessageList' + messages);
  const [messagePanelSelected, setMessagePanelItemSelected] = useState(
    messages ? messages[0]._id : null
  );

  const handleMessageItemClick = (item, event) => {
    console.log(event);
    setMessagePanelItemSelected(item._id);
  };
  return (
    <List
      className='message-list'
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 50,
        hideOnSinglePage: true,
      }}
      itemLayout='vertical'
      size='small'
      dataSource={messages}
      renderItem={(message) => (
        <List.Item
          key={message._id}
          onClick={(event) => handleMessageItemClick(message, event)}
          className={
            messagePanelSelected === message._id ? 'selected' : 'spider'
          }
        >
          <Link to={`${messageUrl}${message._id}`}>
            {' '}
            <List.Item.Meta
              avatar={
                <Avatar size='large' gap={4} className='avatar-icon'>
                  {userEmail === message.endUserId
                    ? message.userId.charAt(0)
                    : message.endUserId
                    ? message.endUserId.charAt(0)
                    : ''}
                </Avatar>
              }
              title={message.subject}
              description={
                <Ellipsis length={40} tooltip>
                  {userEmail === message.endUserId
                    ? message.userId
                    : message.endUserId}
                </Ellipsis>
              }
            />
          </Link>
        </List.Item>
      )}
    />
  );
});

export default MessageList;

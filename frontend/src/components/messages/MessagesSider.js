import React from 'react';
import MessageList from './MessageList';

const MessagesSider = ({ messages, messageUrl, userEmail }) => {
  return (
    <div className='sider'>
      {messages && messages.length > 0 && (
        <MessageList
          messages={messages}
          messageUrl={messageUrl}
          userEmail={userEmail}
        />
      )}
    </div>
  );
};

export default MessagesSider;

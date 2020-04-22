import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { List, Button } from 'semantic-ui-react';
const MessageItem = ({ message }) => {
  return (
    <List.Item key={message._id} className='message-content'>
      <List.Content>
        <List.Header>
          <Link to={`/profile/${message.userId}`}>{message.userName}</Link>
        </List.Header>
        <List.Description>{message.subject}</List.Description>

        <List.Description>{message.message}</List.Description>
      </List.Content>
    </List.Item>
  );
};

MessageItem.propTypes = {
  message: PropTypes.object.isRequired
};

export default MessageItem;

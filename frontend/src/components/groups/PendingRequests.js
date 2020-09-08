import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card, List, Avatar, Comment, Typography } from 'antd';

const PendingRequests = ({ member }) => {
  const { Text } = Typography;

  return (
    <List.Item key={`${member.requestorUserId}-mrequest-card`}>
      <Card hoverable={false} bordered={false}>
        <Comment
          avatar={
            <Avatar size='small' className='avatar-icon' gap={4}>
              {member.invitedUserId ? member.invitedUserId.charAt(0) : ''}
            </Avatar>
          }
          key={member.invitedUserId}
          author={
            member.role === 'admin' ? (
              <Link to={`/profile/${member.groupId}/${member.invitedUserId}`}>
                {member.invitedUserId}
              </Link>
            ) : (
              <Text>{member.invitedUserId}</Text>
            )
          }
        ></Comment>
      </Card>
    </List.Item>
  );
};

PendingRequests.propTypes = {
  member: PropTypes.object.isRequired,
};

export default PendingRequests;

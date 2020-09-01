import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card, List, Avatar, Comment } from 'antd';

import { approveUserGroupRequest } from '../../actions/group';

const PendingInvitations = ({ member }) => {
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
            <Link to={`/profile/${member.groupId}/${member.invitedUserId}`}>
              {member.invitedUserId}
            </Link>
          }
        ></Comment>
      </Card>
    </List.Item>
  );
};

PendingInvitations.propTypes = {
  member: PropTypes.object.isRequired,
};

export default connect(null, {
  approveUserGroupRequest,
})(PendingInvitations);

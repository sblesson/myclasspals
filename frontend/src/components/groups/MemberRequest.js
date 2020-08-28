import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Card,
  Menu,
  message,
  Tag,
  Button,
  Dropdown,
  List,
  Avatar,
  Comment
} from 'antd';

import { approveUserGroupRequest } from '../../actions/group';

const MemberRequest = ({ member, approveUserGroupRequest }) => {
  const approveUserGroupRequestClick = record => {
    approveUserGroupRequest({
      groupId: record.groupId,
      role: record.role,
      requestorUserId: record.requestorUserId
    });
  };

  return (
    <List.Item key={`${member.requestorUserId}-mrequest-card`}>
      <Card hoverable={false} bordered={false}>
        <Comment
          avatar={
            <Avatar size='small' className='avatar-icon' gap={4}>
              {member.requestorUserId ? member.requestorUserId.charAt(0) : ''}
            </Avatar>
          }
          key={member.requestorUserId}
          author={
            <Link to={`/profile/${member.groupId}/${member.requestorUserId}`}>
              {member.requestorUserId}
            </Link>
          }
          content={
            member.role ? (
              <Button
                key={`${member.groupId}_approve_request_btn`}
                className='btn-primary float-right'
                onClick={() => approveUserGroupRequestClick(member)}
              >
                {'Approve'}
              </Button>
            ) : (
              ''
            )
          }
        ></Comment>
      </Card>
    </List.Item>
  );
};

MemberRequest.propTypes = {
  member: PropTypes.object.isRequired
};

export default connect(null, {
  approveUserGroupRequest
})(MemberRequest);

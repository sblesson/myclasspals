import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card, Menu, message, Tag, Button, Dropdown } from 'antd';

import { UserOutlined, DownOutlined } from '@ant-design/icons';
import {
  acceptUserGroupInvitation,
  declineUserGroupRequest,
  requestToJoinUserGroup
} from '../../actions/group';

const UserCard = ({
  currentGroup,
  user,
  key,
  index,
  type,
  auth,
  acceptUserGroupInvitation,
  declineUserGroupRequest,
  requestToJoinUserGroup
}) => {
  const { Meta } = Card;

  const requestToJoinUserGroupClickHandler = record => {
    requestToJoinUserGroup({
      groupId: record.id,
      role: 'member',
      requestorUserId: auth.user.email,
      origin: 'discovergroup'
    });
  };

  const isLoggedInUserJoinedUserGroup = group => {
    let isUserJoinedGroup = false;
    let memberArr = [];
    const userId = localStorage.getItem('userId');

    if (group && group.userGroupMembers && group.userGroupMembers.length > 0) {
      memberArr = group.userGroupMembers.filter(item => {
        return item._id === userId;
      });
    }
    if (memberArr && memberArr.length > 0) {
      //current user is already part of group
      isUserJoinedGroup = true;
    }
    return isUserJoinedGroup;
  };
  const onClick = ({ key }) => {
    message.info(`Click on item ${key}`);
  };
  const menu = (
    <Menu onClick={onClick}>
      <Menu.Item key='1'>Leave Group</Menu.Item>
      <Menu.Item key='2'>Set as Moderator</Menu.Item>
      <Menu.Item key='3'>Set as Member</Menu.Item>
    </Menu>
  );

  const acceptPendingInviteActionClick = record => {
    acceptUserGroupInvitation({
      groupId: record.id,
      role: 'member',
      invitedUserId: auth.user.email
    });
  };

  return (
    <Card
      key={index}
      style={{
        width: 300,
        marginBottom: 16
      }}
      actions={[]}
    >
      <Link to={`/profile/${user._id}`}>
        <Meta
          avatar={
            user.role ? (
              <Tag
                color={user.role === 'admin' ? 'geekblue' : 'green'}
                key={user.role}
              >
                {user.role ? user.role.toUpperCase() : null}
              </Tag>
            ) : (
              ''
            )
          }
          title={user.name}
        >
          {' '}
        </Meta>
      </Link>
    </Card>
  );
};

UserCard.propTypes = {
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {
  acceptUserGroupInvitation,
  declineUserGroupRequest,
  requestToJoinUserGroup
})(UserCard);

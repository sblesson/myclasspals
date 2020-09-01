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
  Comment,
  Typography,
} from 'antd';

import { UserOutlined, DownOutlined } from '@ant-design/icons';
import {
  acceptUserGroupInvitation,
  declineUserGroupRequest,
  requestToJoinUserGroup,
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
  requestToJoinUserGroup,
}) => {
  const { Meta } = Card;
  const { Text } = Typography;

  const requestToJoinUserGroupClickHandler = (record) => {
    requestToJoinUserGroup({
      groupId: record.id,
      role: 'member',
      requestorUserId: auth.user.email,
      origin: 'discovergroup',
    });
  };

  const isLoggedInUserJoinedUserGroup = (group) => {
    let isUserJoinedGroup = false;
    let memberArr = [];
    const userId = localStorage.getItem('userId');

    if (group && group.userGroupMembers && group.userGroupMembers.length > 0) {
      memberArr = group.userGroupMembers.filter((item) => {
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

  const acceptPendingInviteActionClick = (record) => {
    acceptUserGroupInvitation({
      groupId: record.id,
      role: 'member',
      invitedUserId: auth.user.email,
    });
  };

  return (
    <List.Item key={`user-card-${user._id}`}>
      <Comment
        avatar={
          <Avatar size='small' className='avatar-icon' gap={4}>
            {user.name ? user.name.charAt(0) : ''}
          </Avatar>
        }
        key={user._id}
        author={
          user.role === 'admin' ? (
            <Link to={`/profile/${currentGroup.id}/${user._id}`}>
              {user.name}
            </Link>
          ) : (
            <Text>{user.name}</Text>
          )
        }
        content={
          user.role ? (
            <Tag
              color={user.role === 'admin' ? 'geekblue' : 'green'}
              key={user.role}
            >
              {user.role ? user.role : null}
            </Tag>
          ) : (
            ''
          )
        }
      ></Comment>
    </List.Item>
  );
};

UserCard.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  acceptUserGroupInvitation,
  declineUserGroupRequest,
  requestToJoinUserGroup,
})(UserCard);

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card, Menu, message, Tag, Button, Dropdown } from 'antd';

import { DownOutlined } from '@ant-design/icons';
import {
  getAllGroups,
  acceptUserGroupInvitation,
  declineUserGroupRequest,
  requestToJoinUserGroup
} from '../../actions/group';

const GroupCard = ({
  currentGroup,
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
    const userId = JSON.parse(localStorage.getItem('user'))._id;

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

  const groupActionMenu = group => {
    console.log(type);
    console.log('yay' + group);
    switch (type) {
      case 'discover': {
        //if user part of user group
        let isMemberUserGroup = isLoggedInUserJoinedUserGroup(group);

        if (!isMemberUserGroup && !group.isRequestUserGroupSuccess) {
          return (
            <Button
              type='link'
              style={{ marginRight: 16 }}
              onClick={() => requestToJoinUserGroupClickHandler(group)}
            >
              {' '}
              Join
            </Button>
          );
        } else if (isMemberUserGroup) {
          return <Tag color={'green'}>{'Joined'}</Tag>;
        }
      }
      case 'mygroups': {
        return (
          <Dropdown overlay={menu} placement='bottomCenter'>
            <a className='ant-dropdown-link' onClick={e => e.preventDefault()}>
              <DownOutlined />
            </a>
          </Dropdown>
        );
      }

      case 'pendingInvitedUserGroups': {
        return (
          <Button
            type='link'
            style={{ marginRight: 16 }}
            onClick={() => acceptPendingInviteActionClick(group)}
          >
            Join
          </Button>
        );
      }

      case 'requestedUserGroup': {
        return (
          <Button
            type='link'
            style={{ marginRight: 16 }}
            onClick={() => declineUserGroupRequest(group)}
          >
            Withdraw
          </Button>
        );
      }
      default:
        return;
    }
  };

  return (
    <Card
      key={index}
      style={{
        width: 300,
        marginBottom: 16
      }}
      actions={[
        <div className='member-count'>
          {currentGroup.userGroupMembers.length === 1
            ? currentGroup.userGroupMembers.length + ' member'
            : currentGroup.userGroupMembers.length + ' members'}{' '}
        </div>,
        null,
        groupActionMenu(currentGroup)
      ]}
    >
      <Link to={`/group/${currentGroup.id}`}>
        <Meta
          avatar={<i className='fas fa-users icon-group'></i>}
          title={currentGroup.groupName}
          description={currentGroup.description}
        >
          {' '}
        </Meta>
      </Link>
      {currentGroup.role ? (
        <Tag
          color={currentGroup.role === 'admin' ? 'geekblue' : 'green'}
          key={currentGroup.role}
        >
          {currentGroup.role ? currentGroup.role.toUpperCase() : null}
        </Tag>
      ) : (
        ''
      )}

      {currentGroup.privacy ? <div>{currentGroup.privacy}</div> : ''}
      {currentGroup.createdDate ? <div>{currentGroup.createdDate}</div> : ''}
    </Card>
  );
};

GroupCard.propTypes = {
  currentGroup: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {
  acceptUserGroupInvitation,
  declineUserGroupRequest,
  requestToJoinUserGroup
})(GroupCard);

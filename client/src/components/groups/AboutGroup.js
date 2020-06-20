import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card, Menu, message, Tag, Button, Dropdown } from 'antd';

import { DownOutlined } from '@ant-design/icons';

import {
  getGroupDetails,
  acceptUserGroupInvitation,
  declineUserGroupRequest,
  requestToJoinUserGroup
} from '../../actions/group';

const AboutGroup = ({
  index,
  type,
  auth,
  group,
  acceptUserGroupInvitation,
  declineUserGroupRequest,
  requestToJoinUserGroup,
  getGroupDetails,
  match,
  history
}) => {
  useEffect(() => {
    getGroupDetails(match.params.id);
  }, [getGroupDetails, match.params.id]);

  const { Meta } = Card;

  const requestToJoinUserGroupClickHandler = record => {
    requestToJoinUserGroup(
      {
        groupId: record.id,
        role: 'member',
        requestorUserId: auth.user.email,
        origin: 'discovergroup'
      },
      groupId => {
        window.location.pathname = '/group/' + groupId;
      }
    );
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

  const isCurrentGroupRequestedGroup = (currentGroup, group) => {
    let isGroupRequested = false;
    let requestedGroupArr = group.requestedUserGroup.filter(
      item => item.groupId === currentGroup.groupId
    );

    if (requestedGroupArr && requestedGroupArr.length > 0) {
      //current user is already part of group
      isGroupRequested = true;
    }
    return isGroupRequested;
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

  const groupActionMenu = (currentGroup, group) => {
    switch (type) {
      case 'discover': {
        //if user part of user group
        let isMemberUserGroup = isLoggedInUserJoinedUserGroup(currentGroup);
        let isGroupRequested = isCurrentGroupRequestedGroup(
          currentGroup,
          group
        );
        if (
          !isMemberUserGroup &&
          !group.currentGroup.isRequestUserGroupSuccess
        ) {
          return (
            <Button
              type='link'
              style={{ marginRight: 16 }}
              onClick={() => requestToJoinUserGroupClickHandler(currentGroup)}
            >
              {' '}
              Join
            </Button>
          );
        } else if (isMemberUserGroup & currentGroup.isRequestUserGroupSuccess) {
          return <Tag color={'green'}>{'Joined'}</Tag>;
        }
      }
      case 'mygroup': {
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
        width: '100%',
        marginBottom: 16,
        textAlign: 'center'
      }}
      actions={[
        <div className='member-count'>
          {group.currentGroup.userGroupMembers.length === 1
            ? group.currentGroup.userGroupMembers.length + ' member'
            : group.currentGroup.userGroupMembers.length + ' members'}{' '}
        </div>,
        null,
        groupActionMenu(group.currentGroup, group)
      ]}
    >
      <Link to={`/group/${group.currentGroup.id}`}>
        <Meta
          avatar={<i className='fas fa-users icon-group'></i>}
          title={group.currentGroup.groupName}
          description={group.currentGroup.description}
        >
          {' '}
        </Meta>
      </Link>
      {group.currentGroup.role ? (
        <Tag
          color={group.currentGroup.role === 'admin' ? 'geekblue' : 'green'}
          key={group.currentGroup.role}
        >
          {group.currentGroup.role
            ? group.currentGroup.role.toUpperCase()
            : null}
        </Tag>
      ) : (
        ''
      )}

      {group.currentGroup.privacy ? (
        <div>{group.currentGroup.privacy}</div>
      ) : (
        ''
      )}
      {group.currentGroup.createdDate ? (
        <div>{group.currentGroup.createdDate}</div>
      ) : (
        ''
      )}
    </Card>
  );
};

AboutGroup.propTypes = {
  currentGroup: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  auth: state.auth,
  group: state.group
});

export default connect(mapStateToProps, {
  acceptUserGroupInvitation,
  declineUserGroupRequest,
  requestToJoinUserGroup,
  getGroupDetails
})(AboutGroup);

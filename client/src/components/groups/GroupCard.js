import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card, Menu, message, Tag, Button, Dropdown } from 'antd';
import _ from 'lodash';

import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined
} from '@ant-design/icons';

import {
  getAllGroups,
  acceptUserGroupInvitation,
  requestToJoinUserGroup
} from '../../actions/group';

import './GroupCard.scss';

const GroupCard = ({
  currentGroup,
  index,
  type,
  auth,
  group,
  acceptUserGroupInvitation,
  requestToJoinUserGroup,
  history
}) => {
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
    let requestedGroupArr = [];
    if (
      group &&
      group.requestedUserGroup &&
      group.requestedUserGroup.length > 0
    ) {
      requestedGroupArr = group.requestedUserGroup.filter(
        item => item.groupId === currentGroup.groupId
      );
    }

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
    </Menu>
  );

  const acceptPendingInviteActionClick = record => {
    acceptUserGroupInvitation({
      groupId: record.id,
      role: 'member',
      invitedUserId: auth.user.email
    });
  };

  const adminMemberActionMenu = (
    <Dropdown overlay={menu} placement='bottomCenter'>
      <a className='ant-dropdown-link' onClick={e => e.preventDefault()}>
        <EllipsisOutlined />
      </a>
    </Dropdown>
  );

  const groupActionMenu = (currentGroup, group) => {
    const memberActions = [
      ((<SettingOutlined key='setting' />),
      (<EditOutlined key='edit' />),
      (<EllipsisOutlined key='ellipsis' />))
    ];
    console.log(type);
    switch (type) {
      case 'discover': {
        /*         //if user part of user group
        let isMemberUserGroup = isLoggedInUserJoinedUserGroup(currentGroup);
        let isGroupRequested = isCurrentGroupRequestedGroup(
          currentGroup,
          group
        );
        if (currentGroup.role === null) {
          return [
            <Button
              type='link'
              style={{ marginRight: 16 }}
              onClick={() => requestToJoinUserGroupClickHandler(currentGroup)}
            >
              {' '}
              Join
            </Button>
          ];
        } else {
          return [<Tag color={'green'}>{currentGroup.role}</Tag>];
        } */
        return null;
      }
      case 'mygroup': {
        if (currentGroup.role === null) {
          //non members
          if (currentGroup.privacy === 'PUBLIC') {
            //display join button for public group
            return [
              null,
              null,
              <Button
                type='link'
                style={{ marginRight: 16 }}
                onClick={() => requestToJoinUserGroupClickHandler(currentGroup)}
              >
                {' '}
                Join
              </Button>
            ];
          } else {
            //display request button for private group
            return [
              null,
              null,
              <Button
                type='link'
                style={{ marginRight: 16 }}
                onClick={() => requestToJoinUserGroupClickHandler(currentGroup)}
              >
                {' '}
                Request
              </Button>
            ];
          }
        } else if (currentGroup.role === 'admin') {
          return [
            <Tag color={'green'}>{currentGroup.role}</Tag>,
            <SettingOutlined key='setting' />,
            <Dropdown overlay={menu} placement='bottomCenter'>
              <a
                className='ant-dropdown-link'
                onClick={e => e.preventDefault()}
              >
                <EllipsisOutlined />
              </a>
            </Dropdown>
          ];
        } else if (currentGroup.role === 'member') {
          return [
            <Tag color={'green'}>{currentGroup.role}</Tag>,
            null,
            <Dropdown overlay={menu} placement='bottomCenter'>
              <a
                className='ant-dropdown-link'
                onClick={e => e.preventDefault()}
              >
                <EllipsisOutlined />
              </a>
            </Dropdown>
          ];
        }
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

      default:
        return;
    }
  };

  const getGroupPrivacyLabel = privacy => {
    if (privacy) {
      let groupPrivacy = privacy.toLowerCase();
      groupPrivacy = _.startCase(groupPrivacy);

      if (privacy === 'PRIVATE') {
        return (
          <span>
            <i className='fa fa-lock' title='private group'></i>&nbsp;
            {groupPrivacy}
          </span>
        );
      } else {
        return (
          <span>
            <i className='fa fa-globe' title='public group'></i>
            &nbsp;{groupPrivacy}
          </span>
        );
      }
    }
  };

  const getGroupMemberCount = currentGroup => {
    if (
      currentGroup &&
      currentGroup.userGroupMembers &&
      currentGroup.userGroupMembers.length > 0
    ) {
      if (currentGroup.userGroupMembers.length === 1) {
        return (
          <div>
            {getGroupPrivacyLabel(currentGroup.privacy)} &nbsp;
            {currentGroup.userGroupMembers.length} member
          </div>
        );
      } else {
        return (
          <div>
            {getGroupPrivacyLabel()} &nbsp;
            {currentGroup.userGroupMembers.length} members
          </div>
        );
      }
    }
  };

  return (
    <Card
      key={index}
      style={{
        width: '100%',
        marginBottom: 16,
        textAlign: 'left'
      }}
      /*     extra={
        currentGroup.role === null && (
          <Button
            type='link'
            style={{ marginRight: 16 }}
            onClick={() => requestToJoinUserGroupClickHandler(currentGroup)}
          >
            {' '}
            Join
          </Button>
        )
      } */
      actions={groupActionMenu(currentGroup, type)}
    >
      <Link to={`/dashboard/${currentGroup.id}`}>
        <Meta
          avatar={
            currentGroup.isSchoolGroup === 'no' ? (
              <i className='fas fa-users icon-group'></i>
            ) : (
              <i className='fas fa-school icon-group' title='school group'></i>
            )
          }
          title={currentGroup.groupName}
        ></Meta>
      </Link>
      <Meta
        className='group-card-member-privacy'
        description={getGroupMemberCount(currentGroup)}
      ></Meta>

      {/*       <Link to={`/dashboard/${currentGroup.id}`}>
        <Meta description={currentGroup.description}> </Meta>
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
      )} */}
    </Card>
  );
};

GroupCard.propTypes = {
  currentGroup: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  auth: state.auth,
  group: state.group
});

export default connect(mapStateToProps, {
  acceptUserGroupInvitation,
  requestToJoinUserGroup
})(GroupCard);

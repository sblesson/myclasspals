import React, { useState } from 'react';
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
  requestToJoinUserGroup,
  searchGroupWithFilters
} from '../../actions/group';

import './GroupCard.scss';

const GroupCardtem = ({
  currentGroup,
  index,
  type,
  auth,
  group,
  acceptUserGroupInvitation,
  requestToJoinUserGroup,
  searchGroupWithFilters
}) => {
  const { Meta } = Card;
  const [isRequestUpdated, setRequestUpdate] = useState(false);

  const requestToJoinUserGroupClickHandler = record => {
    requestToJoinUserGroup(
      {
        groupId: record.id,
        role: 'member',
        requestorUserId: auth.user.email
      },
      record,
      userGroup => {
        console.log(userGroup);
        //searchGroupWithFilters({ groupKeyword: group.searchTerm });
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

  const groupActionMenu = currentGroup => {
    if (currentGroup.role === null) {
      //non members
      if (currentGroup.privacy === 'PUBLIC') {
        //display join button for public group
        return (
          <Button
            className='btn-primary'
            onClick={() => requestToJoinUserGroupClickHandler(currentGroup)}
          >
            {'Join'}
          </Button>
        );
      } else {
        //display request button for private group
        return (
          <Button
            className='btn-primary'
            onClick={() => requestToJoinUserGroupClickHandler(currentGroup)}
          >
            {'Request'}
          </Button>
        );
      }
    } else if (currentGroup.role === 'admin') {
      return (
        <div>
          <Tag color={'blue'}>{currentGroup.role}</Tag>
          {currentGroup.userGroupMembers.length} member
        </div>
      );
    } else if (currentGroup.role === 'member') {
      return (
        <div>
          <Tag color={'geekblue'}>{currentGroup.role}</Tag>
          {currentGroup.userGroupMembers.length} member
        </div>
      );
    } else if (currentGroup.role === 'Pending Invitation') {
      return (
        <div>
          {' '}
          <Tag color={'green'}>{currentGroup.role}</Tag>
          {currentGroup.userGroupMembers.length} member
        </div>
      );
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

  const getGroupPrivacy = currentGroup => {
    if (
      currentGroup &&
      currentGroup.userGroupMembers &&
      currentGroup.userGroupMembers.length > 0
    ) {
      if (currentGroup.userGroupMembers.length === 1) {
        return <div>{getGroupPrivacyLabel(currentGroup.privacy)} &nbsp;</div>;
      } else {
        return <div>{getGroupPrivacyLabel()} &nbsp;</div>;
      }
    }
  };

  return (
    <Card
      key={index}
      style={{
        width: '100%',
        textAlign: 'left',
        padding: 10
      }}
    >
      <Link to={`/group/${currentGroup.id}`}>
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
        className='group-card-meta-desc'
        description={getGroupPrivacy(currentGroup)}
      ></Meta>
      {currentGroup.schoolName ? (
        <Meta
          className='group-card-meta-desc'
          description={
            currentGroup.schoolName
              ? `School Name: ${currentGroup.schoolName}`
              : ''
          }
        />
      ) : (
        ''
      )}

      <Meta
        className='group-card-meta-desc'
        description={groupActionMenu(currentGroup)}
      ></Meta>
      {currentGroup.isGroupStatusUpdated ? (
        <Link
          className='group-card-update-status-link'
          to={`/group/${currentGroup.id}`}
        >
          Peek inside
        </Link>
      ) : (
        ''
      )}
    </Card>
  );
};

GroupCardtem.propTypes = {
  currentGroup: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  auth: state.auth,
  group: state.group
});

export default connect(mapStateToProps, {
  acceptUserGroupInvitation,
  requestToJoinUserGroup,
  searchGroupWithFilters
})(GroupCardtem);

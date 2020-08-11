import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card, Menu, Tag, Button, Dropdown } from 'antd';
import _ from 'lodash';
import DeleteGroupModal from './modal/DeleteGroupModal';

import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined
} from '@ant-design/icons';

import {
  acceptUserGroupInvitation,
  requestToJoinUserGroup,
  deleteGroup
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
  deleteGroup
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

  const onClick = key => {
    if (key === 'deletegroup') {
      console.log('deletegroup');
    } else if (key === 'editpost') {
    }
  };

  const menu = (
    <Menu onClick={onClick}>
      <Menu.Item key='deletegroup'>
        {' '}
        <DeleteGroupModal groupId={currentGroup.id} />
      </Menu.Item>
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

  const groupActionMenu = (currentGroup, type) => {
    debugger;
    if (currentGroup) {
      switch (type) {
        case 'mygroup':
        case 'discover':
          if (currentGroup.role === null) {
            //non members
            if (currentGroup.privacy === 'PUBLIC') {
              //display join button for public group
              return (
                <Button
                  key={`${currentGroup.id}_join_btn`}
                  className='btn-primary'
                  onClick={() =>
                    requestToJoinUserGroupClickHandler(currentGroup)
                  }
                >
                  {'Join'}
                </Button>
              );
            } else {
              //display request button for private group
              return (
                <Button
                  className='btn-primary'
                  key={`${currentGroup.id}_request_btn`}
                  onClick={() =>
                    requestToJoinUserGroupClickHandler(currentGroup)
                  }
                >
                  {'Request'}
                </Button>
              );
            }
          } else if (currentGroup.role === 'admin') {
            return (
              <Dropdown
                overlay={menu}
                placement='bottomCenter'
                style={{ float: 'right' }}
              >
                <a
                  className='ant-dropdown-link'
                  onClick={e => e.preventDefault()}
                >
                  <EllipsisOutlined />
                </a>
              </Dropdown>
            );
          } else if (currentGroup.role === 'member') {
            return null;
          } else if (
            currentGroup.role === 'Pending Invitation' ||
            currentGroup.role === 'Pending Requests'
          ) {
            return <Tag color='green'>{currentGroup.role}</Tag>;
          }
        case 'pendingInvitedUserGroups': {
          if (type === 'discover' && currentGroup.privacy === 'PRIVATE') {
            return (
              <Button
                key={`${currentGroup.id}_pending_join_btn`}
                className='btn-primary'
                onClick={() => acceptPendingInviteActionClick(currentGroup)}
              >
                {'Request'}
              </Button>
            );
          } else {
            return (
              <Button
                key={`${currentGroup.id}_pending_join_btn`}
                className='btn-primary'
                onClick={() => acceptPendingInviteActionClick(currentGroup)}
              >
                {'Join'}
              </Button>
            );
          }
        }
        default:
          return null;
      }
    }
  };

  const getUserGroupRole = currentGroup => {
    if (currentGroup.role === 'admin') {
      return <Tag color={'blue'}>{currentGroup.role}</Tag>;
    } else if (currentGroup.role === 'member') {
      return <Tag color={'geekblue'}>{currentGroup.role}</Tag>;
    } else if (currentGroup.role === 'y      hb youhkujhjmhjhkhvitation') {
      return <Tag color={'green'}>{currentGroup.role}</Tag>;
    }
  };

  const getUserGroupMemberCount = currentGroup => {
    if (currentGroup && currentGroup.userGroupMembers) {
      if (currentGroup.userGroupMembers.length <= 1) {
        return `${currentGroup.userGroupMembers.length} member`;
      } else if (currentGroup.userGroupMembers.length > 1) {
        return `${currentGroup.userGroupMembers.length} members`;
      }
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
        return <div>{getGroupPrivacyLabel(currentGroup.privacy)}</div>;
      } else {
        return <div>{getGroupPrivacyLabel()}</div>;
      }
    }
  };

  return (
    <Card key={index} className='discover-group-card'>
      <Link to={`/group/${currentGroup.id}`}>
        <Meta
          avatar={
            currentGroup.isSchoolGroup === 'no' ? (
              <i
                className='fas fa-users icon-group no-padding'
                style={{ paddingRight: 0 }}
              ></i>
            ) : (
              <i
                className='fas fa-school icon-group no-padding'
                title='school group'
              ></i>
            )
          }
          title={currentGroup.groupName}
        ></Meta>
      </Link>
      <Meta
        className='group-card-meta-privacy no-padding'
        description={getGroupPrivacy(currentGroup)}
      ></Meta>

      <Meta
        className='group-card-meta-count no-padding'
        description={getUserGroupMemberCount(currentGroup)}
      ></Meta>

      <Meta
        className='group-card-meta-role no-padding'
        description={getUserGroupRole(currentGroup)}
      ></Meta>
      <Meta
        className='group-card-meta-action group-action no-padding'
        description={groupActionMenu(currentGroup, type)}
      ></Meta>
      {currentGroup.schoolName ? (
        <Meta
          className='group-card-meta-desc no-padding'
          description={
            currentGroup.schoolName
              ? `School Name: ${currentGroup.schoolName}`
              : ''
          }
        />
      ) : (
        ''
      )}

      {currentGroup.isGroupStatusUpdated ? (
        <Meta
          className='group-card-update-status-link no-padding'
          description={
            <Link to={`/group/${currentGroup.id}`}>Peek inside</Link>
          }
        />
      ) : (
        ''
      )}
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

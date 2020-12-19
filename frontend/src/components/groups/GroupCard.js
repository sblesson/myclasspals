import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card, Menu, Tag, Button, Dropdown, Avatar } from 'antd';
import _ from 'lodash';
import DeleteGroupModal from './modal/DeleteGroupModal';

import './GroupCard.scss';

import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons';

import {
  acceptUserGroupInvitation,
  requestToJoinUserGroup,
  deleteGroup,
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
  deleteGroup,
  newRegistration,
}) => {
  let history = useHistory();

  const { Meta } = Card;
  const [isRequestUpdated, setRequestUpdate] = useState(false);

  const requestToJoinUserGroupClickHandler = (record) => {
    requestToJoinUserGroup(
      {
        groupId: record.id,
        role: 'member',
        requestorUserId: auth.user.email,
      },
      record,
      () => {
        if (newRegistration) {
          history.push(`/dashboard/${record.id}`);
        }
        //searchGroupWithFilters({ groupKeyword: group.searchTerm });
      }
    );
  };

  const onClick = (key) => {
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
  const acceptPendingInviteActionClick = (record) => {
    acceptUserGroupInvitation(
      {
        groupId: record.id,
        role: 'member',
        invitedUserId: auth.user.email,
      },
      () => {
        if (newRegistration) {
          history.push(`/dashboard/${record.id}`);
        }
        window.location.reload();
      }
    );
  };

  const adminMemberActionMenu = (
    <Dropdown overlay={menu} placement='bottomCenter'>
      <a className='ant-dropdown-link' onClick={(e) => e.preventDefault()}>
        <EllipsisOutlined />
      </a>
    </Dropdown>
  );

  const groupActionMenu = (currentGroup, type) => {
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
              <Dropdown overlay={menu} className='group-card-action-dropdown'>
                <a
                  className='ant-dropdown-link'
                  onClick={(e) => e.preventDefault()}
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

  const getUserGroupRole = (currentGroup) => {
    if (currentGroup.role === 'admin') {
      return <Tag color={'blue'}>{currentGroup.role}</Tag>;
    } else if (currentGroup.role === 'member') {
      return <Tag color={'geekblue'}>{currentGroup.role}</Tag>;
    } else if (currentGroup.role === 'pending invitation') {
      return <Tag color={'green'}>{currentGroup.role}</Tag>;
    }
  };

  const getUserGroupMemberCount = (currentGroup) => {
    if (currentGroup && currentGroup.userGroupMembers) {
      if (currentGroup.userGroupMembers.length <= 1) {
        return `${currentGroup.userGroupMembers.length} member`;
      } else if (currentGroup.userGroupMembers.length > 1) {
        return `${currentGroup.userGroupMembers.length} members`;
      }
    }
  };

  const getGroupPrivacy = (privacy) => {
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

  return (
    <Card key={index} className='discover-group-card' hoverable={true}>
      <Link to={`/group/${currentGroup.id}`}>
        <Meta
          avatar={
            <Avatar
              style={{
                textTransform: 'uppercase',
                background: 'rgb(0, 196, 204)',
              }}
              shape='square'
              icon={currentGroup.groupName.charAt(0)}
            />
          }
          title={currentGroup.groupName}
          /*           description={
            currentGroup.schoolName && (
              <Meta
                //className='group-card-meta-desc no-padding'
                description={
                  currentGroup.schoolName
                    ? `School: ${currentGroup.schoolName}`
                    : ''
                }
              />
            )
          } */
        ></Meta>
      </Link>
      {currentGroup.schoolName && (
        <>
          <div className='group-card-details' style={{ marginTop: '.4rem' }}>
            <i className='fas fa-school school-group-icon'></i>&nbsp;
            {currentGroup.schoolName}
          </div>
          <div className='group-card-details'>
            {currentGroup.schoolCity}, {currentGroup.schoolState}{' '}
            {currentGroup.schoolZipCode}{' '}
          </div>
        </>
      )}
      {currentGroup.city && (
        <>
          <div className='group-card-details' style={{ marginTop: '.4rem' }}>
            {currentGroup.city}, {currentGroup.schoolState}{' '}
            {currentGroup.zipcode}{' '}
          </div>
        </>
      )}
      <div className='group-card-details'>
        {currentGroup.privacy && (
          <span className='group-card-details__privacy'>
            {getGroupPrivacy(currentGroup.privacy)}
          </span>
        )}

        {currentGroup.userGroupMembers &&
          currentGroup.userGroupMembers.length > 0 && (
            <>
              <span className='group-card-details__members'>
                {getUserGroupMemberCount(currentGroup)}
              </span>
              <span className='group-card-details__role'>
                {getUserGroupRole(currentGroup)}
              </span>
            </>
          )}
        <div className='group-card-details__action'>
          {groupActionMenu(currentGroup, type)}
        </div>
      </div>
    </Card>
  );
};

GroupCard.propTypes = {
  currentGroup: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  auth: state.auth,
  group: state.group,
});

export default connect(mapStateToProps, {
  acceptUserGroupInvitation,
  requestToJoinUserGroup,
})(GroupCard);

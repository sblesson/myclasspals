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
} from '../../actions/group';

import './GroupCard.scss';

const JoinGroup = ({
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

  const acceptPendingInviteActionClick = (record) => {
    acceptUserGroupInvitation({
      groupId: record.id,
      role: 'member',
      invitedUserId: auth.user.email,
    });
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
    <div>
      <Button
        key={`${currentGroup.id}_pending_join_btn`}
        className='btn-primary'
        onClick={() => acceptPendingInviteActionClick(currentGroup)}
      >
        {'Join'}
      </Button>
    </div>
  );
};

JoinGroup.propTypes = {
  currentGroup: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  auth: state.auth,
  group: state.group,
});

export default connect(mapStateToProps, {
  acceptUserGroupInvitation,
  requestToJoinUserGroup,
})(JoinGroup);

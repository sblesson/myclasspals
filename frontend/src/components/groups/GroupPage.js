import React from 'react';
import { connect } from 'react-redux';
import { PageHeader, Descriptions, Tag, message } from 'antd';
import _ from 'lodash';
import InviteUsersToGroupModal from './modal/InviteUsersToGroupModal';
import PostModal from '../posts/modal/PostModal';
import GroupDetails from './GroupDetails';
import './GroupPage.scss';

const GroupPage = React.memo(({ isMobile, userEmail, group }) => {
  const currentGroup = group.currentGroup;
  console.log('inside GroupPage' + currentGroup.groupName);
  const getUserGroupMemberCount = (currentGroup) => {
    if (currentGroup && currentGroup.userGroupMembers) {
      if (currentGroup.userGroupMembers.length <= 1) {
        return `${currentGroup.userGroupMembers.length} member`;
      } else if (currentGroup.userGroupMembers.length > 1) {
        return `${currentGroup.userGroupMembers.length} members`;
      }
    }
  };
  const isUserInPendingRequestedInvitations = (currentGroup) => {
    let found = false;
    if (
      currentGroup &&
      currentGroup.requestedInvitations &&
      currentGroup.requestedInvitations.length > 0
    ) {
      found = currentGroup.requestedInvitations.find(
        (request) => request.invitedUserId === userEmail
      );
    }
    message.config({
      top: 140,
      duration: 5,
      maxCount: 3,
      rtl: true,
    });
    if (
      !found &&
      (currentGroup.role === 'admin' || currentGroup.role === 'member')
    ) {
      return <InviteUsersToGroupModal />;
    }
  };

  const getGroupPrivacyLabel = (privacy) => {
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

  const getUserGroupRole = (currentGroup) => {
    if (currentGroup.role === 'admin') {
      return <Tag color={'blue'}>{currentGroup.role}</Tag>;
    } else if (currentGroup.role === 'member') {
      return <Tag color={'geekblue'}>{currentGroup.role}</Tag>;
    } else if (currentGroup.role === 'pending invitation') {
      return <Tag color={'green'}>{currentGroup.role}</Tag>;
    }
  };

  const displayCreatePostButton = (currentGroup) => {
    if (currentGroup.role === 'admin' || currentGroup.role === 'member') {
      return [<PostModal key='3' isMobile={isMobile} />];
    }
  };
  return (
    <div className='wrapper'>
      <PageHeader
        ghost={false}
        onBack={isMobile ? () => window.history.back() : false}
        title={currentGroup.groupName}
        subTitle={getGroupPrivacyLabel(currentGroup.privacy)}
        extra={isUserInPendingRequestedInvitations(currentGroup)}
      >
        <Descriptions size='small' column={1}>
          <Descriptions.Item label={getUserGroupRole(currentGroup)}>
            {getUserGroupMemberCount(currentGroup)}
          </Descriptions.Item>
          <Descriptions.Item>
            {displayCreatePostButton(currentGroup)}
          </Descriptions.Item>
        </Descriptions>
        <GroupDetails currentGroup={currentGroup} />
      </PageHeader>
    </div>
  );
});

const mapStateToProps = (state) => ({
  group: state.group,
});

export default connect(mapStateToProps, {})(GroupPage);

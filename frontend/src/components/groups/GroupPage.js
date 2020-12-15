import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { SmileOutlined, EllipsisOutlined } from '@ant-design/icons';
import {
  PageHeader,
  Alert,
  Descriptions,
  Tag,
  message,
  Dropdown,
  Menu,
  Result,
  Button,
} from 'antd';
import _ from 'lodash';
import DeleteGroupModal from './modal/DeleteGroupModal';
import InviteUsersToGroupModal from './modal/InviteUsersToGroupModal';
import PostModal from '../posts/modal/PostModal';

import GroupDetails from './GroupDetails';
import './GroupPage.scss';

const GroupPage = React.memo(({ isMobile, userEmail, group }) => {
  let currentGroup = group.currentGroup;

  useEffect(() => {
    return () => {
      currentGroup = {};
    };
  }, []);
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
      return <InviteUsersToGroupModal key='invite' />;
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
    } else if (currentGroup.role === 'Pending Invitation') {
      return <Tag color={'cyan'}>{currentGroup.role}</Tag>;
    }
  };

  const displayCreatePostButton = (currentGroup) => {
    if (currentGroup.role === 'admin' || currentGroup.role === 'member') {
      return [<PostModal key='3' isMobile={isMobile} />];
    }
  };
  const menu = (
    <Menu>
      <Menu.Item>
        <DeleteGroupModal groupId={group.currentGroup.id}></DeleteGroupModal>
      </Menu.Item>
    </Menu>
  );
  const DropdownMenu = (currentGroup) => {
    if (
      (currentGroup && currentGroup.role === 'admin') ||
      currentGroup.role === 'member'
    )
      return (
        <Dropdown key='action_menu' overlay={menu}>
          <EllipsisOutlined
            style={{
              fontSize: 20,
              verticalAlign: 'top',
            }}
          />
        </Dropdown>
      );
  };

  const redirectToHome = () => {
    if (
      group.pendingInvitedUserGroups &&
      group.pendingInvitedUserGroups.length > 0
    ) {
      window.location.href =
        '/dashboard/' + group.pendingInvitedUserGroups[0].id;
    } else if (
      group.requestedUserGroup &&
      group.requestedUserGroup.length > 0
    ) {
      window.location.href = '/dashboard/' + group.requestedUserGroup[0].id;
    } else {
      window.location.href = '/onboarding';
    }
  };
  return (
    <div className='wrapper'>
      {group.pendingInvitedUserGroups &&
        group.pendingInvitedUserGroups.length > 0 && (
          <Alert
            message='You have group invitations pending. Click on groups under pending invitations and click join...'
            type='warning'
            closable
          />
        )}
      {!_.isEmpty(currentGroup) ? (
        <PageHeader
          ghost={false}
          onBack={isMobile ? () => window.history.back() : false}
          title={
            <>
              <span
                className={
                  'ant-avatar ant-avatar-square ant-avatar-icon group-square-icon ' +
                  (currentGroup.role === 'admin'
                    ? 'group-square-icon_admin'
                    : 'group-square-icon_other')
                }
              >
                {currentGroup.groupName.charAt(0)}
              </span>
              <span> {currentGroup.groupName}</span>
            </>
          }
          subTitle={getGroupPrivacyLabel(currentGroup.privacy)}
          extra={[
            isUserInPendingRequestedInvitations(currentGroup),
            DropdownMenu(currentGroup),
          ]}
        >
          <Descriptions size='small' column={1}>
            <Descriptions.Item>
              {getUserGroupMemberCount(currentGroup)}
              <br />
              {getUserGroupRole(currentGroup)}
              <br />
            </Descriptions.Item>
            {currentGroup.schoolName && (
              <Descriptions.Item>
                <div className='school-group'>
                  <i className='fas fa-school school-group-icon'></i>&nbsp;
                  {currentGroup.schoolName}
                  <br />
                  {currentGroup.schoolCity} {currentGroup.schoolState},{' '}
                  {currentGroup.schoolZipCode}
                </div>
              </Descriptions.Item>
            )}
            <Descriptions.Item>
              {displayCreatePostButton(currentGroup)}
            </Descriptions.Item>
          </Descriptions>
          <GroupDetails currentGroup={currentGroup} />
        </PageHeader>
      ) : (
        <Result
          icon={
            <SmileOutlined style={{ fontSize: '3rem', color: '#1bb0c4' }} />
          }
          title='You have deleted current group!'
          extra={
            <Button type='primary' onClick={redirectToHome}>
              Back Home
            </Button>
          }
        />
      )}
    </div>
  );
});

const mapStateToProps = (state) => ({
  group: state.group,
});

export default connect(mapStateToProps, {})(GroupPage);

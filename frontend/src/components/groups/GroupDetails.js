import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, List, Empty, Card } from 'antd';
import SearchPost from '../common/searchPost/SearchPost';
import PostFilterPanel from '../common/filterpanel/FilterPanel';
import UserCard from './UserCard';
import MemberRequest from './MemberRequest';
import PendingRequests from './PendingRequests';
import Posts from '../posts/Posts';
import AboutGroup from './AboutGroup';

import JoinGroup from './JoinGroup';
const GroupDetails = ({ currentGroup }) => {
  const { TabPane } = Tabs;
  const { Meta } = Card;

  const getUserGroupMemberCount = (currentGroup) => {
    if (currentGroup && currentGroup.userGroupMembers) {
      if (currentGroup.userGroupMembers.length <= 1) {
        return `${currentGroup.userGroupMembers.length} member`;
      } else if (currentGroup.userGroupMembers.length > 1) {
        return `${currentGroup.userGroupMembers.length} members`;
      }
    }
  };

  return (
    <>
      {currentGroup.role === 'admin' || currentGroup.role === 'member' ? (
        <Tabs defaultActiveKey='1'>
          <TabPane tab='Posts' key='posts'>
            <div style={{ marginBottom: '20px' }}>
              <SearchPost />
              <PostFilterPanel />
            </div>
            <Posts />
          </TabPane>
          <TabPane tab='Members' key='members'>
            <Meta
              className='user-card-member-title'
              description={getUserGroupMemberCount(currentGroup)}
            ></Meta>
            <List
              className='user-card-list'
              itemLayout='vertical'
              size='large'
              pagination={{
                onChange: (page) => {
                  console.log(page);
                },
                total: currentGroup.userGroupMembers.length,
                pageSize: 50,
                hideOnSinglePage: true,
              }}
            >
              {currentGroup.userGroupMembers &&
                currentGroup.userGroupMembers.length > 0 &&
                currentGroup.userGroupMembers.map((item, index) => (
                  <UserCard
                    key={index}
                    currentGroup={currentGroup}
                    user={item}
                  />
                ))}
            </List>
          </TabPane>

          {currentGroup.role === 'admin' ? (
            <TabPane tab='Pending Approvals' key='approvals'>
              {currentGroup.pendingInvitations &&
              currentGroup.pendingInvitations.length > 0 ? (
                <List
                  itemLayout='vertical'
                  size='small'
                  header={`${currentGroup.pendingInvitations.length} 
                          member request pending`}
                  pagination={{
                    onChange: (page) => {
                      console.log(page);
                    },
                    total: currentGroup.pendingInvitations.length,
                    pageSize: 50,
                    hideOnSinglePage: true,
                  }}
                  dataSource={currentGroup.pendingInvitations}
                  renderItem={(item) => <MemberRequest member={item} />}
                />
              ) : (
                <Empty description={'There are no approvals pending'} />
              )}
            </TabPane>
          ) : (
            ''
          )}
          {currentGroup.role === 'admin' && (
            <TabPane tab='Pending Invitations' key='request'>
              {currentGroup.requestedInvitations &&
              currentGroup.requestedInvitations.length > 0 ? (
                <List
                  itemLayout='vertical'
                  size='small'
                  header={`${currentGroup.requestedInvitations.length} 
                      pending invitations`}
                  pagination={{
                    onChange: (page) => {
                      console.log(page);
                    },
                    total: currentGroup.requestedInvitations.length,
                    pageSize: 50,
                    hideOnSinglePage: true,
                  }}
                  dataSource={currentGroup.requestedInvitations}
                  renderItem={(item) => <PendingRequests member={item} />}
                />
              ) : (
                <Empty
                  description={'No pending invitations to join this group'}
                />
              )}
            </TabPane>
          )}
        </Tabs>
      ) : (
        ''
      )}
      {currentGroup.role === 'Pending Request' && (
        <>
          <JoinGroup currentGroup={currentGroup} />
          <br />
          <AboutGroup />
        </>
      )}
    </>
  );
};

GroupDetails.propTypes = {
  currentGroup: PropTypes.object.isRequired,
};

export default GroupDetails;

import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Tabs,
  Table,
  Tag,
  Button,
  Menu,
  Dropdown,
  message,
  Layout
} from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../../layout/Spinner';
import { DownOutlined } from '@ant-design/icons';
import InviteUsersToGroupModal from './modal/InviteUsersToGroupModal';
import GroupCard from './GroupCard';
import AboutGroup from './AboutGroup';
import SearchPost from '../common/searchPost/SearchPost';
import PostFilterPanel from '../common/filterpanel/FilterPanel';
import UserCard from './UserCard';
import PostModal from '../posts/modal/PostModal';
import Posts from '../posts/Posts';

import {
  getGroupDetails,
  approveUserGroupRequest,
  declineUserGroupRequest,
  changeGroupUserRole,
  removeUserFromGroup,
  acceptUserGroupInvitation
} from '../../actions/group';

const SingleGroup = ({
  loading,
  group,
  getGroupDetails,
  approveUserGroupRequest,
  acceptUserGroupInvitation,
  match,
  auth,
  history
}) => {
  const { Content } = Layout;
  const isCurrent = useRef(true);

  useEffect(() => {
    return () => {
      //called when component is going to unmount
      isCurrent.current = false;
    };
  }, []);

  useEffect(() => {
    if (match && match.params && match.params.id) {
      let groupId = match.params.id;
      //user clicked on another group from dashboard leftnav groups menu,
      //get groupId from params
      if (isCurrent.current) {
        getGroupDetails(groupId);
      }
    }

    return () => {
      //todo
    };
  }, [getGroupDetails, match]);

  const { TabPane } = Tabs;

  const onClick = ({ key }) => {};

  //TODO check if you are admin, creator or member and decide menu actions
  const requestToJoinMenu = (
    <Menu onClick={onClick}>
      <Menu.Item key='1'>Approve</Menu.Item>
      <Menu.Item key='2'>Decline</Menu.Item>
    </Menu>
  );

  //TODO check if you are admin, creator or member and decide menu actions
  const membersMenu = (
    <Menu>
      <Menu.Item key='1'>
        {/*         <Button
          type='link'
          onClick={() =>
            changeGroupUserRole({
              userId: record._id,
              groupId: match.params.id,
              newRole: 'admin'
            })
          }
        >
          Set as Admin
        </Button> */}
      </Menu.Item>
      <Menu.Item key='2'>
        {/*        <Button
          type='link'
          onClick={() =>
            changeGroupUserRole({
              userId: record._id,
              groupId: match.params.id,
              newRole: 'moderator'
            })
          }
        >
          Set as Moderator
        </Button> */}
      </Menu.Item>
      <Menu.Item key='3'>
        {/*         <Button
          type='link'
          onClick={() =>
            removeUserFromGroup({
              userId: record._id,
              groupId: match.params.id
            })
          }
        >
          Remove from Group
        </Button> */}
      </Menu.Item>
      <Menu.Item key='4'>Mute Member</Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: role => (
        <span>
          <Tag color={role === 'admin' ? 'geekblue' : 'green'} key={role}>
            {role.toUpperCase()}
          </Tag>
        </span>
      )
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: '',
      key: 'action',
      render: (text, record) => (
        <Dropdown overlay={membersMenu} placement='bottomCenter'>
          <a className='ant-dropdown-link' onClick={e => e.preventDefault()}>
            <DownOutlined />
          </a>
        </Dropdown>
      )
    }
  ];

  const onClickPendingInvitation = () => {};

  //TODO check if you are admin, creator or member and decide menu actions
  const pendingInvitationsMenu = (
    <Menu onClick={onClickPendingInvitation}>
      <Menu.Item key='1'>Approve</Menu.Item>
      <Menu.Item key='2'>Decline</Menu.Item>
    </Menu>
  );

  const approveUserGroupRequestClick = record => {
    approveUserGroupRequest({
      groupId: record.groupId,
      role: record.role,
      requestorUserId: record.requestorUserId
    });
  };

  const declineUserGroupRequestClick = record => {};

  const requestToJoinColumn = [
    {
      title: 'Name',
      dataIndex: 'invitedUserId',
      key: 'invitedUserId',
      render: text => <a>{text}</a>
    }
  ];

  const pendingInvitationsColumns = [
    {
      title: 'Requested Users',
      dataIndex: 'requestorUserId',
      key: 'requestorUserId',
      render: text => <a>{text}</a>
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: role => (
        <span>
          <Tag color={role === 'admin' ? 'geekblue' : 'green'} key={role}>
            {role.toUpperCase()}
          </Tag>
        </span>
      )
    },
    {
      title: '',
      key: 'action',
      render: (text, record, index) => (
        <div>
          <Button
            type='link'
            style={{ marginRight: 16 }}
            onClick={() => approveUserGroupRequestClick(record)}
          >
            Approve
          </Button>
          <Button
            type='link'
            style={{ marginRight: 16 }}
            onClick={() => declineUserGroupRequestClick(record)}
          >
            Decline
          </Button>
        </div>
      )
    }
  ];

  const acceptPendingInviteActionClick = currentGroup => {
    acceptUserGroupInvitation({
      groupId: currentGroup.id,
      role: 'member',
      invitedUserId: auth.user.email
    });
  };

  const isUserInPendingRequestedInvitations = currentGroup => {
    let found = false;
    if (
      currentGroup &&
      currentGroup.requestedInvitations &&
      currentGroup.requestedInvitations.length > 0
    ) {
      found = currentGroup.requestedInvitations.find(
        request => request.invitedUserId === auth.user.email
      );
    }
    message.config({
      top: 140,
      duration: 5,
      maxCount: 3,
      rtl: true
    });
    if (found) {
      return (
        <Button
          className='ant-btn btn-primary'
          style={{ marginRight: 16 }}
          onClick={() => acceptPendingInviteActionClick(currentGroup)}
        >
          Join
        </Button>
      );
    } else return <InviteUsersToGroupModal />;
  };

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <Content>
          {' '}
          {group !== null &&
          group.currentGroup &&
          group.currentGroup.role !== null ? (
            <div className='wrapper'>
              <div style={{ marginBottom: '20px' }}>
                <SearchPost />
                <PostFilterPanel />
              </div>
              <GroupCard currentGroup={group.currentGroup} type='mygroup' />
              {group.currentGroup.role === 'admin' ||
              group.currentGroup.role === 'member' ? (
                <Tabs
                  defaultActiveKey='1'
                  tabBarExtraContent={isUserInPendingRequestedInvitations(
                    group.currentGroup
                  )}
                >
                  <TabPane tab='Posts' key='posts'>
                    <PostModal />
                    <Posts groupId={group.currentGroup.id} />
                  </TabPane>
                  <TabPane tab='Members' key='members'>
                    {group.currentGroup.userGroupMembers &&
                      group.currentGroup.userGroupMembers.length > 0 &&
                      group.currentGroup.userGroupMembers.map((item, index) => (
                        <UserCard
                          key={index}
                          currentGroup={group.currentGroup}
                          user={item}
                        />
                      ))}
                  </TabPane>

                  {group.currentGroup.role === 'admin' ? (
                    <TabPane tab='Waiting For Approvals' key='approvals'>
                      {group.currentGroup.pendingInvitations &&
                      group.currentGroup.pendingInvitations.length > 0 ? (
                        <Table
                          columns={pendingInvitationsColumns}
                          dataSource={group.currentGroup.pendingInvitations}
                          rowKey='requestorUserId'
                        />
                      ) : (
                        'There are no request waiting for approvals'
                      )}
                    </TabPane>
                  ) : (
                    ''
                  )}
                  {group.currentGroup.role === 'admin' ? (
                    <TabPane tab='Requested To Join' key='request'>
                      {group.currentGroup.requestedInvitations &&
                      group.currentGroup.requestedInvitations.length > 0 ? (
                        <Table
                          columns={requestToJoinColumn}
                          dataSource={group.currentGroup.requestedInvitations}
                          rowKey='invitedUserId'
                        />
                      ) : (
                        'There are no request to join send from this group'
                      )}
                    </TabPane>
                  ) : (
                    ''
                  )}
                </Tabs>
              ) : (
                <AboutGroup />
              )}
            </div>
          ) : (
            ''
          )}
        </Content>
      )}
    </div>
  );
};

SingleGroup.propTypes = {
  getGroupDetails: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  group: state.group,
  auth: state.auth
});

export default connect(mapStateToProps, {
  getGroupDetails,
  declineUserGroupRequest,
  approveUserGroupRequest,
  acceptUserGroupInvitation
})(SingleGroup);

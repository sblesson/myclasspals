import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Tabs, Table, Tag, Button } from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { List } from 'semantic-ui-react';
import Spinner from '../layout/Spinner';
import LeftNav from '../leftnav/LeftNav';
import { Menu, Dropdown, message } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import InviteUsersToGroupModal from './modal/InviteUsersToGroupModal';
import {
  getGroupDetails,
  approveUserGroupRequest,
  declineUserGroupRequest,
  changeGroupUserRole,
  removeUserFromGroup
} from '../../actions/group';

const SingleGroup = ({
  loading,
  group,
  getGroupDetails,
  approveUserGroupRequest,
  match
}) => {
  useEffect(() => {
    getGroupDetails(match.params.id);
  }, [getGroupDetails, match.params.id]);

  const { TabPane } = Tabs;
  console.log(group);

  const onClick = ({ key }) => {
    console.log(`Click on item ${key}`);
  };

  //TODO check if you are admin, creator or member and decide menu actions
  const requestToJoinMenu = (
    <Menu onClick={onClick}>
      <Menu.Item key='1'>Approve</Menu.Item>
      <Menu.Item key='2'>Decline</Menu.Item>
    </Menu>
  );

  const requestToJoinColumn = [
    {
      title: 'Member Request',
      dataIndex: 'invitedUserId',
      key: 'invitedUserId',
      render: text => <a>{text}</a>
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Dropdown overlay={requestToJoinMenu} placement='bottomCenter'>
          <a className='ant-dropdown-link' onClick={e => e.preventDefault()}>
            <DownOutlined />
          </a>
        </Dropdown>
      )
    }
  ];

  const operations = <InviteUsersToGroupModal />;

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
      title: 'Action',
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
    console.log(record);

    approveUserGroupRequest({
      groupId: record.groupId,
      role: record.role,
      requestorUserId: record.requestorUserId
    });
  };

  const declineUserGroupRequestClick = record => {
    console.log(record);
  };

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
      title: 'Action',
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

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className='row'>
            <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'>
              <LeftNav screen='group' id={match.params.id} />
            </div>

            <div className='col-xs-9 col-sm-9 col-md-9 col-lg-9'>
              {group !== null && group.currentGroup ? (
                <Tabs defaultActiveKey='1' tabBarExtraContent={operations}>
                  <TabPane tab='Members' key='members'>
                    {group.currentGroup.userGroupMembers &&
                    group.currentGroup.userGroupMembers.length > 0 ? (
                      <Table
                        columns={columns}
                        dataSource={group.currentGroup.userGroupMembers}
                        rowKey='_id'
                      />
                    ) : (
                      'Current group member list is empty'
                    )}
                  </TabPane>
                  {group.isGroupAdmin ? (
                    <TabPane tab='Pending Requests' key='request'>
                      {group.currentGroup.requestedInvitations &&
                      group.currentGroup.requestedInvitations.length > 0 ? (
                        <Table
                          columns={requestToJoinColumn}
                          dataSource={group.currentGroup.requestedInvitations}
                          rowKey='groupId'
                        />
                      ) : (
                        'There are no pending request for this user group'
                      )}
                    </TabPane>
                  ) : (
                    ''
                  )}
                  {group.isGroupAdmin ? (
                    <TabPane tab='Pending Approvals' key='approvals'>
                      {group.currentGroup.pendingInvitations &&
                      group.currentGroup.pendingInvitations.length > 0 ? (
                        <Table
                          columns={pendingInvitationsColumns}
                          dataSource={group.currentGroup.pendingInvitations}
                          rowKey='requestorUserId'
                        />
                      ) : (
                        ''
                      )}
                    </TabPane>
                  ) : (
                    ''
                  )}
                </Tabs>
              ) : (
                'Group is empty'
              )}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

SingleGroup.propTypes = {
  getGroupDetails: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  group: state.group
});

export default connect(mapStateToProps, {
  getGroupDetails,
  declineUserGroupRequest,
  approveUserGroupRequest
})(SingleGroup);

import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import moment from 'moment';
import GroupFilters from '../common/filterpanel/FilterPanel';

import PrivateMessageModal from './modal/CreateGroupModal';
import LeftNav from '../leftnav/LeftNav';
import {
  getAllGroups,
  acceptUserGroupInvitation,
  declineUserGroupRequest
} from '../../actions/group';
import { Tabs, Table, Tag, Button, Input } from 'antd';
import { Menu, Dropdown, message } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import './Groups.scss';
const Groups = ({
  getAllGroups,
  acceptUserGroupInvitation,
  declineUserGroupRequest,
  group,
  auth
}) => {
  useEffect(() => {
    getAllGroups();
  }, [getAllGroups]);
  const { TabPane } = Tabs;

  const { Search } = Input;

  const onClick = ({ key }) => {
    message.info(`Click on item ${key}`);
  };

  const [activeIndex, setActiveIndex] = useState(0);

  const handleTabChange = (e, { activeIndex }) => setActiveIndex(activeIndex);

  const handlePageChange = e => {
    setActiveIndex(e.target.value);
  };

  const menu = (
    <Menu onClick={onClick}>
      <Menu.Item key='2'>Leave Group</Menu.Item>
      <Menu.Item key='3'>Set as Moderator</Menu.Item>
      <Menu.Item key='3'>Set as Member</Menu.Item>
    </Menu>
  );

  const onClickPendingInvitationsMenu = ({ key, record, index }) => {
    console.log(key, record, index);
  };
  const pendingInvitationsMenu = (text, record, index) => {
    console.log(text, record, index);
    return (
      <Menu onClick={onClickPendingInvitationsMenu(record, index)}>
        <Menu.Item key='1'>Join</Menu.Item>
        <Menu.Item key='2'>Decline</Menu.Item>
        <Menu.Item key='3'>Set as Moderator</Menu.Item>
      </Menu>
    );
  };

  const requestedGroupsMenu = (
    <Menu onClick={onClick}>
      <Menu.Item key='1'>Withdraw</Menu.Item>
      <Menu.Item key='2'>Re-send</Menu.Item>
      <Menu.Item key='3'>Set as Member</Menu.Item>
    </Menu>
  );

  const onGroupNameClick = event => {
    console.log('Content: ', event.currentTarget.dataset.id);
  };
  const myGroupsColumns = [
    {
      title: 'Name',
      dataIndex: 'groupName',
      key: 'id',
      render: (text, record) => <Link to={`/group/${record.id}`}>{text}</Link>
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: role => (
        <span>
          <Tag color={role === 'admin' ? 'geekblue' : 'green'} key={role}>
            {role}
          </Tag>
        </span>
      )
      /*      filters: [
        { text: 'admin', value: 'admin' },
        { text: 'member', value: 'member' }
      ] */
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: 'Member Count',
      dataIndex: 'memberCount',
      key: 'memberCount'
    },
    {
      title: 'Privacy',
      dataIndex: 'privacy',
      key: 'privacy'
    },
    {
      title: 'Created Date',
      dataIndex: 'createdDate',
      key: 'createdDate'
    },
    {
      title: '',
      key: 'action',
      render: (text, record) => (
        <Dropdown overlay={menu} placement='bottomCenter'>
          <a className='ant-dropdown-link' onClick={e => e.preventDefault()}>
            <DownOutlined />
          </a>
        </Dropdown>
      )
    }
  ];

  const acceptPendingInviteActionClick = record => {
    acceptUserGroupInvitation({
      groupId: record.id,
      role: 'member',
      invitedUserId: auth.user.email
    });
  };

  const pendingInvitations = [
    {
      title: 'Group Name',
      dataIndex: 'groupName',
      key: 'groupName',
      render: (text, record) => <Link to={`/group/${record.id}`}>{text}</Link>
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
      title: 'Privacy',
      dataIndex: 'privacy',
      key: 'privacy'
    },
    {
      title: 'Created Date',
      dataIndex: 'createdDate',
      key: 'createdDate'
    },
    {
      title: '',
      key: 'action',
      render: (text, record, index) => (
        <Button
          type='link'
          style={{ marginRight: 16 }}
          onClick={() => acceptPendingInviteActionClick(record)}
        >
          Join
        </Button>
      )
    }
  ];

  const myFunction = record => {
    console.log(record);
  };

  const requestedGroupsColumns = [
    {
      title: 'Group Name',
      dataIndex: 'groupName',
      key: 'groupName',
      render: (text, record) => <Link to={`/group/${record.id}`}>{text}</Link>
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: role => (
        <span>
          <Tag color={role === 'admin' ? 'geekblue' : 'green'} key={role}>
            {role ? role.toUpperCase() : null}
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
      title: 'Privacy',
      dataIndex: 'privacy',
      key: 'privacy'
    },
    {
      title: 'Created Date',
      dataIndex: 'createdDate',
      key: 'createdDate'
    },
    {
      title: '',
      key: 'action',
      render: (text, record, index) => (
        <Button
          type='link'
          style={{ marginRight: 16 }}
          onClick={() => declineUserGroupRequest(record)}
        >
          Withdraw
        </Button>
      )
    }
  ];

  const operations = <PrivateMessageModal />;

  return (
    <Fragment>
      {group.loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className='row'>
            <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'>
              <LeftNav screen='groups' />
            </div>

            <div className='col-xs-9 col-sm-9 col-md-9 col-lg-9'>
              <GroupFilters />
              {group !== null ? (
                <Tabs defaultActiveKey='1' tabBarExtraContent={operations}>
                  <TabPane tab='My Groups' key='1'>
                    {group.userGroup && group.userGroup.length > 0 ? (
                      <Table
                        columns={myGroupsColumns}
                        dataSource={group.userGroup}
                        rowKey='id'
                        loading={group.loading}
                      />
                    ) : (
                      'Current user is not part of any groups.'
                    )}
                  </TabPane>
                  <TabPane tab='Pending Invitations' key='2'>
                    {group.pendingInvitedUserGroups &&
                    group.pendingInvitedUserGroups.length > 0 ? (
                      <Table
                        columns={pendingInvitations}
                        dataSource={group.pendingInvitedUserGroups}
                        rowKey='id'
                      />
                    ) : (
                      'There are no pending group invitation for current user.'
                    )}
                  </TabPane>
                  <TabPane tab='Pending Requests' key='3'>
                    {group.requestedUserGroup &&
                    group.requestedUserGroup.length > 0 ? (
                      <Table
                        columns={requestedGroupsColumns}
                        dataSource={group.requestedUserGroup}
                        rowKey='id'
                      />
                    ) : (
                      'There are no group requests initiated by the current user.'
                    )}
                  </TabPane>
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

Groups.propTypes = {
  getAllGroups: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  group: state.group,
  auth: state.auth
});

export default connect(mapStateToProps, {
  getAllGroups,
  acceptUserGroupInvitation,
  declineUserGroupRequest
})(Groups);

import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { List } from 'semantic-ui-react';
import Spinner from '../layout/Spinner';
import LeftNav from '../leftnav/LeftNav';
import { Menu, Dropdown, message } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import InviteUsersToGroupModal from './modal/InviteUsersToGroupModal';
import { requestToJoinUserGroup } from '../../actions/group';

import { Tabs, Table, Tag, Button, Input } from 'antd';

import { searchGroup } from '../../actions/group';

const DiscoverGroups = ({
  loading,
  auth,
  group,
  searchGroup,
  requestToJoinUserGroup
}) => {
  const { TabPane } = Tabs;
  console.log(group);
  const { Search } = Input;

  const onClick = ({ key }) => {
    message.info(`Click on item ${key}`);
  };
  const menu = (
    <Menu onClick={onClick}>
      <Menu.Item key='2'>Leave Group</Menu.Item>
      <Menu.Item key='3'>Set as Moderator</Menu.Item>
      <Menu.Item key='3'>Set as Member</Menu.Item>
    </Menu>
  );

  const requestToJoinUserGroupClickHandler = record => {
    requestToJoinUserGroup({
      groupId: record.id,
      role: 'member',
      requestorUserId: auth.user.email
    });
  };

  const isLoggedInUserJoinedUserGroup = group => {
    let isUserJoinedGroup = false;
    let memberArr = [];
    const userId = JSON.parse(localStorage.getItem('user'))._id;

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
      render: (text, group, index) => {
        //if user part of user group

        let isLoggedInUserJoinedUserGroup = false;
        let memberArr = [];
        const userId = JSON.parse(localStorage.getItem('user'))._id;

        if (
          group &&
          group.userGroupMembers &&
          group.userGroupMembers.length > 0
        ) {
          memberArr = group.userGroupMembers.filter(item => {
            return item._id === userId;
          });
        }
        if (memberArr && memberArr.length > 0) {
          //current user is already part of group
          isLoggedInUserJoinedUserGroup = true;
        }

        console.log(isLoggedInUserJoinedUserGroup);

        if (!isLoggedInUserJoinedUserGroup) {
          return (
            <Button
              type='link'
              style={{ marginRight: 16 }}
              onClick={() => requestToJoinUserGroupClickHandler(group)}
            >
              Join
            </Button>
          );
        }
      }
    }
  ];

  return (
    <Fragment>
      {!group ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className='row'>
            <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'>
              <LeftNav screen='discovergroup' />
            </div>

            <div className='col-xs-9 col-sm-9 col-md-9 col-lg-9'>
              <Search
                placeholder='Search group'
                onSearch={value => searchGroup(value)}
                style={{ width: 300, marginBottom: 30 }}
                enterButton
              />
              {group !== null &&
              group.searchResult &&
              group.searchResult.length > 0 ? (
                <Table
                  columns={myGroupsColumns}
                  dataSource={group.searchResult}
                  rowKey='id'
                  loading={group.loading}
                />
              ) : (
                ''
              )}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

DiscoverGroups.propTypes = {
  searchGroup: PropTypes.func.isRequired,
  requestToJoinUserGroup: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  group: state.group,
  auth: state.auth
});

export default connect(mapStateToProps, {
  searchGroup,
  requestToJoinUserGroup
})(DiscoverGroups);

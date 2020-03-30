import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import GroupItem from './GroupItem';
import PrivateMessageModal from './modal/CreateGroupModal';
import LeftNav from '../leftnav/LeftNav';
import { Tab, Header, List, Segment } from 'semantic-ui-react';
import { getProfiles } from '../../actions/profile';
import { Tabs, Button, Table, Tag } from 'antd';
import { Menu, Dropdown, message } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import './Groups.scss';
const Messages = ({ getProfiles, auth, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);
  console.log(profiles);
  const { TabPane } = Tabs;

  const userGroup = JSON.parse(localStorage.getItem('user')).userGroup;
  console.log(userGroup);

  const pendingInvitationsData2 = JSON.parse(localStorage.getItem('user'))
    .pendingInvitedUserGroups;
  const requestedUserGroup2 = JSON.parse(localStorage.getItem('user'))
    .requestedUserGroup;

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

  const onClickPendingInvitationsMenu = ({ key, record, index }) => {
    //console.log(text, record, index);
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

  const getPanes = () => {
    let panes = [];
    if (profiles.length > 0) {
      panes = profiles.map(profile => ({
        menuItem: profile.user.name,
        render: () => (
          <Tab.Pane>
            {' '}
            <GroupItem key={profile._id} profile={profile} />
          </Tab.Pane>
        )
      }));
    }
    return panes;
  };
  let panes = getPanes();
  console.log(panes);
  const myGroupsColumns = [
    {
      title: 'Name',
      dataIndex: 'groupName',
      key: 'groupName',
      render: text => <a>{text}</a>
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role'
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
      title: 'Hidden',
      dataIndex: 'hidden',
      key: 'hidden'
    },
    /*     {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: tags => (
        <span>
          {tags.map(tag => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </span>
      )
    }, */
    {
      title: 'Action',
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

  const pendingInvitations = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role'
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
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: tags => (
        <span>
          {tags.map(tag => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </span>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record, index) => (
        <Dropdown
          overlay={pendingInvitationsMenu(text, record, index)}
          placement='bottomCenter'
        >
          <a className='ant-dropdown-link' onClick={e => e.preventDefault()}>
            <DownOutlined />
          </a>
        </Dropdown>
      )
    }
  ];
  const pendingInvitationsData = [
    {
      key: '1',
      name: 'warm springs 6th grade',
      role: 'admin',
      description: 'New York No. 1 Lake Park',
      memberCount: '20',
      tags: ['nice', 'developer']
    },
    {
      key: '2',
      name: 'Sunshine Kids',
      role: 'member',
      description: 'London No. 1 Lake Park',
      memberCount: '20',
      tags: ['loser']
    },
    {
      key: '3',
      name: 'Volunteers 2020',
      role: 'member',
      description: 'Sidney No. 1 Lake Park',
      memberCount: '20',
      tags: ['cool', 'teacher']
    }
  ];

  const requestedGroupsColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role'
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
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: tags => (
        <span>
          {tags.map(tag => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </span>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Dropdown overlay={requestedGroupsMenu} placement='bottomCenter'>
          <a className='ant-dropdown-link' onClick={e => e.preventDefault()}>
            <DownOutlined />
          </a>
        </Dropdown>
      )
    }
  ];
  const RequestedGroupsData = [
    {
      key: '1',
      name: 'warm springs 6th grade',
      role: 'admin',
      description: 'New York No. 1 Lake Park',
      memberCount: '20',
      tags: ['nice', 'developer']
    },
    {
      key: '2',
      name: 'Sunshine Kids',
      role: 'member',
      description: 'London No. 1 Lake Park',
      memberCount: '20',
      tags: ['loser']
    },
    {
      key: '3',
      name: 'Volunteers 2020',
      role: 'member',
      description: 'Sidney No. 1 Lake Park',
      memberCount: '20',
      tags: ['cool', 'teacher']
    }
  ];

  const operations = <PrivateMessageModal />;

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className='row'>
            <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'>
              <LeftNav screen='groups' />
            </div>

            <div className='col-xs-9 col-sm-9 col-md-9 col-lg-9'>
              <Tabs defaultActiveKey='1' tabBarExtraContent={operations}>
                <TabPane tab='My Groups' key='1'>
                  {userGroup && userGroup.length > 0 ? (
                    <Table
                      columns={myGroupsColumns}
                      dataSource={userGroup}
                      rowKey='id'
                    />
                  ) : (
                    'Current user is not part of any groups.'
                  )}
                </TabPane>
                <TabPane tab='Pending Invitations' key='2'>
                  <Table
                    columns={pendingInvitations}
                    dataSource={pendingInvitationsData}
                  />{' '}
                </TabPane>
                <TabPane tab='Requested' key='3'>
                  <Table
                    columns={requestedGroupsColumns}
                    dataSource={RequestedGroupsData}
                  />{' '}
                </TabPane>
              </Tabs>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Messages.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getProfiles })(Messages);

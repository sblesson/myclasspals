import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { List } from 'semantic-ui-react';
import Spinner from '../layout/Spinner';
import LeftNav from '../leftnav/LeftNav';
import { Menu, Dropdown, message } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Tabs, Button, Table, Tag } from 'antd';
import PrivateMessageModal from './modal/CreateGroupModal';
import { getGroupDetails } from '../../actions/group';

const SingleGroup = ({ loading, group, getGroupDetails, match }) => {
  useEffect(() => {
    getGroupDetails(match.params.id);
  }, [getGroupDetails, match.params.id]);
  const { TabPane } = Tabs;
  console.log(group);
  const onClick = ({ key }) => {
    console.log(`Click on item ${key}`);
  };
  const requestedGroupsMenu = (
    <Menu onClick={onClick}>
      <Menu.Item key='1'>Set as Admin</Menu.Item>
      <Menu.Item key='2'>Set as Moderator</Menu.Item>
      <Menu.Item key='3'>Remove from Group</Menu.Item>
      <Menu.Item key='4'>Mute Member</Menu.Item>
    </Menu>
  );

  const operations = <PrivateMessageModal />;

  const columns = [
    {
      title: 'Name',
      dataIndex: 'groupName',
      key: 'groupName',
      render: text => <a>{text}</a>
    },
    {
      title: 'Role',
      key: 'role',
      dataIndex: 'role',
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
      title: 'Description',
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
      render: (text, record) => (
        <Dropdown overlay={requestedGroupsMenu} placement='bottomCenter'>
          <a className='ant-dropdown-link' onClick={e => e.preventDefault()}>
            <DownOutlined />
          </a>
        </Dropdown>
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

  const data = [
    {
      key: '1',
      name: 'John Brown',
      role: ['nice', 'developer'],
      description: 'New York No. 1 Lake Park'
    },
    {
      key: '2',
      name: 'Jim Green',
      role: ['loser'],
      description: 'London No. 1 Lake Park'
    },
    {
      key: '3',
      name: 'Joe Black',
      role: ['cool', 'teacher'],
      description: 'Sidney No. 1 Lake Park'
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
              {group !== null ? (
                <Tabs defaultActiveKey='1' tabBarExtraContent={operations}>
                  <TabPane tab='Members' key='1'>
                    {group.currentGroup && group.currentGroup.length > 0 ? (
                      <Table
                        columns={columns}
                        dataSource={group.currentGroup}
                        rowKey='id'
                      />
                    ) : (
                      'Current group member list is empty'
                    )}
                  </TabPane>
                  <TabPane tab='Pending Invitations' key='2'>
                    <Table columns={columns} dataSource={data} />{' '}
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

SingleGroup.propTypes = {
  getGroupDetails: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  group: state.group
});

export default connect(mapStateToProps, { getGroupDetails })(SingleGroup);

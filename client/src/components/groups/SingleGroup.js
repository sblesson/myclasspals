import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { List, Button } from 'semantic-ui-react';
import Spinner from '../layout/Spinner';
import LeftNav from '../leftnav/LeftNav';
import { Menu, Dropdown, message } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Table, Tag } from 'antd';

const SingleGroup = ({ loading }) => {
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

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
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
              <LeftNav screen='group' id='123' />
            </div>

            <div className='col-xs-9 col-sm-9 col-md-9 col-lg-9'>
              <Table columns={columns} dataSource={data} />
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

SingleGroup.propTypes = {
  //profile: PropTypes.object.isRequired
};

export default SingleGroup;

import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../common/spinner/Spinner';
import { Menu, Layout, Result } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import CreateGroupModal from '../groups/modal/CreateGroupModal';
import { LeftCircleOutlined } from '@ant-design/icons';

import './LeftNav.scss';

const LeftNav = ({ screen = '', id, group }) => {
  const { Sider } = Layout;
  let myGroups = [];

  let groupName;
  const [sideNavMenu, setSideNavMenu] = useState([]);
  const [activeMenu, setActiveMenu] = useState(['0']);

  const [collapse, setCollapse] = useState(true);
  var currentPath = window.location.pathname;
  screen = currentPath.split('/')[1];

  if (!id) {
    let pathArr = window.location.pathname.split('/');
    if (pathArr.length >= 2) {
      id = pathArr[2];
    }
  }
  useEffect(() => {
    window.innerWidth <= 760 ? setCollapse(true) : setCollapse(false);
    if (group && group.currentGroup && group.currentGroup.groupName) {
      groupName = group.currentGroup.groupName;
    }
  }, [group]);

  const getNavByScreen = screen => {
    switch (screen) {
      case 'dashboard':
      case 'profile':
      case 'posts': {
        if (myGroups && myGroups.length > 0) {
          return myGroups;
        } else if (group && group.userGroup && group.userGroup.length > 0) {
          myGroups = group.userGroup.map(group => ({
            id: group.id,
            title: group.groupName,
            key: group.id,
            url: '/dashboard/' + group.id
          }));
          return myGroups;
        } else {
          if (group && group.currentGroup && group.currentGroup.groupName) {
            return [
              {
                id: group.currentGroup.id,
                title: group.currentGroup.groupName,
                key: group.currentGroup.id,
                url: `/group/${group.currentGroup.id}`
              }
            ];
          } else return null;
        }
      }
      case 'messages': {
        return null;
      }
      case 'create-profile': {
        return null;
      }
      case 'account':
        return [
          {
            key: 'account',
            title: 'Account Settings',
            icon: 'fas fa-user-cog',
            url: '/account'
          }
        ];

      case 'groups':
      case 'discovergroup':
        return [
          {
            id: 'my_groups_0',
            key: 'my_groups',
            title: 'My Groups',
            icon: 'fas fa-users',
            url: '/groups'
          },
          {
            id: 'search_group-1',
            key: 'search_group',
            title: 'Discover Groups',
            icon: 'fas fa-search',
            url: '/discovergroup/'
          }
        ];
      case 'group':
        if (group && group.currentGroup && group.currentGroup.groupName) {
          return [
            {
              id: group.currentGroup.id,
              title: group.currentGroup.groupName,
              name: group.currentGroup.groupName,
              key: group.currentGroup.id,
              url: `/group/${group.currentGroup.id}`
            }
          ];
        } else return null;

      default:
        return null;
    }
  };

  useEffect(() => {
    let sm = getNavByScreen(screen);
    setSideNavMenu(sm);

    return () => {
      setActiveMenu(['0']);
    };
  }, [screen]);

  const handleLeftMenuClick = event => {
    event.domEvent.stopPropagation();
    console.log(activeMenu);
    setActiveMenu([event.key]);
    console.log(event);
    console.log(activeMenu);
  };

  return (
    <Fragment>
      {screen === 'dashboard' && sideNavMenu && sideNavMenu.length === 0 && (
        <Sider
          trigger={null}
          collapsible
          collapsed={collapse}
          style={{ marginTop: '4rem' }}
        >
          <Result
            status='warning'
            subTitle='No groups found!'
            extra={<CreateGroupModal />}
          />
        </Sider>
      )}
      {sideNavMenu != null && sideNavMenu.length > 0 && (
        <Sider
          trigger={null}
          collapsible
          collapsed={collapse}
          style={{ marginTop: '20px' }}
        >
          <Menu
            theme='light'
            mode='inline'
            selectedKeys={activeMenu}
            defaultSelectedKeys={activeMenu}
            onClick={event => handleLeftMenuClick(event)}
          >
            {sideNavMenu &&
              sideNavMenu.length > 1 &&
              sideNavMenu.map((sideNavItem, index) => (
                <Menu.Item key={index} icon={sideNavItem.icon}>
                  {sideNavItem.title}
                  <Link className='btn btn-light my-1' to={sideNavItem.url}>
                    {sideNavItem.title}
                  </Link>
                </Menu.Item>
              ))}
            {/* TODO replace this code and fix actual issue, for one item in menu, it is not selected by default */}

            {sideNavMenu &&
              sideNavMenu.length === 1 &&
              sideNavMenu.map((sideNavItem, index) => (
                <Menu.Item
                  key={index}
                  icon={sideNavItem.icon}
                  className='ant-menu-item-selected'
                >
                  {sideNavItem.title}
                  <Link className='btn btn-light my-1' to={sideNavItem.url}>
                    {sideNavItem.title}
                  </Link>
                </Menu.Item>
              ))}
          </Menu>
        </Sider>
      )}
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    categories: state.post.categories,
    auth: state.auth,
    group: state.group
  };
};

export default connect(mapStateToProps, {})(withRouter(LeftNav));

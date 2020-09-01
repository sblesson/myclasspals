import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../common/spinner/Spinner';
import { Menu, Layout, Result, Drawer, Button } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import CreateGroupModal from '../groups/modal/CreateGroupModal';
import { LeftCircleOutlined } from '@ant-design/icons';
import UserMenu from '../topnavbar/UserMenu';
import { MenuOutlined } from '@ant-design/icons';

import './LeftNav.scss';
import { logout } from '../../actions/auth';

const LeftNav = ({ screen = '', id, group, logout }) => {
  const SubMenu = Menu.SubMenu;

  const { Sider } = Layout;
  let myGroups = [];

  let groupName;
  const fullWidth = global.window.innerWidth;
  console.log(fullWidth);
  const mobileBreakPoint = 768;

  const [sideNavMenu, setSideNavMenu] = useState([]);
  const [activeMenu, setActiveMenu] = useState(['0']);
  const [windowSize, setWindowSize] = useState(global.window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowSize(global.window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [global.window]);

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  var currentPath = window.location.pathname;
  screen = currentPath.split('/')[1];

  if (!id) {
    let pathArr = window.location.pathname.split('/');
    if (pathArr.length >= 2) {
      id = pathArr[2];
    }
  }
  useEffect(() => {
    window.innerWidth <= 760
      ? setSidebarCollapsed(true)
      : setSidebarCollapsed(false);
    if (group && group.currentGroup && group.currentGroup.groupName) {
      groupName = group.currentGroup.groupName;
    }
  }, [group]);

  const getNavByScreen = (screen) => {
    switch (screen) {
      case 'dashboard':
      case 'profile':
      case 'posts': {
        if (myGroups && myGroups.length > 0) {
          return myGroups;
        } else if (group && group.userGroup && group.userGroup.length > 0) {
          myGroups = group.userGroup.map((group) => ({
            id: group.id,
            title: group.groupName,
            key: group.id,
            url: '/dashboard/' + group.id,
          }));
          return myGroups;
        } else {
          if (group && group.currentGroup && group.currentGroup.groupName) {
            return [
              {
                id: group.currentGroup.id,
                title: group.currentGroup.groupName,
                key: group.currentGroup.id,
                url: `/group/${group.currentGroup.id}`,
              },
            ];
          } else return null;
        }
      }
      case 'messages': {
        return [];
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
            url: '/account',
          },
        ];

      case 'groups':
      case 'discovergroup':
        return [
          {
            id: 'my_groups_0',
            key: 'my_groups',
            title: 'My Groups',
            icon: 'fas fa-users',
            url: '/groups',
          },
          {
            id: 'search_group-1',
            key: 'search_group',
            title: 'Discover Groups',
            icon: 'fas fa-search',
            url: '/discovergroup/',
          },
        ];
      case 'group':
        if (group && group.currentGroup && group.currentGroup.groupName) {
          return [
            {
              id: group.currentGroup.id,
              title: group.currentGroup.groupName,
              name: group.currentGroup.groupName,
              key: group.currentGroup.id,
              url: `/group/${group.currentGroup.id}`,
            },
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

  const handleLeftMenuClick = (event) => {
    event.domEvent.stopPropagation();
    setActiveMenu([event.key]);
  };

  const onCollapse = (collapsed, type) => {
    console.log(collapsed);
    console.log(type);

    setSidebarCollapsed(collapsed);
  };
  const showDrawer = () => {
    setSidebarCollapsed(true);
  };

  const onCloseDrawer = () => {
    setSidebarCollapsed(false);
  };

  return (
    <Fragment>
      {screen === 'dashboard' && sideNavMenu && sideNavMenu.length === 0 && (
        <Result
          status='warning'
          subTitle='No groups found!'
          extra={<CreateGroupModal />}
        />
      )}

      {sideNavMenu != null && sideNavMenu.length > 0 && (
        <Sider
          trigger={null}
          collapsedWidth='0'
          style={{ marginTop: '20px' }}
          className={
            windowSize <= mobileBreakPoint ? 'hideOnMobile' : 'displayOnDesktop'
          }
        >
          <Menu
            theme='light'
            mode='inline'
            selectedKeys={activeMenu}
            defaultSelectedKeys={activeMenu}
            onClick={(event) => handleLeftMenuClick(event)}
          >
            {sideNavMenu &&
              sideNavMenu.length > 0 &&
              sideNavMenu.map((sideNavItem, index) => (
                <Menu.Item key={index} icon={sideNavItem.icon}>
                  {sideNavItem.title}
                  <Link className='btn btn-light my-1' to={sideNavItem.url}>
                    {sideNavItem.title}
                  </Link>
                </Menu.Item>
              ))}
          </Menu>
        </Sider>
      )}

      {sideNavMenu != null && sideNavMenu.length > 0 && (
        <div>
          <Button
            type='primary'
            onClick={showDrawer}
            className={
              windowSize <= mobileBreakPoint
                ? 'displayOnMobile barsMenu'
                : 'hideOnDesktop'
            }
          >
            <MenuOutlined />
          </Button>
          <Drawer
            placement='right'
            closable={false}
            mask={false}
            onClose={onCloseDrawer}
            visible={sidebarCollapsed}
            className='hideOnDesktop'
          >
            <Menu
              theme='light'
              mode='inline'
              selectedKeys={activeMenu}
              defaultSelectedKeys={activeMenu}
              onClick={(event) => handleLeftMenuClick(event)}
            >
              <Menu.Item key='dashboard'>
                <Link to='/dashboard'>{'Home'}</Link>
              </Menu.Item>
              <Menu.Item key='groups'>
                <Link to='/groups'>{'Groups'}</Link>
              </Menu.Item>
              <Menu.Item key='messages'>
                <Link to='/messages'>{'Message'}</Link>
              </Menu.Item>
              <SubMenu title={<span>User</span>}>
                <Menu.Item key='account'>
                  {' '}
                  <Link to='/account'>{'Account'}</Link>
                </Menu.Item>
                <Menu.Item key='logout' onClick={logout}>
                  Log out
                </Menu.Item>
              </SubMenu>
              {sideNavMenu &&
                sideNavMenu.length > 0 &&
                sideNavMenu.map((sideNavItem, index) => (
                  <Menu.Item key={index} icon={sideNavItem.icon}>
                    {sideNavItem.title}
                    <Link className='btn btn-light my-1' to={sideNavItem.url}>
                      {sideNavItem.title}
                    </Link>
                  </Menu.Item>
                ))}
              {/* TODO replace this code and fix actual issue, for one item in menu, it is not selected by default */}

              {/*             {sideNavMenu &&
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
              ))} */}
            </Menu>
          </Drawer>
        </div>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    categories: state.post.categories,
    group: state.group,
  };
};

export default connect(mapStateToProps, { logout })(withRouter(LeftNav));

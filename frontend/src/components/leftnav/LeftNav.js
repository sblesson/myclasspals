import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../../layout/Spinner';
import { Menu, Layout, Result } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import CreateGroupModal from '../groups/modal/CreateGroupModal';

import './LeftNav.scss';

const LeftNav = ({ screen = '', id, group }) => {
  const { Sider } = Layout;
  let myGroups = [];

  const [selectedMenuItem, setSelectedNavItem] = useState(['0']);
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
            value: group.id,
            url: '/dashboard/' + group.id
          }));
          return myGroups;
        } else {
          return null;
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
            name: 'account',
            title: 'Account Settings',
            icon: 'fas fa-user-cog',
            url: '/account'
          }
        ];

      case 'groups':
      case 'discovergroup':
        return [
          {
            name: 'my_groups',
            title: 'My Groups',
            icon: 'fas fa-users',
            url: '/groups'
          },
          {
            name: 'search_group',
            title: 'Discover Groups',
            icon: 'fas fa-search',
            url: '/discovergroup/'
          }
        ];
      case 'group':
        return [
          {
            name: 'members',
            title: 'Membership',
            icon: 'fas fa-user-edit',
            url: '/group/' + id + '/members'
          },

          {
            name: 'about_group',
            title: 'About',
            //icon: 'fas fa-user-edit',
            url: '/group/' + id + '/about'
          }
        ];

      default:
        return null;
    }
  };

  const sideNavMenu = getNavByScreen(screen);
  console.log(sideNavMenu);

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
            selectedKeys={selectedMenuItem}
            defaultSelectedKeys={selectedMenuItem}
            onClick={e => {
              setSelectedNavItem([e.key]);
            }}
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

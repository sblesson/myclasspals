import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../../layout/Spinner';
import { Menu, Layout } from 'antd';
import { Link, withRouter } from 'react-router-dom';

import './LeftNav.scss';

const LeftNav = ({ screen = '', id, auth, group }) => {
  const { Sider } = Layout;

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
  }, []);

  const getNavByScreen = screen => {
    switch (screen) {
      case 'dashboard': {
        let user = null;
        let userGroup = null;
        let myGroups = [];
        if (auth && auth.user) {
          //first time groupId is not passed in url param.
          //So get groupId from user group first item
          try {
            user = JSON.parse(auth.user);
          } catch (e) {
            // You can read e for more info
            // Let's assume the error is that we already have parsed the auth.user
            // So just return that
            user = auth.user;
          }
          if (user && user.userGroup && user.userGroup.length > 0) {
            userGroup = user.userGroup;
          }
        }
        if (userGroup && userGroup.length > 0) {
          myGroups = userGroup.map(group => ({
            id: group.id,
            title: group.groupName,
            value: group.id,
            url: '/dashboard/' + group.id
          }));
        }

        return myGroups;
      }
      case 'messages': {
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
      case 'create-profile':
        return [];

      default:
        return [];
    }
  };

  const sideNavMenu = getNavByScreen(screen);

  return (
    <Fragment>
      {auth && auth.isAuthenticated && screen !== 'messages' ? (
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
      ) : (
        ''
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

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { Menu } from 'antd';
import { Link, withRouter } from 'react-router-dom';

import { getLeftNav } from '../../actions/leftnav';

import './LeftNav.scss';

const LeftNav = ({
  screen = 'dashboard',
  id,
  getLeftNav,
  leftnav: { leftnav, loading },
  auth
}) => {
  const [selectedMenuItem, setSelectedNavItem] = useState(['0']);

  useEffect(() => {
    if (screen !== 'dashboard') {
      getLeftNav(screen, id);
    }
  }, [getLeftNav]);

  const getNavByScreen = screen => {
    switch (screen) {
      case 'dashboard': {
        let user = null;
        let userGroup = null;
        let myGroups = [];
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

        if (userGroup && userGroup.length > 0) {
          myGroups = userGroup.map(group => ({
            id: group.id,
            title: group.groupName,
            value: group.id,
            icon: 'fas fa-users',
            url: '/dashboard/' + group.id
          }));
        }

        return myGroups;
      }
      default:
        return leftnav;
    }
  };
  const sideNavMenu = getNavByScreen(screen);

  return loading & (screen !== 'dashboard') ? (
    <Spinner />
  ) : (
    <div className='leftnav-sidebar'>
      <Menu
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
    </div>
  );
};

LeftNav.propTypes = {
  getLeftNav: PropTypes.func.isRequired,
  leftnav: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    leftnav: state.leftnav,
    categories: state.post.categories,
    auth: state.auth,
    group: state.group
  };
};

export default connect(mapStateToProps, { getLeftNav })(withRouter(LeftNav));

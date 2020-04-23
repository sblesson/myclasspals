import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import LeftNavItem from './LeftNavItem';
import NavCategoryItem from './NavCategoryItem';
import Spinner from '../layout/Spinner';

import { getLeftNav } from '../../actions/leftnav';

import './LeftNav.scss';

const LeftNav = ({
  screen = 'dashboard',
  id,
  getLeftNav,
  leftnav: { leftnav, loading },
  categories,
  auth
}) => {
  console.log(categories);
  let myGroups = [];
  let user = null;
  let userGroup = null;
  useEffect(() => {
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
  }, [auth.user]);

  let depthStep = 10,
    depth = 0,
    expanded;

  useEffect(() => {
    if (screen !== 'dashboard') {
      getLeftNav(screen, id);
    }
  }, [getLeftNav]);

  return loading & (screen !== 'dashboard') ? (
    <Spinner />
  ) : (
    <div className='leftnav-sidebar'>
      <List disablePadding dense>
        {screen !== 'dashboard' &&
          leftnav &&
          leftnav.length > 0 &&
          leftnav.map((leftNavItem, index) => (
            <React.Fragment key={`${leftNavItem.name}${index}`}>
              {leftNavItem === 'divider' ? (
                <Divider style={{ margin: '6px 0' }} />
              ) : (
                <LeftNavItem
                  depthStep={depthStep}
                  depth={depth}
                  expanded={expanded}
                  item={leftNavItem}
                />
              )}
            </React.Fragment>
          ))}
        {screen == 'dashboard' &&
          myGroups &&
          myGroups.length > 0 &&
          myGroups.map((leftNavItem, index) => (
            <React.Fragment key={`${leftNavItem.title}${index}`}>
              {leftNavItem === 'divider' ? (
                <Divider style={{ margin: '6px 0' }} />
              ) : (
                <NavCategoryItem
                  depthStep={depthStep}
                  depth={depth}
                  expanded={expanded}
                  item={leftNavItem}
                  index={index}
                />
              )}
            </React.Fragment>
          ))}
      </List>
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
    auth: state.auth
  };
};

export default connect(mapStateToProps, { getLeftNav })(LeftNav);

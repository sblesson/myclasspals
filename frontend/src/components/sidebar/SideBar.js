import React, { Fragment, useState, useEffect } from 'react';
import _ from 'lodash';

import { Link } from 'react-router-dom';

import { Tabs, Menu, Drawer, Button } from 'antd';
import { connect } from 'react-redux';
import CreateGroupModal from '../groups/modal/CreateGroupModal';
import DiscoverGroupModal from '../groups/modal/DiscoverGroupModal';
import UserMenu from '../topnavbar/UserMenu';

import {
  SettingOutlined,
  MenuOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import './SideBar.scss';

const { SubMenu } = Menu;

const SideBar = ({ group }) => {
  const getGroupPrivacyLabel = (privacy) => {
    if (privacy) {
      let groupPrivacy = privacy.toLowerCase();
      groupPrivacy = _.startCase(groupPrivacy);

      if (privacy === 'PRIVATE') {
        return (
          <span>
            <i className='fa fa-lock' title='private group'></i>&nbsp;
          </span>
        );
      } else {
        return (
          <span>
            <i className='fa fa-globe' title='public group'></i> &nbsp;
          </span>
        );
      }
    }
  };
  const getMenuItems = (requestedItems) => {
    let menuItems = requestedItems.map((current) => (
      <Menu.Item
        key={current.id}
        //onTitleClick={(key, event) => routeChange(key, event)}
      >
        <Link to={'/dashboard/' + current.id}>
          {current.role === 'admin' ? (
            <span style={{ color: 'grey' }}>
              {getGroupPrivacyLabel(current.privacy)}

              {current.groupName}
            </span>
          ) : (
            <span style={{ color: '#696969' }}>
              {getGroupPrivacyLabel(current.privacy)}

              {current.groupName}
            </span>
          )}
        </Link>
      </Menu.Item>
    ));
    return menuItems;
  };

  const SideMenu = () => {
    return (
      <Menu
        style={{ padding: '.1rem', marginTop: '1rem' }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['side-menu']}
        mode={''}
        theme={'light'}
      >
        <Menu.Divider />
        <Menu.ItemGroup key='side-menu'>
          {group.userGroup && group.userGroup.length > 0 ? (
            <SubMenu
              key='sub-mygroups'
              icon={<SettingOutlined />}
              title='My Groups'
            >
              {getMenuItems(group.userGroup)}
            </SubMenu>
          ) : (
            ''
          )}

          {group.pendingInvitedUserGroups &&
          group.pendingInvitedUserGroups.length > 0 ? (
            <SubMenu
              key='sub-pending'
              icon={<SettingOutlined />}
              title='Pending Invitations'
            >
              {getMenuItems(group.pendingInvitedUserGroups)}
            </SubMenu>
          ) : (
            ''
          )}
          {group.requestedUserGroup && group.requestedUserGroup.length > 0 ? (
            <SubMenu
              key='sub-requested'
              icon={<SettingOutlined />}
              title='Requested To Join'
            >
              {getMenuItems(group.requestedUserGroup)}
            </SubMenu>
          ) : (
            ''
          )}
        </Menu.ItemGroup>
      </Menu>
    );
  };

  return <SideMenu />;
};

const mapStateToProps = (state) => ({
  group: state.group,
  auth: state.auth,
});

export default connect(mapStateToProps, {})(SideBar);

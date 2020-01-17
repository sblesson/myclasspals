import React from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import SideNavItem from './SideNavItem';

import './SideNav.scss';

const SideNav = () => {
  let depthStep = 10,
    depth = 0,
    expanded;
  const items = [
    {
      name: 'home',
      label: 'Home',
      icon: 'fa fa-home'
    },
    {
      name: 'billing',
      label: 'Billing',
      icon: 'fa fa-fw fa-lg fa-home',
      items: [
        {
          name: 'statements',
          label: 'Statements',
          icon: 'fa fa-fw fa-lg fa-home'
        },
        { name: 'reports', label: 'Reports', icon: 'fa fa-fw fa-lg fa-home' }
      ]
    },
    {
      name: 'settings',
      label: 'Settings',
      icon: 'fa fa-fw fa-lg fa-home',

      items: [
        { name: 'profile', label: 'Profile', icon: 'fa fa-fw fa-lg fa-home' },
        {
          name: 'insurance',
          label: 'Insurance',
          icon: 'fa fa-fw fa-lg fa-home'
        },
        {
          name: 'notifications',
          label: 'Notifications',
          icon: 'fa fa-fw fa-lg fa-home',

          items: [
            { name: 'email', label: 'Email', icon: 'fa fa-fw fa-lg fa-home' },
            {
              name: 'desktop',
              label: 'Desktop',
              icon: 'fa fa-fw fa-lg fa-home',

              items: [
                {
                  name: 'schedule',
                  label: 'Schedule',
                  icon: 'fa fa-fw fa-lg fa-home'
                },
                {
                  name: 'frequency',
                  label: 'Frequency',
                  icon: 'fa fa-fw fa-lg fa-home'
                }
              ]
            },
            { name: 'sms', label: 'SMS', icon: 'fa fa-fw fa-lg fa-home' }
          ]
        }
      ]
    }
  ];
  return (
    <div className='sidebar'>
      <List disablePadding dense>
        {items.map((sidebarItem, index) => (
          <React.Fragment key={`${sidebarItem.name}${index}`}>
            {sidebarItem === 'divider' ? (
              <Divider style={{ margin: '6px 0' }} />
            ) : (
              <SideNavItem
                depthStep={depthStep}
                depth={depth}
                expanded={expanded}
                item={sidebarItem}
              />
            )}
          </React.Fragment>
        ))}
      </List>
    </div>
  );
};

export default SideNav;

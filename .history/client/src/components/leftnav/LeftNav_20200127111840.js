import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import LeftNavItem from './LeftNavItem';

import { getLeftNav } from '../../actions/leftnav';

import './LeftNav.scss';

const LeftNav = ({ getLeftNav }) => {
  console.log(getLeftNav);
  let depthStep = 10,
    depth = 0,
    expanded;

  useEffect(() => {
    getLeftNav();
  }, [getLeftNav]);

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
        {items.map((leftNavItem, index) => (
          <React.Fragment key={`${leftNavItem.name}${index}`}>
            {sidebarItem === 'divider' ? (
              <Divider style={{ margin: '6px 0' }} />
            ) : (
              <LeftNavItem
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

LeftNav.propTypes = {
  getLeftNav: PropTypes.func.isRequired,
  leftnav: PropTypes.array.isRequired
};

const mapStateToProps = state => {
  return {
    leftnav: state.leftnav
  };
};

export default connect(mapStateToProps, { getLeftNav })(LeftNav);

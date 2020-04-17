import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import DropDownMenu from '../dropdownmenu/DropDownMenu';
import { Tabs, Input, Radio, Card } from 'antd';
import './HeaderNav.scss';

const AuthLinks = (isLoggedIn = false, match, user, searchPost) => {
  console.log(user);
  let groupId = null;

  useEffect(() => {
    if (match && match.params && match.params.id) {
      groupId = match.params.id;
    } else {
      //first time groupId is not passed in url param.
      //So get groupId from user first item
      //groupId = user.userGroup[0].id;
      console.log(user);
      //first time groupId is not passed in url param.
      //So get groupId from user group first item
      try {
        user = JSON.parse(user);
        groupId = user.userGroup[0].id;
        console.log(user);
        console.log(groupId);
      } catch (e) {
        // You can read e for more info
        // Let's assume the error is that we already have parsed the
      }
    }
  }, [user, match]);

  const { Search } = Input;

  console.log(isLoggedIn);
  if (isLoggedIn) {
    return (
      <Menu borderless className='top-menu' fixed='top'>
        <Menu.Item header className='logo'>
          <div className='column docs-icon-set-column'>
            <p className='name'>ZZ</p>
          </div>
        </Menu.Item>
        <Menu.Item>
          <Search
            placeholder='Seach post'
            onSearch={value => {
              console.log(value);

              {
                searchPost({ groupId: groupId, keyword: value });
              }
            }}
            style={{ width: 300 }}
            enterButton
          />{' '}
        </Menu.Item>
        <Menu.Menu className='nav-container'>
          <Menu.Menu position='right'>
            <Menu.Item>
              <Link to='/dashboard'>{'Home'}</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to='/groups'>{'Groups'}</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to='/messages'>{'Messages'}</Link>
            </Menu.Item>
            <Menu.Item>
              <DropDownMenu />
            </Menu.Item>
          </Menu.Menu>
        </Menu.Menu>
      </Menu>
    );
  } else {
    return (
      <Menu borderless className='top-menu' fixed='top'>
        <Menu.Item header className='logo'>
          <div class='column docs-icon-set-column'>
            <p class='name'>ZZ</p>
          </div>
        </Menu.Item>
        <Menu.Menu className='nav-container'>
          <Menu.Menu position='right'>
            <Menu.Item>
              <Link to='/dashboard'>{'Login'}</Link>
            </Menu.Item>
          </Menu.Menu>
        </Menu.Menu>
      </Menu>
    );
  }
};

export default AuthLinks;

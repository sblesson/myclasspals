import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Menu } from 'semantic-ui-react';
import { logout } from '../../actions/auth';
import AuthLinks from './headernav/AuthLinks';
import GuestLinks from './headernav/GuestLinks';
import { searchPost } from '../../actions/post';
import { Input } from 'antd';
import DropDownMenu from './dropdownmenu/DropDownMenu';

const Navbar = ({
  auth: { isAuthenticated, loading, user },
  logout,
  searchPost,
  match,
  group
}) => {
  let groupId;
  const { Search } = Input;

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
        console.log('fsklflksklfdsklsdfkl');

        console.log(groupId);
      } catch (e) {
        // You can read e for more info
        // Let's assume the error is that we already have parsed the
      }
    }
  }, [user, match, searchPost]);

  const authLinks = <AuthLinks user={user} searchPost={searchPost} />;

  const guestLinks = <GuestLinks />;

  return (
    <nav className='navbar'>
      <h1>
        <Link to='/'></Link>
      </h1>
      {!loading && (
        <Fragment>
          {isAuthenticated ? (
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

                    searchPost({ groupId: groupId, keyword: value });
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
          ) : (
            guestLinks
          )}
        </Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  group: state.group
});

export default connect(mapStateToProps, { logout, searchPost })(Navbar);

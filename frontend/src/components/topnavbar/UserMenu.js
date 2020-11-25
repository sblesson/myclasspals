import React, { Fragment, useEffect, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import './TopNavbar.scss';
import IdleTimerContainer from '../../utils/idleTimerContainer';
const SubMenu = Menu.SubMenu;

const UserMenu = ({ logout }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isMountedRef = useRef(null);

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
    };
  }, [isMountedRef]);

  let selectedKey = window.location.pathname.split('/')[1];
  selectedKey = selectedKey ? selectedKey : 'register';

  const LoggedInMenu = () => {
    return (
      <Fragment>
        <IdleTimerContainer></IdleTimerContainer>
        <Menu
          theme='light'
          mode={'horizontal'}
          defaultSelectedKeys={[selectedKey]}
        >
          <Menu.Item key='dashboard'>
            <Link to='/dashboard'>{'Home'}</Link>
          </Menu.Item>
          <Menu.Item key='events'>
            <Link to='/events'>{'Events'}</Link>
          </Menu.Item>
          <Menu.Item key='messages'>
            <Link to='/messages'>{'Message'}</Link>
          </Menu.Item>
          {!isMobile && (
            <Menu.Item key='invite'>
              <Link to='/invite'>{'Invite'}</Link>
            </Menu.Item>
          )}

          <SubMenu title={<span>User</span>}>
            <Menu.Item key='account'>
              {' '}
              <Link to='/account'>{'Account'}</Link>
            </Menu.Item>
            {isMobile && (
              <Menu.Item key='invite'>
                <Link to='/invite'>{'Invite'}</Link>
              </Menu.Item>
            )}
            <Menu.Item key='logout' onClick={(event) => logout(event)}>
              Log out
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Fragment>
    );
  };
  return <LoggedInMenu />;
};

UserMenu.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default connect(null, { logout })(UserMenu);

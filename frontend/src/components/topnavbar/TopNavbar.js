import React, { useRef, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { Layout, Drawer, Button } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import UserMenu from './UserMenu';
import GuestMenu from './GuestMenu';
import './TopNavbar.scss';

const TopNavbar = ({ auth: { isAuthenticated } }) => {
  const history = useHistory();
  const { Header } = Layout;
  const isMountedRef = useRef(null);

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
    };
  }, [isMountedRef]);

  const goToHome = () => {
    const path = isAuthenticated ? '/dashboard' : '/';
    history.push(path);
  };

  //For topmenu responsive drawer
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  return (
    <Header className='top-header'>
      <div className='logo' onClick={goToHome}>
        <div className='logo-image'></div>
        <div className='logo-text'>MyClassPals</div>
      </div>
      {isMobile ? (
        <>
          <i className='fas fa-bars drawer-icon' onClick={showDrawer}></i>
          <Drawer
            placement='right'
            closable={true}
            onClose={onClose}
            visible={visible}
          >
            {isAuthenticated ? (
              <UserMenu isMobile={isMobile} />
            ) : (
              <GuestMenu isMobile={isMobile} />
            )}
          </Drawer>
        </>
      ) : (
        <div className='top-right-menu'>
          {isAuthenticated ? (
            <UserMenu isMobile={isMobile} />
          ) : (
            <GuestMenu isMobile={isMobile} />
          )}
        </div>
      )}
    </Header>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(TopNavbar);

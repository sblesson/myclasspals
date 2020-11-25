import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';

import IdleTimer from 'react-idle-timer';
import { Modal } from 'antd';
import { logout } from '../actions/auth';

const IdleTimerContainer = ({ logout }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const idleTimerRef = useRef(null);
  const sessionTimeoutRef = useRef(null);
  const onIdle = () => {
    setModalIsOpen(true);
    sessionTimeoutRef.current = setTimeout(onLogout, 20000);
  };
  const stayActive = () => {
    setModalIsOpen(false);
    setIsUserLoggedIn(true);
    clearTimeout(sessionTimeoutRef.current);
  };
  const onLogout = () => {
    setModalIsOpen(false);
    setIsUserLoggedIn(false);
    logout();
  };
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        centered
        visible={modalIsOpen}
        okText='Keep me signed in'
        onOk={stayActive}
        cancelText='Logout'
        onCancel={onLogout}
      >
        <h2>You've been idle for a while!</h2>
        <p>You will be logged out soon</p>
      </Modal>
      <IdleTimer
        ref={idleTimerRef}
        timeout={60 * 2 * 1000}
        onIdle={onIdle}
      ></IdleTimer>
    </div>
  );
};

export default connect(null, { logout })(IdleTimerContainer);

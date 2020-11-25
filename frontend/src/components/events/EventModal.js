import React, { useState, useEffect, Fragment } from 'react';
import { Modal } from 'antd';
import { connect } from 'react-redux';

import CreateEventForm from './CreateEventForm';
//import './PostModal.scss';

const EventModal = ({ group }) => {
  const [visible, setModalVisibility] = useState(false);

  const showModal = () => {
    setModalVisibility(true);
  };

  const hideModal = () => {
    setModalVisibility(false);
  };
  const toggleModal = () => {
    setModalVisibility(!visible);
  };

  return (
    <Fragment>
      <div className='new-event-form' onClick={showModal}>
        <div
          style={{
            display: 'flex',
            flex: '1',
            justifyContent: 'flex-end',
            margin: '1rem 0',
            cursor: 'pointer',
          }}
        >
          <button
            className='ant-btn ant-btn-primary btn-primary float-right'
            type='submit'
          >
            <span>
              <i className='far fa-calendar-alt'></i>
              &nbsp; Add Event
            </span>{' '}
          </button>
        </div>
      </div>
      <Modal
        centered
        title={'Create event'}
        visible={visible}
        okText='Create'
        onOk={hideModal}
        onCancel={toggleModal} //pass close logic here
        destroyOnClose={true}
        cancelButtonProps={{ style: { display: 'none' } }}
        destroyOnClose={true}
        footer={null}
      >
        <CreateEventForm
          hideModal={hideModal}
          group={group}
          isGenericEvent={true}
        />
      </Modal>
    </Fragment>
  );
};

const mapDispatchToProps = (state) => ({
  group: state.group,
});
export default connect(mapDispatchToProps, {
  mapDispatchToProps,
})(EventModal);

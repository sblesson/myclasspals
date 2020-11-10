import React, { useState, useEffect, Fragment } from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import CreateEventForm from '../../events/CreateEventForm';
//import './PostModal.scss';

const PostModal = ({}) => {
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
        <>
          <div className='new-event-action'>
            <div className='avatar-container'>
              <PlusCircleOutlined
                style={{ color: '#45b3e0', paddingLeft: '0.5rem' }}
              />
              <span className='new-event-action__label'>Create event</span>
            </div>
          </div>
        </>
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
        <CreateEventForm group={group} setModal={setModalVisibility} />
      </Modal>
    </Fragment>
  );
};

export default EventModal;

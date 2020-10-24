import React, { useState, useEffect } from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import { Tabs, Modal } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostCategorySelect from '../../common/postcategoryselect/PostCategorySelect';

import { addPost, addEvent } from '../../../actions/post';
import BookingForm from './BookingForm';
import CreatePostForm from './CreatePostForm';
import CreateEventForm from '../../events/CreateEventForm';
import './PostModal.scss';

const PostModal = ({ isMobile, addPost, addEvent, history, group, auth }) => {
  const { TabPane } = Tabs;

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
    <div>
      <div className='new-post-form' onClick={showModal}>
        <>
          <div className='new-post-action'>
            <div className='avatar-container'>
              <PlusCircleOutlined
                style={{ color: '#45b3e0', paddingLeft: '0.5rem' }}
              />
              <span className='new-post-action__label'>Create post, event</span>
            </div>
          </div>
        </>
      </div>
      <Modal
        centered
        visible={visible}
        onOk={hideModal}
        onCancel={toggleModal} //pass close logic here
        destroyOnClose={true}
        cancelButtonProps={{ style: { display: 'none' } }}
        destroyOnClose={true}
        footer={null}
      >
        <Tabs defaultActiveKey='1'>
          <TabPane tab={'Post'} key='1'>
            <CreatePostForm group={group} />
          </TabPane>
          <TabPane tab={'Event'} key='2'>
            <CreateEventForm />
          </TabPane>
          <TabPane tab={'Booking Form'} key='3'>
            <BookingForm />
          </TabPane>
        </Tabs>
      </Modal>
    </div>
  );
};

PostModal.propTypes = {
  addPost: PropTypes.func.isRequired,
};

const mapDispatchToProps = (state) => ({
  group: state.group,
  auth: state.auth,
});

export default connect(mapDispatchToProps, {
  addPost,
  addEvent,
  mapDispatchToProps,
})(withRouter(PostModal));

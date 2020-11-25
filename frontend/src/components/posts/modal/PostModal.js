import React, { useState, useEffect } from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import { Tabs, Modal, Button } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../../actions/post';

import CreatePostForm from './CreatePostForm';
import CreateEventForm from '../../events/CreateEventForm';
import './PostModal.scss';

const PostModal = ({ group }) => {
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
            <Button
              className='avatar-container 
            ant-btn btn-primary'
            >
              <PlusCircleOutlined
                style={{
                  color: '#fff',
                  paddingLeft: '0.5rem',
                  paddingRight: '0.5rem',
                }}
              />
              <span className='new-post-action__label'>Create post, event</span>
            </Button>
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
          <TabPane
            tab={
              <span>
                <i className='far fa-comment-alt'></i>
                &nbsp; Chat
              </span>
            }
            key='1'
          >
            <CreatePostForm group={group} hideModal={hideModal} />
          </TabPane>
          <TabPane
            tab={
              <span>
                <i className='far fa-calendar-alt'></i>
                &nbsp; Event
              </span>
            }
            key='2'
          >
            <CreateEventForm group={group} hideModal={hideModal} />
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
  mapDispatchToProps,
})(withRouter(PostModal));

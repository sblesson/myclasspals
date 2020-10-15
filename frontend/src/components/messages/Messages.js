import React, { Fragment, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

import { Empty, Spin } from 'antd';
import { getPrivateMessages, getPost, clearMessages } from '../../actions/post';
import PrivateMessageModal from './modal/PrivateMessageModal';

import MessagesSider from './MessagesSider';
import MessageDetailsPage from './MessageDetailsPage';

import './Messages.scss';
const Messages = React.memo(
  ({
    getPrivateMessages,
    getPost,
    post: { messages, loading },
    auth,
    match,
  }) => {
    console.log('inside Message DASHBIARD');
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const isCurrent = useRef(true);
    let messageId;

    useEffect(() => {
      if (isCurrent.current) {
        getPrivateMessages(
          { userId: auth.user.email, isPrivate: true },
          (cancelTokenSrc) => {
            cancelTokenSrc.cancel();
          }
        );
      }
      return () => {
        //called when component is going to unmount
        isCurrent.current = false;
      };
    }, [isCurrent]);

    useEffect(() => {
      if (match && match.params && match.params.id) {
        messageId = match.params.id;
        //user clicked on another group from dashboard leftnav groups menu,
        //get groupId from params
        console.log(messageId);
        getPost(messageId, (cancelTokenSrc) => {
          //loading = false;
          cancelTokenSrc.cancel();
        });
      }

      return () => {};
    }, [getPost, match]);

    const DeskTopView = () => {
      if (loading) {
        return <Spin />;
      } else if (messages && messages.length > 0) {
        return (
          <div style='message-body' style={{ marginLeft: '2rem' }}>
            <PrivateMessageModal />

            <div style={{ display: 'flex' }}>
              <MessagesSider
                messageUrl={'/messages/'}
                userEmail={auth.user.email}
              />

              <MessageDetailsPage
                loading={loading}
                isMobile={isMobile}
                userEmail={auth.user.email}
              ></MessageDetailsPage>
            </div>
          </div>
        );
      } else {
        return <EmptyMessage />;
      }
    };

    const MobileView = () => {
      if (messages && messages.length > 0) {
        return (
          <>
            <PrivateMessageModal />

            <MessagesSider
              messageUrl={'/message/'}
              userEmail={auth.user.email}
            />
          </>
        );
      } else {
        return <EmptyMessage />;
      }
    };

    const EmptyMessage = () => (
      <Empty
        image='https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'
        imageStyle={{
          height: 60,
        }}
        className='centered-content'
        description={
          <span>
            You have no messages in your inbox. Create new by clicking compose
            button.
          </span>
        }
      >
        <PrivateMessageModal userId={auth.user._id} />
      </Empty>
    );
    return <>{isMobile ? <MobileView /> : <DeskTopView />}</>;
  },
  (prevProps, nextProps) => {
    /*     if (
      prevProps.post &&
      prevProps.post.currentPost &&
      nextProps.post.currentPost &&
      prevProps.post.currentPost._id !== nextProps.post.currentPost._id
    ) {
      return false;
    } else */ if (
      prevProps.match.params &&
      prevProps.match.params.id !== nextProps.match.params.id
    ) {
      return false;
    } else {
      return true;
    }
  }
);

Messages.propTypes = {
  getPrivateMessages: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getPrivateMessages,
  getPost,
})(Messages);

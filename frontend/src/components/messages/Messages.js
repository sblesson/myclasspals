import React, { Fragment, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

import { Menu, Layout, Divider, Empty, Button, Spin } from 'antd';
import {
  getPrivateMessages,
  getPost,
  addMessageReply,
} from '../../actions/post';
import PrivateMessageModal from './modal/PrivateMessageModal';

import DeletePostModal from '../posts/modal/DeletePostModal';
import { EllipsisOutlined } from '@ant-design/icons';
import Ellipsis from 'ant-design-pro/lib/Ellipsis';

import MessagesSider from './MessagesSider';
import MessageDetailsPage from './MessageDetailsPage';

import './Messages.scss';
const Messages = ({
  getPrivateMessages,
  getPost,
  addMessageReply,
  post: { messages, loading, currentPost },
  auth,
  match,
}) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isCurrent = useRef(true);
  useEffect(() => {
    return () => {
      //called when component is going to unmount
      isCurrent.current = false;
    };
  }, []);

  useEffect(() => {
    if (auth && auth.user && auth.user.email) {
      getPrivateMessages(
        { userId: auth.user.email, isPrivate: true },
        (cancelTokenSrc) => {
          cancelTokenSrc.cancel();
        }
      );
    } else {
      const email = localStorage.getItem('userEmail');
      if (isCurrent.current) {
        loading = true;

        getPrivateMessages(
          { userId: email, isPrivate: true },
          (cancelTokenSrc) => {
            loading = false;
            cancelTokenSrc.cancel();
          }
        );
      }
    }
  }, [getPrivateMessages, auth.user._id]);

  function callPost(checkCurrent, messageId) {
    if (checkCurrent) {
      loading = true;
      getPost(messageId, (cancelTokenSrc) => {
        loading = false;
        cancelTokenSrc.cancel();
      });
    }
  }

  useEffect(() => {
    if (match && match.params && match.params.id) {
      callPost(isCurrent.current, match.params.id);
    }/*  else if (messages && messages.length > 0) {
      callPost(isCurrent.current, messages[0]._id);
    } */

    return () => {
      //todo
    };
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
              messages={messages}
              messageUrl={'/messages/'}
              userEmail={auth.user.email}
            />

            {currentPost !== null && !isMobile && (
              <MessageDetailsPage
                loading={loading}
                isMobile={isMobile}
                currentPost={currentPost}
                userEmail={auth.user.email}
              ></MessageDetailsPage>
            )}
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
            messages={messages}
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
      <PrivateMessageModal />
    </Empty>
  );
  return <>{isMobile ? <MobileView /> : <DeskTopView />}</>;
};

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
  addMessageReply,
})(Messages);

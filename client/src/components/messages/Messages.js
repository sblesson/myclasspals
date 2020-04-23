import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import MessageItem from './MessageItem';
import { searchPost } from '../../actions/post';
import { FormOutlined } from '@ant-design/icons';
import PrivateMessageModal from './modal/PrivateMessageModal';

import { Tab } from 'semantic-ui-react';

import './Messages.scss';
const Messages = ({ searchPost, post: { posts, loading }, auth }) => {
  useEffect(() => {
    searchPost({ userId: auth.user._id, isPrivate: true });
  }, [searchPost, auth.user._id]);

  console.log(posts);
  const getPanes = () => {
    let panes = [];
    if (posts && posts.length > 0) {
      panes = posts.map(message => ({
        menuItem: message.message,
        render: () => (
          <Tab.Pane key={message._id}>
            {' '}
            <MessageItem key={message._id} message={message} />
          </Tab.Pane>
        )
      }));
    }
    return panes;
  };
  let panes = getPanes();
  console.log(panes);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className='message-head'>
            <PrivateMessageModal />
          </div>

          {panes.length > 0 ? (
            <Tab
              menu={{ fluid: true, vertical: true }}
              menuPosition='left'
              panes={panes}
            />
          ) : (
            <h4>No messages found...</h4>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

Messages.propTypes = {
  searchPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth
});

export default connect(mapStateToProps, { searchPost })(Messages);

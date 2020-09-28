import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import GroupPage from './GroupPage';
import { searchPost } from '../../actions/post';
import {
  getGroupDetails,
  approveUserGroupRequest,
  declineUserGroupRequest,
  acceptUserGroupInvitation,
} from '../../actions/group';
import './GroupCard.scss';

const SingleGroup = ({
  loading,
  group,
  getGroupDetails,
  searchPost,
  match,
  auth,
  history,
}) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const isCurrent = useRef(true);
  let groupId;

  useEffect(() => {
    return () => {
      //called when component is going to unmount
      isCurrent.current = false;
    };
  }, []);

  useEffect(() => {
    if (match && match.params && match.params.id) {
      groupId = match.params.id;
      //user clicked on another group from dashboard leftnav groups menu,
      //get groupId from params
      if (isCurrent.current) {
        getGroupDetails(groupId, (cancelTokenSrc) => {
          cancelTokenSrc.cancel();
        });
        searchPost(
          {
            groupId: groupId,
          },
          (cancel) => {
            cancel();
          }
        );
      }
    }

    return () => {
      //todo
    };
  }, [getGroupDetails, match]);

  //For single message view, if page expands show message list and message
  useEffect(() => {
    if (!isMobile && match && match.params && match.params.id) {
      groupId = match.params.id;
      history.push('/dashboard/' + groupId);
    }
  }, [isMobile]);

  return (
    <>
      {loading ? (
        <Spin />
      ) : (
        <div style={{ display: 'flex' }}>
          {group !== null && group.currentGroup && (
            <GroupPage
              isMobile={isMobile}
              currentGroup={group.currentGroup}
              userEmail={auth.user.email}
            ></GroupPage>
          )}
        </div>
      )}
    </>
  );
};

SingleGroup.propTypes = {
  getGroupDetails: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  group: state.group,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getGroupDetails,
  declineUserGroupRequest,
  approveUserGroupRequest,
  acceptUserGroupInvitation,
  searchPost,
})(SingleGroup);

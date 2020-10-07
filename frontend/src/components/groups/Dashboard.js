import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import GroupPage from './GroupPage';
import { searchPost } from '../../actions/post';
import {
  getGroupDetails,
  approveUserGroupRequest,
  declineUserGroupRequest,
  changeGroupUserRole,
  deleteGroup,
  acceptUserGroupInvitation,
} from '../../actions/group';
import './GroupCard.scss';
import { isMoment } from 'moment';
import GroupsSider from './GroupsSider';
import { findLastIndex } from 'lodash';

const Dashboard = ({
  loading,
  group,
  getGroupDetails,
  approveUserGroupRequest,
  acceptUserGroupInvitation,
  match,
  auth,
  history,
  searchPost,
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
    debugger;
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

  const DeskTopView = () => {
    return (
      <div style={{ display: 'flex', marginLeft: '2rem', marginTop: '3rem' }}>
        <GroupsSider groupUrl={`/dashboard/`} />

        {group !== null && group.currentGroup && !isMobile && (
          <GroupPage
            isMobile={isMobile}
            currentGroup={group.currentGroup}
            userEmail={auth.user.email}
          ></GroupPage>
        )}
      </div>
    );
  };

  const MobileView = () => {
    return <GroupsSider groupUrl={'/group/'} />;
  };

  return <>{isMobile ? <MobileView /> : <DeskTopView />}</>;
};

Dashboard.propTypes = {
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
})(Dashboard);

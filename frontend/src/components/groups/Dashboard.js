import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import { DownOutlined } from '@ant-design/icons';

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
import CreateGroupModal from './modal/CreateGroupModal';
import DiscoverGroupModal from './modal/DiscoverGroupModal';

import GroupPage from './GroupPage';

const Dashboard = React.memo(
  ({ loading, group, getGroupDetails, match, auth, history, searchPost }) => {
    console.log('inside DAAAASH');
    const isMobile = useMediaQuery({ maxWidth: 767 });

    const isCurrent = useRef(true);
    let groupId;

    useEffect(() => {
      return () => {
        //called when component is going to unmount
        isCurrent.current = false;
      };
    }, [isCurrent]);

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

    const DeskTopView = () => {
      return (
        <div style={{ display: 'flex', marginLeft: '2rem', marginTop: '3rem' }}>
          <div className='sider'>
            <DiscoverGroupModal />

            <CreateGroupModal />

            <GroupsSider groupUrl={`/dashboard/`} />
          </div>

          {group !== null && group.currentGroup && !isMobile && (
            <GroupPage
              isMobile={isMobile}
              userEmail={auth.user.email}
            ></GroupPage>
          )}
        </div>
      );
    };

    const MobileView = () => {
      return (
        <div style={{ display: 'flex', marginLeft: '2rem', marginTop: '3rem' }}>
          <div className='sider'>
            <DiscoverGroupModal />
            <CreateGroupModal />

            <GroupsSider groupUrl={'/group/'} />
          </div>
        </div>
      );
    };

    return <>{isMobile ? <MobileView /> : <DeskTopView />}</>;
  },
  (prevProps, nextProps) => {
    if (prevProps.match.params.id !== nextProps.match.params.id) {
      return false;
    } else {
      return true;
    }
  }
);

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

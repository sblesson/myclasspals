import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import DiscoverGroupModal from './modal/DiscoverGroupModal';
import CreateGroupModal from './modal/CreateGroupModal';
import GroupsList from './GroupsList';

const GroupsSider = ({ group, groupUrl }) => {
  const [adminGroups, setAdminGroups] = useState([]);
  const [memberGroups, setMemberGroups] = useState([]);

  const setGroups = () => {
    let adminGroups = [];
    let memberGroups = [];
    group.userGroup.map((group) => {
      if (group.role === 'admin') {
        adminGroups.push(group);
      } else {
        memberGroups.push(group);
      }
    });

    setAdminGroups(adminGroups);
    setMemberGroups(memberGroups);
  };

  useEffect(() => {
    setGroups();
  }, [group]);

  return (
    <div className='sider'>
      <DiscoverGroupModal />
      <CreateGroupModal />

      {adminGroups && adminGroups.length > 0 && (
        <GroupsList
          groupList={adminGroups}
          heading='Groups I manage'
          groupUrl={groupUrl}
          iconColor='rgb(107, 202, 44)'
        />
      )}
      {memberGroups && memberGroups.length > 0 && (
        <GroupsList
          groupList={memberGroups}
          heading='Groups I joined'
          groupUrl={groupUrl}
          iconColor='rgb(107, 202, 44)'
        />
      )}
      {group.pendingInvitedUserGroups &&
        group.pendingInvitedUserGroups.length > 0 && (
          <GroupsList
            groupList={group.pendingInvitedUserGroups}
            heading='Pending Invitations'
            groupUrl={groupUrl}
            iconColor='rgb(0, 196, 204)'
          />
        )}
      {group.requestedUserGroup && group.requestedUserGroup.length > 0 && (
        <GroupsList
          groupList={group.requestedUserGroup}
          heading='Requested To Join'
          groupUrl={groupUrl}
          iconColor='#d3d3d3'
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  group: state.group,
});

export default connect(mapStateToProps, {})(GroupsSider);

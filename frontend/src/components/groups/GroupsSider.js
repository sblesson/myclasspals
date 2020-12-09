import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import GroupsList from './GroupsList';

const GroupsSider = React.memo(
  ({ group, groupUrl }) => {
    const [adminGroups, setAdminGroups] = useState([]);
    const [memberGroups, setMemberGroups] = useState([]);

    const setGroups = () => {
      let adminGroups = [],
        memberGroups = [];
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
      return () => {};
    }, [group]);

    return (
      <>
        {group.pendingInvitedUserGroups &&
          group.pendingInvitedUserGroups.length > 0 && (
            <GroupsList
              groupList={group.pendingInvitedUserGroups}
              heading='Pending Invitations'
              groupUrl={groupUrl}
              iconColor='rgb(0, 196, 204)'
            />
          )}
        {adminGroups && adminGroups.length > 0 && (
          <GroupsList
            groupList={adminGroups}
            heading='Groups I am admin'
            groupUrl={groupUrl}
            iconColor='rgb(107, 202, 44)'
          />
        )}
        {memberGroups && memberGroups.length > 0 && (
          <GroupsList
            groupList={memberGroups}
            heading='Groups I am member'
            groupUrl={groupUrl}
            iconColor='rgb(107, 202, 44)'
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
      </>
    );
  },
  (prevProps, nextProps) => {
    if (prevProps.groupUrl !== nextProps.groupUrl) {
      return false;
    } else if (
      prevProps.group &&
      prevProps.group.currentGroup.id !== nextProps.group.currentGroup.id
    ) {
      return false;
    } else if (
      prevProps.group &&
      prevProps.group.pendingInvitedUserGroups.length !==
        nextProps.group.pendingInvitedUserGroups.length
    ) {
      return false;
    } else if (
      prevProps.group &&
      prevProps.group.requestedUserGroup.length !==
        nextProps.group.requestedUserGroup.length
    ) {
      return false;
    } else {
      return true;
    }
  }
);

const mapStateToProps = (state) => ({
  group: state.group,
});

export default connect(mapStateToProps, {})(GroupsSider);

export const authRedirect = (auth, history) => {
  let groupId;

  if (auth && auth.user) {
    if (auth.user.userGroup && auth.user.userGroup.length > 0) {
      //first time groupId is not passed in url param.
      //So get groupId from user group first item
      groupId = auth.user.userGroup[0].id;
      history.push(`/dashboard/${groupId}`);
    } else if (
      auth.user.pendingInvitedUserGroups &&
      auth.user.pendingInvitedUserGroups.length > 0
    ) {
      //New user who got invitation from another group, redirect to groups page
      groupId = auth.user.pendingInvitedUserGroups[0].id;

      history.push(`/group/${groupId}`);
    } else if (
      auth.user.requestedUserGroup &&
      auth.user.requestedUserGroup.length > 0
    ) {
      groupId = auth.user.requestedUserGroup[0].id;
      history.push(`/group/${groupId}`);
    } else {
      //New user login for first time, not part of any groups, redirect to create profile and help user discover group
      history.push(`/onboarding`);
    }
  }
};

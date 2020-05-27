import {
  ADD_GROUP,
  UPDATE_GROUP,
  GET_ALL_GROUPS,
  SEARCH_ALL_GROUP,
  GET_ALL_GROUPS_ERROR,
  GET_GROUP,
  GET_GROUP_ERROR,
  INVITE_TO_GROUP,
  INVITE_TO_GROUP_ERROR,
  ACCEPT_USER_GROUP,
  ACCEPT_USER_GROUP_ERROR,
  REQUEST_JOIN_USER_GROUP,
  REQUEST_JOIN_USER_GROUP_ERROR,
  APPROVE_GROUP_REQUEST,
  APPROVE_GROUP_REQUEST_ERROR,
  CHANGE_GROUP_USER_ROLE,
  SEARCH_GROUP_WITH_FILTERS
} from '../actions/types';

const initialState = {
  groups: [],
  userGroup: [],
  pendingInvitedUserGroups: [],
  requestedUserGroup: [],
  searchResult: [],
  newGroup: null,
  currentGroup: {},
  isGroupAdmin: false,
  loading: true,
  error: {},
  isRequestUserGroupSuccess: false
};

const isLoggedInUserGroupAdmin = userGroupMembers => {
  let memberAdmin = null;
  const userId = JSON.parse(localStorage.getItem('user'))._id;

  if (userGroupMembers && userGroupMembers.length > 0) {
    memberAdmin = userGroupMembers.filter(item => {
      return item._id === userId && item.role === 'admin';
    });
  }
  if (memberAdmin && memberAdmin.length > 0) {
    return true;
  }
  return false;
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_GROUP:
      return {
        ...state,
        groups: [payload.userGroup, ...state.groups],
        userGroup: [payload.userGroup, ...state.groups],
        newGroup: payload.userGroup,
        loading: false
      };
    case UPDATE_GROUP:
      return {
        ...state,
        groups: [payload.userGroup, ...state.groups],
        userGroup: payload.userGroup,
        newGroup: payload.userGroup,
        loading: false
      };

    case GET_ALL_GROUPS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        userGroup: payload.userGroup,
        pendingInvitedUserGroups: payload.pendingInvitedUserGroups,
        requestedUserGroup: payload.requestedUserGroup
      };
    case SEARCH_ALL_GROUP:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        searchResult: payload.userGroupList
      };
    case SEARCH_GROUP_WITH_FILTERS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        searchResult: payload.userGroupList
      };
    case GET_GROUP:
      //Todo check why it is not getting set from return
      state.currentGroup = payload;
      return {
        ...state,
        currentGroup: payload,
        isAuthenticated: true,
        loading: false,
        isGroupAdmin: isLoggedInUserGroupAdmin(payload.userGroupMembers)
      };
    case INVITE_TO_GROUP:
      return {
        ...state,
        currentGroup: payload.userGroup,
        userGroup: payload.userGroup,
        pendingInvitedUserGroups: payload.userGroup.pendingInvitations,
        requestedUserGroup: payload.userGroup.requestedInvitations,
        loading: false
      };
    case ACCEPT_USER_GROUP:
      return {
        ...state,
        currentGroup: payload.currentGroup,
        userGroup: payload.user.userGroup,
        pendingInvitedUserGroups: payload.user.pendingInvitedUserGroups,
        requestedUserGroup: payload.user.requestedUserGroup,
        loading: false
      };
    case REQUEST_JOIN_USER_GROUP:
      let isRequestUserGroupSuccess = false;
      console.log(payload);
      if (payload && payload.origin === 'discovergroup') {
        //searchResult = payload;
        isRequestUserGroupSuccess = true;

        return {
          ...state,

          ...state,
          userGroup: payload.user.userGroup,
          pendingInvitedUserGroups: payload.user.pendingInvitedUserGroups,
          requestedUserGroup: payload.user.requestedUserGroup,
          loading: false,
          isRequestUserGroupSuccess: true
        };
      } else {
        return {
          ...state,
          userGroup: payload.user.userGroup,
          pendingInvitedUserGroups: payload.user.pendingInvitedUserGroups,
          requestedUserGroup: payload.user.requestedUserGroup,
          loading: false,
          isRequestUserGroupSuccess: isRequestUserGroupSuccess
        };
      }

    case APPROVE_GROUP_REQUEST:
      return {
        ...state,
        userGroup: payload.user.userGroup,
        pendingInvitedUserGroups: payload.user.pendingInvitedUserGroups,
        requestedUserGroup: payload.user.requestedUserGroup,
        loading: false
      };
    case CHANGE_GROUP_USER_ROLE:
      return {
        ...state,
        //group: [payload, ...state.groupName],
        loading: false
      };
    default:
      return state;
  }
}

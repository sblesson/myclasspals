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
  SEARCH_GROUP_WITH_FILTERS,
  UPDATE_GROUP_STORE,
  GET_GROUP_AUTO_COMPLETE,
  GET_GROUP_AUTO_COMPLETE_ERROR,
  CLEAR_AUTOCOMPLETE_GROUP_SEARCH,
  DELETE_GROUP
} from '../actions/types';

const initialState = {
  groups: [],
  userGroup: [],
  pendingInvitedUserGroups: [],
  requestedUserGroup: [],
  searchResult: [],
  autoCompleteSearchResult: [],
  newGroup: null,
  currentGroup: {},
  isGroupAdmin: false,
  loading: true,
  error: {},
  redirect: false,
  searchTerm: '',
  isGroupStatusUpdated: false,
  isRequestUserGroupSuccess: false
};

const isLoggedInUserGroupAdmin = userGroupMembers => {
  let memberAdmin = null;

  const userId = localStorage.getItem('userId');

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
    case UPDATE_GROUP_STORE:
      return {
        ...state,
        userGroup:
          payload.userGroup && payload.userGroup.length > 0
            ? payload.userGroup
            : [],
        pendingInvitedUserGroups:
          payload.pendingInvitedUserGroups &&
          payload.pendingInvitedUserGroups.length > 0
            ? payload.pendingInvitedUserGroups
            : [],

        requestedUserGroup:
          payload.requestedUserGroup && payload.requestedUserGroup.length > 0
            ? payload.requestedUserGroup
            : [],

        loading: false
      };
    case ADD_GROUP:
      return {
        ...state,
        userGroup: [...state.userGroup, payload.userGroup],
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
    case GET_GROUP_AUTO_COMPLETE:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        autoCompleteSearchResult: payload
      };
    case CLEAR_AUTOCOMPLETE_GROUP_SEARCH:
      return {
        ...state,
        loading: false,
        autoCompleteSearchResult: []
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
      if (payload.currentGroup.privacy === 'PRIVATE') {
        let currentRequestedGrp = payload.user.requestedUserGroup.filter(
          result => result.id === payload.currentGroup.id
        );
        currentRequestedGrp.role = 'Pending Invitation';

        if (currentRequestedGrp) {
          state.searchResult.map(result => {
            if (result.id === payload.currentGroup.id) {
              result.role = 'Pending Invitation';
              result.isGroupStatusUpdated = true;
            }
          });
          console.log(state.searchResult);
        }

        return {
          ...state,
          requestedUserGroup: payload.user.requestedUserGroup,
          loading: false,
          isRequestUserGroupSuccess: true
        };
      } else {
        let currentRequestedGrp = payload.user.userGroup.filter(
          result => result.id === payload.currentGroup.id
        );
        if (currentRequestedGrp) {
          state.searchResult.map(result => {
            if (result.id === payload.currentGroup.id) {
              result.role = 'member';
              result.isGroupStatusUpdated = true;
            }
          });
        }

        return {
          ...state,
          userGroup: payload.user.userGroup,
          loading: false,
          isRequestUserGroupSuccess: true
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
    case DELETE_GROUP:
      return {
        ...state,
        userGroup: state.userGroup.filter(group => group.id !== payload),
        loading: false
      };

    default:
      return state;
  }
}

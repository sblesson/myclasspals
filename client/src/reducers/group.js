import {
  ADD_GROUP,
  INVITE_TO_GROUP,
  GET_ALL_GROUPS,
  GET_ALL_GROUPS_ERROR,
  GET_GROUP,
  GET_GROUP_ERROR
} from '../actions/types';

const initialState = {
  groups: [],
  userGroup: [],
  pendingInvitedUserGroups: [],
  requestedUserGroup: [],
  newGroup: null,
  currentGroup: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_GROUP:
      console.log(payload);
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

    case GET_GROUP:
      return {
        ...state,
        loading: false,
        currentGroup: payload
      };
    case INVITE_TO_GROUP:
      return {
        ...state,
        //group: [payload, ...state.groupName],
        loading: false
      };
    default:
      return state;
  }
}

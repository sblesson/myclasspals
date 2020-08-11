import axios from 'axios';
import { setAlert, catchHandler } from './alert';
import {
  ADD_GROUP,
  UPDATE_GROUP,
  DELETE_GROUP,
  SEARCH_ALL_GROUP,
  GROUP_ERROR,
  GET_ALL_GROUPS,
  SEARCH_GROUP_WITH_FILTERS,
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
  CHANGE_GROUP_USER_ROLE_ERROR,
  SEARCH_ALL_GROUP_ERROR,
  UPDATE_GROUP_STORE,
  GET_GROUP_AUTO_COMPLETE,
  GET_GROUP_AUTO_COMPLETE_ERROR,
  SEND_PRIVATE_MESSAGE,
  SEARCH_POST,
  GET_USER,
  CLEAR_AUTOCOMPLETE_GROUP_SEARCH
} from './types';

// Add post
export const addGroup = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post('/usergroup/creategroup', formData, config);

    dispatch({
      type: ADD_GROUP,
      payload: res.data
    });

    dispatch(setAlert('Group Created', 'success'));
  } catch (err) {
    dispatch(
      setAlert(
        err &&
          err.response &&
          err.response.data &&
          err.response.data.message !== null
          ? err.data.message
          : 'Unable to create group, please try again later',
        'error'
      )
    );
  }
};

// Update group
export const updateGroup = (formData, callback) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    await axios.put('/usergroup/updategroup', formData, config).then(res => {
      dispatch({
        type: UPDATE_GROUP,
        payload: res.data
      });
      dispatch(setAlert('Group Updated', 'success'));
      callback();
    });
  } catch (err) {
    catchHandler(err, 'UPDATE_GROUP_ERROR');
  }
};

// Get all userGroups
export const getAllGroups = userId => async dispatch => {
  try {
    const userId = localStorage.getItem('userId');

    const response = await axios.get('/user/getuserdetails?user=' + userId);
    dispatch({
      type: GET_ALL_GROUPS,
      payload: response.data.user
    });
  } catch (err) {
    catchHandler(err, GET_ALL_GROUPS_ERROR);
  }
};
// Get all userGroups
export const getGroupAutoComplete = (key, callback) => async dispatch => {
  try {
    const response = await axios.get('/usergroup/groupautocomplete?key=' + key);

    dispatch({
      type: GET_GROUP_AUTO_COMPLETE,
      payload: response.data
    });
    callback(response.data);
  } catch (err) {
    catchHandler(err, GET_GROUP_AUTO_COMPLETE_ERROR);
  }
};
// Get all userGroups
export const getGroupDetails = (groupId, callback) => async dispatch => {
  let cancelTokenSrc = axios.CancelToken.source();

  try {
    const response = await axios.get(`/usergroup/getgroup?id=${groupId}`, {
      cancelToken: cancelTokenSrc.token
    });

    dispatch({
      type: GET_GROUP,
      payload:
        response && response.data && response.data.userGroupList.length > 0
          ? response.data.userGroupList[0]
          : null
    });
  } catch (err) {
    catchHandler(err, GET_GROUP_ERROR);
  }
  callback(cancelTokenSrc);
};
export const updateGroupStore = user => dispatch => {
  dispatch({
    type: UPDATE_GROUP_STORE,
    payload: user
  });
};

// Search Groups
export const searchGroup = searchKey => async dispatch => {
  const requestData = {
    groupKeyword: searchKey
  };
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const response = await axios.post(
      `/usergroup/getgroupbyfilter`,
      requestData,
      config
    );

    dispatch({
      type: SEARCH_ALL_GROUP,
      payload: response.data
    });
  } catch (err) {
    catchHandler(err, SEARCH_ALL_GROUP_ERROR);
  }
};

// Search Groups
export const searchGroupWithFilters = requestData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const response = await axios.post(
      `/usergroup/getgroupbyfilter`,
      requestData,
      config
    );

    dispatch({
      type: SEARCH_GROUP_WITH_FILTERS,
      payload: response.data
    });
  } catch (err) {
    catchHandler(err, SEARCH_ALL_GROUP_ERROR);
  }
};

//Admin sends users invitation to join userGroup
export const inviteToJoinUserGroup = requestData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const res = await axios.post(
      '/user/invitetousergroup',
      requestData,
      config
    );

    dispatch({
      type: INVITE_TO_GROUP,
      payload: { userGroup: res.data.userGroup }
    });

    dispatch(setAlert('Send invitation to new users', 'success'));
  } catch (err) {
    catchHandler(err, INVITE_TO_GROUP_ERROR);
  }
};
//Users accept invitation to join userGroup
export const acceptUserGroupInvitation = requestData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  requestData.action = 'INVITE_ACCEPT';
  try {
    const res = await axios.post(
      '/user/acceptusergroupinvitaion',
      requestData,
      config
    );

    if (res && res.data && res.data.user) {
      //globally update user object
      dispatch({
        type: GET_USER,
        payload: res.data
      });
    }

    let currentGroup = res.data.user.userGroup.find(
      request => request.id === requestData.groupId
    );
    currentGroup.role = 'member';
    dispatch({
      type: ACCEPT_USER_GROUP,
      payload: { user: res.data.user, currentGroup: currentGroup }
    });

    dispatch(setAlert('User added to group', 'success'));
  } catch (err) {
    catchHandler(err, ACCEPT_USER_GROUP_ERROR);
  }
};

//User sends request to join user group
export const requestToJoinUserGroup = (
  requestData,
  currentGroup,
  callback
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post('/user/requestusergroup', requestData, config);

    if (res && res.data && res.data.user) {
      //globally update user object
      dispatch({
        type: GET_USER,
        payload: res.data
      });
    }
    dispatch({
      type: REQUEST_JOIN_USER_GROUP,
      payload: { user: res.data.user, currentGroup: currentGroup }
    });
    //dispatch(setAlert('User added to group', 'success'));
    callback(res.data.user.userGroup);
  } catch (err) {
    catchHandler(err, REQUEST_JOIN_USER_GROUP_ERROR);
  }
};

//Admin approves group request initiated by user
export const approveUserGroupRequest = requestData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  requestData.action = 'REQUEST_ACCEPT';

  try {
    const res = await axios.post(
      '/user/acceptusergrouprequest',
      requestData,
      config
    );

    let currentGroup = res.data.user.userGroup.find(
      request => request.id === requestData.groupId
    );
    dispatch({
      type: APPROVE_GROUP_REQUEST,
      payload: { user: res.data.user, currentGroup: currentGroup }
    });

    dispatch(setAlert('User added to group', 'success'));
  } catch (err) {
    catchHandler(err, APPROVE_GROUP_REQUEST_ERROR);
  }
};

//Admin approves group request initiated by user
export const declineUserGroupRequest = requestData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  requestData.action = 'REQUEST_ACCEPT';

  try {
    const res = await axios.post(
      '/user/declineusergrouprequest',
      requestData,
      config
    );
    dispatch({
      type: APPROVE_GROUP_REQUEST,
      payload: res
    });

    dispatch(setAlert('User added to group', 'success'));
  } catch (err) {
    catchHandler(err, APPROVE_GROUP_REQUEST_ERROR);
  }
};

//Users change Group UserRole
export const changeGroupUserRole = requestData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const res = await axios.post(
      '/usergroup/changeuserrole',
      requestData,
      config
    );
    dispatch({
      type: CHANGE_GROUP_USER_ROLE,
      payload: res
    });

    dispatch(setAlert('User added to group', 'success'));
  } catch (err) {
    catchHandler(err, CHANGE_GROUP_USER_ROLE_ERROR);
  }
};

//remove user from group
export const removeUserFromGroup = requestData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const res = await axios.post(
      '/user/removeuserfromgroup',
      requestData,
      config
    );
    dispatch({
      type: CHANGE_GROUP_USER_ROLE,
      payload: res
    });

    dispatch(setAlert('User removed from the group', 'success'));
  } catch (err) {
    catchHandler(err, 'REMOVE_USER_FROM_GROUP');
  }
};

export const clearAutoCompleteGroupSearchResult = () => async dispatch => {
  dispatch({ type: CLEAR_AUTOCOMPLETE_GROUP_SEARCH });
};

// Delete post
export const deleteGroup = (groupId, callback) => async dispatch => {
  try {
    const res = await axios.delete(`/usergroup/group/${groupId}`);
    dispatch({
      type: DELETE_GROUP,
      payload: groupId
    });
    if (res.data.userGroup === null) {
      callback();
    }
  } catch (err) {
    catchHandler(err, 'DELETE_GROUP_ERROR');
  }
};

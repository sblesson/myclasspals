import axios from 'axios';
import { setAlert } from './alert';
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
  UPDATE_USER_GROUP,
  GET_GROUP_AUTO_COMPLETE,
  GET_GROUP_AUTO_COMPLETE_ERROR,
  SEND_PRIVATE_MESSAGE,
  SEARCH_POST
} from './types';

import { updateUserGlobal } from './auth';
import { searchPost } from './post';

// Add post
export const addGroup = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post(
      'http://localhost:8080/usergroup/creategroup',
      formData,
      config
    );

    dispatch({
      type: ADD_GROUP,
      payload: res.data
    });

    dispatch(setAlert('Group Created', 'success'));
  } catch (err) {
    dispatch({
      type: GROUP_ERROR
      //payload: { msg: err.response.statusText, status: err.response.status }
    });
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
    await axios
      .put('http://localhost:8080/usergroup/updategroup', formData, config)
      .then(res => {
        dispatch({
          type: UPDATE_GROUP,
          payload: res.data
        });
        dispatch(setAlert('Group Updated', 'success'));
        callback();
      });
  } catch (err) {
    dispatch({
      type: GROUP_ERROR
      //payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get all userGroups
export const getAllGroups = userId => async dispatch => {
  try {
    const userId = localStorage.getItem('userId');

    const response = await axios.get(
      'http://localhost:8080/user/getuserdetails?user=' + userId
    );
    dispatch({
      type: GET_ALL_GROUPS,
      payload: response.data.user
    });
  } catch (err) {
    dispatch({
      type: GET_ALL_GROUPS_ERROR
      //payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
// Get all userGroups
export const getGroupAutoComplete = key => async dispatch => {
  debugger;
  try {
    const response = await axios.get(
      'http://localhost:8080/usergroup/groupautocomplete?key=' + key
    );
    dispatch({
      type: GET_GROUP_AUTO_COMPLETE,
      payload: response.data
    });
  } catch (err) {
    dispatch({
      type: GET_GROUP_AUTO_COMPLETE_ERROR
      //payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
// Get all userGroups
export const getGroupDetails = groupId => async dispatch => {
  try {
    const response = await axios.get(
      `http://localhost:8080/usergroup/getgroup?id=${groupId}`
    );

    dispatch({
      type: GET_GROUP,
      payload:
        response && response.data && response.data.userGroupList.length > 0
          ? response.data.userGroupList[0]
          : null
    });
    dispatch(searchPost(groupId));
  } catch (err) {
    dispatch({
      type: GET_GROUP_ERROR,
      payload: { msg: err, status: err }
    });
  }
};
export const updateUserGroup = userGroup => dispatch => {
  dispatch({
    type: UPDATE_USER_GROUP,
    payload: userGroup
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
      `http://localhost:8080/usergroup/getgroupbyfilter`,
      requestData,
      config
    );

    dispatch({
      type: SEARCH_ALL_GROUP,
      payload: response.data
    });
  } catch (err) {
    dispatch({
      type: SEARCH_ALL_GROUP_ERROR,
      payload: { msg: err, status: err }
    });
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
      `http://localhost:8080/usergroup/getgroupbyfilter`,
      requestData,
      config
    );

    dispatch({
      type: SEARCH_GROUP_WITH_FILTERS,
      payload: response.data
    });
  } catch (err) {
    dispatch({
      type: SEARCH_ALL_GROUP_ERROR,
      payload: { msg: err, status: err }
    });
  }
};

//Admin sends users invitation to join userGroup
export const inviteToJoinUserGroup = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post(
      'http://localhost:8080/user/invitetousergroup',
      formData,
      config
    );
    dispatch({
      type: INVITE_TO_GROUP,
      payload: res.data
    });
    /*  if (res.data.errorCode === null) {
      getGroupDetails(JSON.parse(formData).groupId);
    } */
    dispatch(setAlert('User added to group', 'success'));
  } catch (err) {
    dispatch({
      type: INVITE_TO_GROUP_ERROR
      //payload: { msg: err.response.statusText, status: err.response.status }
    });
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
      'http://localhost:8080/user/acceptusergroupinvitaion',
      requestData,
      config
    );

    let currentGroup = res.data.user.userGroup.find(
      request => request.id === requestData.groupId
    );
    dispatch({
      type: ACCEPT_USER_GROUP,
      payload: { user: res.data.user, currentGroup: currentGroup }
    });

    dispatch(setAlert('User added to group', 'success'));
  } catch (err) {
    dispatch({
      type: ACCEPT_USER_GROUP_ERROR
      //payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//User sends request to join user group
export const requestToJoinUserGroup = (
  requestData,
  callback
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios
      .post('http://localhost:8080/user/requestusergroup', requestData, config)
      .then(res => {
        res.data.origin = requestData.origin;

        dispatch({
          type: REQUEST_JOIN_USER_GROUP,
          payload: res.data
        });

        //globally update user object
        updateUserGlobal(res.data.user);

        dispatch(setAlert('User added to group', 'success'));
        callback(requestData.groupId);
      });
  } catch (err) {
    dispatch({
      type: REQUEST_JOIN_USER_GROUP_ERROR
      //payload: { msg: err.response.statusText, status: err.response.status }
    });
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
      'http://localhost:8080/user/acceptusergrouprequest',
      requestData,
      config
    );

    dispatch({
      type: APPROVE_GROUP_REQUEST,
      payload: res
    });

    dispatch(setAlert('User added to group', 'success'));
    getGroupDetails(requestData.groupId);
  } catch (err) {
    dispatch({
      type: APPROVE_GROUP_REQUEST_ERROR
      //payload: { msg: err.response.statusText, status: err.response.status }
    });
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
      'http://localhost:8080/user/declineusergrouprequest',
      requestData,
      config
    );
    dispatch({
      type: APPROVE_GROUP_REQUEST,
      payload: res
    });

    dispatch(setAlert('User added to group', 'success'));
  } catch (err) {
    dispatch({
      type: APPROVE_GROUP_REQUEST_ERROR
      //payload: { msg: err.response.statusText, status: err.response.status }
    });
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
      'http://localhost:8080/usergroup/changeuserrole',
      requestData,
      config
    );
    dispatch({
      type: CHANGE_GROUP_USER_ROLE,
      payload: res
    });

    dispatch(setAlert('User added to group', 'success'));
  } catch (err) {
    dispatch({
      type: CHANGE_GROUP_USER_ROLE_ERROR
      //payload: { msg: err.response.statusText, status: err.response.status }
    });
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
      'http://localhost:8080/user/removeuserfromgroup',
      requestData,
      config
    );
    dispatch({
      type: CHANGE_GROUP_USER_ROLE,
      payload: res
    });

    dispatch(setAlert('User removed from the group', 'success'));
  } catch (err) {
    dispatch({
      type: CHANGE_GROUP_USER_ROLE_ERROR
      //payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

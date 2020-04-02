import axios from 'axios';
import { setAlert } from './alert';
import {
  ADD_GROUP,
  DELETE_GROUP,
  GROUP_ERROR,
  GET_ALL_GROUPS,
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
  APPROVE_GROUP_REQUEST_ERROR
} from './types';

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

    console.log(res);

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

// Get all userGroups
export const getAllGroups = userId => async dispatch => {
  try {
    const userId = JSON.parse(localStorage.getItem('user'))._id;
    console.log(userId);

    const response = await axios.get(
      'http://localhost:8080/user/getprofile?user=' + userId
    );
    console.log(response);
    dispatch({
      type: GET_ALL_GROUPS,
      payload: response.data.user[0]
    });
  } catch (err) {
    dispatch({
      type: GET_ALL_GROUPS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get all userGroups
export const getGroupDetails = groupId => async dispatch => {
  try {
    const response = await axios.get(
      `http://localhost:8080/usergroup/getgroup?id=${groupId}`
    );
    console.log(response);
    dispatch({
      type: GET_GROUP,
      payload: response.data.userGroupList[0]
    });
  } catch (err) {
    dispatch({
      type: GET_GROUP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
//Admin sends users invitation to join userGroup
export const inviteToJoinUserGroup = formData => async dispatch => {
  console.log(formData);
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

    console.log(res);

    dispatch({
      type: INVITE_TO_GROUP,
      payload: formData
    });

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
  console.log(requestData);
  requestData.action = 'INVITE_ACCEPT';
  try {
    const res = await axios.post(
      'http://localhost:8080/user/acceptusergroupinvitaion',
      requestData,
      config
    );

    console.log(res);

    dispatch({
      type: ACCEPT_USER_GROUP,
      payload: requestData
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
export const requestToJoinUserGroup = requestData => async dispatch => {
  console.log(requestData);
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  //requestData.action =

  try {
    const res = await axios.post(
      'http://localhost:8080/user/requestusergroup',
      requestData,
      config
    );

    console.log(res);

    dispatch({
      type: REQUEST_JOIN_USER_GROUP,
      payload: requestData
    });

    dispatch(setAlert('User added to group', 'success'));
  } catch (err) {
    dispatch({
      type: REQUEST_JOIN_USER_GROUP_ERROR
      //payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
//Admin approves group request initiated by user
export const approveUserGroupRequest = requestData => async dispatch => {
  console.log(requestData);
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

    console.log(res);

    dispatch({
      type: APPROVE_GROUP_REQUEST,
      payload: requestData
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
  console.log(requestData);
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

    console.log(res);

    dispatch({
      type: APPROVE_GROUP_REQUEST,
      payload: requestData
    });

    dispatch(setAlert('User added to group', 'success'));
  } catch (err) {
    dispatch({
      type: APPROVE_GROUP_REQUEST_ERROR
      //payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

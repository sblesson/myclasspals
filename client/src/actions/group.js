import axios from 'axios';
import { setAlert } from './alert';
import {
  ADD_GROUP,
  DELETE_GROUP,
  GROUP_ERROR,
  INVITE_TO_GROUP,
  INVITE_TO_GROUP_ERROR,
  GET_ALL_GROUPS,
  GET_ALL_GROUPS_ERROR,
  GET_GROUP,
  GET_GROUP_ERROR
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
      `http://localhost:8080/usergroup/getgroup?usergroupid=${groupId}`
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

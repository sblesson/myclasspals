import axios from 'axios';
import { setAlert } from './alert';
import { ADD_GROUP, DELETE_GROUP, GROUP_ERROR, GET_GROUPS } from './types';

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
      payload: formData
    });

    dispatch(setAlert('Group Created', 'success'));
  } catch (err) {
    dispatch({
      type: GROUP_ERROR
      //payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

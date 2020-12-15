import axios from 'axios';
import { setAlert, catchHandler } from './alert';

import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
} from './types';

// Get profile by ID
export const getProfileById = (userId) => async (dispatch) => {
  try {
    const userResp = await axios.get('/user/getuserdetails?user=' + userId);
    dispatch({
      type: GET_PROFILE,
      payload: userResp.data,
    });
  } catch (err) {
    catchHandler(err, PROFILE_ERROR);
    dispatch({
      type: PROFILE_ERROR,
    });
  }
};

// Create or update profile
export const updateProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.put('/user/updateuser', formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

    /*    if (!edit) {
      history.push('/dashboard');
    } */
  } catch (err) {
    catchHandler(err, 'UPDATE_PROFILE');
  }
};

// Delete account & profile
export const deleteAccount = () => async (dispatch) => {
  try {
    await axios.delete('/user/deleteUser');

    dispatch({ type: CLEAR_PROFILE });
    dispatch({ type: ACCOUNT_DELETED });

    dispatch(setAlert('Your account has been permanantly deleted'));
  } catch (err) {
    catchHandler(err, 'PROFILE_ERROR');
  }
};

export const deleteUser = (userId, callback) => async (dispatch) => {
  try {
    const res = await axios.delete(`/user/${userId}`);
    dispatch({
      type: 'DELETE_USER',
      payload: userId,
    });
  } catch (err) {
    catchHandler(err, 'DELETE_USER_ERROR');
  }
  callback();
};

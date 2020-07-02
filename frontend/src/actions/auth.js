import axios from 'axios';
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  UPDATE_USER,
  AUTH_ERROR,
  AUTH_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
  SEND_USER_EMAIL,
  EMAIL_SEND_ERROR,
  GET_USER_GROUP,
  GET_USER_GROUP_ERROR,
  GET_USER,
  SEARCH_USER,
  GET_USER_BY_REGISTRATION_ID,
  GET_USER_BY_REGISTRATION_ID_ERROR,
  DELETE_USER_REGISTRATION_TOKEN,
  DELETE_USER_REGISTRATION_TOKEN_ERROR,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_ERROR,
  UPDATE_USER_ERROR,
  UPDATE_USER_GLOBAL,
  DESTROY_SESSION,
  UPDATE_GROUP_STORE
} from './types';
import { setAuthToken } from '../utils/axios';

export const onClear = () => {
  return { type: DESTROY_SESSION };
};

export const updateUserGlobal = userObj => dispatch => {
  dispatch({
    type: UPDATE_USER_GLOBAL,
    payload: userObj
  });
};

export const getUser = (userId, signal) => async dispatch => {
  try {
    const userResp = await axios.get(`/user/getuserdetails?user=${userId}`, {
      cancelToken: signal
    });
    dispatch({
      type: GET_USER,
      payload: userResp.data
    });
    dispatch({
      type: UPDATE_GROUP_STORE,
      payload: userResp.data.user
    });
    //updateGroupStore(userResp.data.user);
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Load User
export const loadUser = email => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);

    if (!email) {
      email = localStorage.getItem('userEmail');
    }
  }
  if (email) {
    getUser(email);
  }
};

export const searchUser = keyword => async dispatch => {
  try {
    const userResp = await axios.get(`/user/searchuser?user=${keyword}`);
    dispatch({
      type: SEARCH_USER,
      payload: userResp.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR //todo add error later
    });
  }
};

// Create or update user
export const updateUser = (formData, edit = false) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.put(`/user/updateuser`, formData, config);

    dispatch({
      type: UPDATE_USER,
      payload: res.data
    });

    dispatch(
      setAlert(edit ? 'User Account Updated' : 'Profile Created', 'success')
    );
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'error')));
    }

    dispatch({
      type: UPDATE_USER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const getuserbyregistrationid = (token, history) => async dispatch => {
  try {
    const response = await axios.get(`/user/userbyregid/${token}`);
    dispatch({
      type: GET_USER_BY_REGISTRATION_ID,
      payload: response.data
    });
    if (response.data.errorCode !== 1) {
      //no error valid case
      // dispatch(deleteUserRegistrationToken(token));
    } else {
      dispatch(
        setAlert(
          response.data.exception !== null
            ? response.data.exception
            : 'Token Invalid',
          'error'
        )
      );
      history.push('/register');
    }
  } catch (err) {
    dispatch(setAlert('Token Invalid', 'error'));
    /*    dispatch({
      type: GET_USER_BY_REGISTRATION_ID_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    }); */
  }
};

export const deleteUserRegistrationToken = token => async dispatch => {
  try {
    const response = await axios.delete(`/user/userbyregid/${token}`);
    dispatch({
      type: DELETE_USER_REGISTRATION_TOKEN,
      payload: response.data
    });
  } catch (err) {
    console.log(err);
    dispatch({
      // type: AUTH_ERROR //todo add error later
    });
  }
};

// Register User
export const register = (formData, callback) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify(formData);

  try {
    const res = await axios.post(`/user/register`, body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });

    if (res.data.errorCode) {
      dispatch(setAlert('Token Invalid, click signup to register', 'error'));
    } else {
      const authRes = await axios.post(`/user/authenticate`, body, config);
      dispatch({
        type: AUTH_SUCCESS,
        payload: authRes.data
      });
      dispatch(getUser(formData.email));
    }
  } catch (err) {
    const errors =
      err && err.response && err.response.data && err.response.data.errors
        ? 'err.response.data.errors'
        : 'Error occured when sending email';

    if (errors && errors.length > 0) {
      //errors.forEach(error => dispatch(setAlert(error.msg, 'error')));
    }

    dispatch({
      type: REGISTER_FAIL
    });
  }
  callback();
};

// Change User Password
export const changePassword = ({ email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const formData = JSON.stringify({ email, password });

  try {
    const res = await axios.put('/user/updateuser', formData, config);

    dispatch({
      type: CHANGE_PASSWORD_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    /*   const errors = err.response.data.errorCode;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'error')));
    } */

    dispatch({
      type: CHANGE_PASSWORD_ERROR
    });
  }
};

// Login User
export const login = (formData, callback) => async dispatch => {
  if (formData) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const body = JSON.stringify(formData);
      const res = await axios.post('/user/authenticate', body, config);

      dispatch({
        type: AUTH_SUCCESS,
        payload: res.data
      });

      dispatch(getUser(formData.email));
    } catch (err) {
      const errors =
        err && err.response && err.response.data && err.response.data.errors;

      if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'error')));
      }
      dispatch(setAlert('Token Invalid', 'error'));

      dispatch({
        type: LOGIN_FAIL
      });
    }
  }
  callback();
};

// Logout / Clear Profile
export const logout = () => dispatch => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
  onClear();
};

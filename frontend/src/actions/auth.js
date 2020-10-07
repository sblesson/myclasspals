import axios from 'axios';
import { setAlert, catchHandler, onClear } from './alert';
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
  UPDATE_GROUP_STORE,
  SEARCH_USER_ERROR,
} from './types';
import { setAuthToken, CancelToken } from '../utils/axios';

let cancel;

export const updateUserGlobal = (userObj) => (dispatch) => {
  dispatch({
    type: UPDATE_USER_GLOBAL,
    payload: userObj,
  });
};

export const getUser = (userId) => async (dispatch) => {
  if (cancel !== undefined) cancel();

  try {
    const userResp = await axios.get(`/user/getuserdetails?user=${userId}`, {
      cancelToken: new CancelToken((c) => (cancel = c)),
    });
    dispatch({
      type: GET_USER,
      payload: userResp.data,
    });
    dispatch({
      type: UPDATE_GROUP_STORE,
      payload: userResp.data.user,
    });
    //updateGroupStore(userResp.data.user);
  } catch (err) {
    catchHandler(err, 'AUTH_ERROR');
  }
};

// Load User
export const loadUser = (email) => async (dispatch) => {
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

export const searchUser = (searchTerm = '') => async (dispatch) => {
  try {
    const res = await axios.get(`/user/searchuser?user=${searchTerm}`);
    dispatch({
      type: SEARCH_USER,
      payload: res.data,
    });
  } catch (err) {
    catchHandler(err, 'SEARCH_USER_ERROR');
  }
};

// Create or update user
export const updateUser = (formData, edit = false) => async (dispatch) => {
  if (cancel !== undefined) cancel();

  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.put(`/user/updateuser`, formData, config, {
      cancelToken: new CancelToken((c) => (cancel = c)),
    });

    dispatch({
      type: UPDATE_USER,
      payload: res.data,
    });

    if (edit) {
      dispatch(setAlert('User Account Updated', 'success'));
    }
  } catch (err) {
    catchHandler(err, 'UPDATE_USER_ERROR');
  }
};

export const getuserbyregistrationid = (token, history) => async (dispatch) => {
  if (cancel !== undefined) cancel();

  try {
    const response = await axios.get(`/user/userbyregid/${token}`, {
      cancelToken: new CancelToken((c) => (cancel = c)),
    });
    dispatch({
      type: GET_USER_BY_REGISTRATION_ID,
      payload: response.data,
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
    catchHandler(err, 'GET_USER_BY_REGISTRATION_ID_ERROR');
  }
};

export const deleteUserRegistrationToken = (token) => async (dispatch) => {
  if (cancel !== undefined) cancel();

  try {
    const response = await axios.delete(`/user/userbyregid/${token}`, {
      cancelToken: new CancelToken((c) => (cancel = c)),
    });
    dispatch({
      type: DELETE_USER_REGISTRATION_TOKEN,
      payload: response.data,
    });
  } catch (err) {
    catchHandler(err, 'DELETE_USER_REGISTRATION_TOKEN_ERROR', dispatch);
  }
};

// Register User
export const register = (formData, callback) => async (dispatch) => {
  let cancelTokenSrc = axios.CancelToken.source();

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify(formData);

  try {
    const res = await axios.post(`/user/register`, body, config, {
      cancelToken: cancelTokenSrc.token,
    });
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    if (res.data.exception) {
      dispatch(setAlert(res.data.exception, 'error'));
    } else {
      const authRes = await axios.post(`/user/authenticate`, body, config, {
        cancelToken: cancelTokenSrc.token,
      });
      dispatch({
        type: AUTH_SUCCESS,
        payload: authRes.data,
      });
      dispatch(getUser(formData.email));
    }
  } catch (err) {
    catchHandler(err, 'REGISTER_FAIL');
  }
  callback(cancelTokenSrc);
};
// Register User
export const contactUsMessage = (formData, callback) => async (dispatch) => {
  let cancelTokenSrc = axios.CancelToken.source();

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify(formData);

  try {
    const res = await axios.post(`/user/contactusmessage`, body, config, {
      cancelToken: cancelTokenSrc.token,
    });
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    if (res.data.exception) {
      dispatch(setAlert(res.data.exception, 'error'));
    } else {
      const authRes = await axios.post(`/user/authenticate`, body, config, {
        cancelToken: cancelTokenSrc.token,
      });
      dispatch({
        type: AUTH_SUCCESS,
        payload: authRes.data,
      });
      dispatch(getUser(formData.email));
    }
  } catch (err) {
    catchHandler(err, 'REGISTER_FAIL');
  }
  callback(cancelTokenSrc);
};
// Change User Password
export const changePassword = ({ email, password }) => async (dispatch) => {
  if (cancel !== undefined) cancel();

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const formData = JSON.stringify({ email, password });

  try {
    const res = await axios.put('/user/updateuser', formData, config, {
      cancelToken: new CancelToken((c) => (cancel = c)),
    });

    dispatch({
      type: CHANGE_PASSWORD_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    catchHandler(err, 'CHANGE_PASSWORD_ERROR');
  }
};

// Login User
export const login = (formData, callback) => async (dispatch) => {
  if (cancel !== undefined) cancel();

  if (formData) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const body = JSON.stringify(formData);
      const res = await axios.post('/user/authenticate', body, config, {
        cancelToken: new CancelToken((c) => (cancel = c)),
      });

      dispatch({
        type: AUTH_SUCCESS,
        payload: res.data,
      });

      dispatch(getUser(formData.email));
    } catch (err) {
      dispatch(catchHandler(err));
    }
  }
  callback();
};

// Logout / Clear Profile
export const logout = () => (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: DESTROY_SESSION });
  dispatch({ type: LOGOUT });

  onClear();
};

export const clearAutoCompleteUserSearchResult = () => async (dispatch) => {
  dispatch({ type: 'CLEAR_AUTOCOMPLETE_USER_SEARCH' });
};

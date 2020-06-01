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
  UPDATE_USER_ERROR
} from './types';

/* // Get all profiles
export const getUserGroup = userId => async dispatch => {
  try {
    const userId = JSON.parse(localStorage.getItem('user'))._id;
    console.log(userId);
    //todo change profile api to get minimum response
    const userGroupRes = await axios.get(
      'http://localhost:8080/user/getuserdetails?user=' + userId
    );
    console.log();
    dispatch({
      type: GET_USER_GROUP,
      payload: userGroupRes.data.user
    });
  } catch (err) {
    dispatch({
      type: GET_USER_GROUP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}; */

/* export const getUserGroups = () => async dispatch => {

  try {
    const res = await axios.get('/api/auth');
    console.log(res);

    const userGroupRes = await axios.get(
      'http://localhost:8080/user/getprofile?user=' + res.data._id
    );

    console.log(userGroupRes);

    dispatch({
      type: USER_LOADED,
      payload: userGroupRes.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
}
 */
// Load User
export const loadUser = email => async dispatch => {
  try {
    const response = await axios.get(
      'http://localhost:8080/user/getuserdetails?user=' + email
    );

    dispatch({
      type: USER_LOADED,
      payload: response.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

export const getUser = userId => async dispatch => {
  try {
    const userResp = await axios.get(
      'http://localhost:8080/user/getuserdetails?user=' + userId
    );
    dispatch({
      type: GET_USER,
      payload: userResp.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

export const searchUser = keyword => async dispatch => {
  try {
    const userResp = await axios.get(
      'http://localhost:8080/user/searchuser?user=' + keyword
    );
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
    console.log(formData);
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.put(
      'http://localhost:8080/user/updateuser',
      formData,
      config
    );

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
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: UPDATE_USER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Load User
const sendEmailConfirmation = (body, config) => async dispatch => {
  //SET admin password
  /*   try {
    const res = await axios.get(
      'http://localhost:5000/api/sendMail',
      body,
      config
    );

    dispatch({
      type: SEND_USER_EMAIL,
      payload: res
    });
  } catch (err) {
    dispatch({
      type: EMAIL_SEND_ERROR
    });
  } */
};

export const getuserbyregistrationid = (token, history) => async dispatch => {
  try {
    const response = await axios.get(
      'http://localhost:8080/user/userbyregid/' + token
    );
    dispatch({
      type: GET_USER_BY_REGISTRATION_ID,
      payload: response.data
    });
    if (response.data.errorCode !== 1) {
      //no error valid case
      dispatch(deleteUserRegistrationToken(token));
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
    const response = await axios.delete(
      'http://localhost:8080/user/userbyregid/' + token
    );
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
export const register = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post(
      'http://localhost:8080/user/register',
      body,
      config
    );
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    console.log(res);

    const authRes = await axios.post(
      'http://localhost:8080/user/authenticate',
      body,
      config
    );
    console.log(authRes);
    dispatch({
      type: AUTH_SUCCESS,
      payload: authRes.data
    });

    const emailRes = await axios.post(
      'http://localhost:5000/api/sendMail',
      body,
      config
    );
  } catch (err) {
    const errors =
      err && err.response && err.response.data && err.response.data.errors
        ? 'err.response.data.errors'
        : 'Error occured when sending email';

    if (errors && errors.length > 0) {
      console.log(errors);
      //errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: REGISTER_FAIL
    });
  }
};

// Register User
export const registerPendingInvitedUser = ({
  name,
  email,
  password
}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.put('/api/users', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });

    const emailRes = await axios.post('/api/sendMail', body, config);
    dispatch(loadUser(email));
  } catch (err) {
    /*   const errors = err.response.data.errorCode;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    } */

    dispatch({
      type: REGISTER_FAIL
    });
  }
};

// Change User Password
export const changePassword = ({ password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ password });

  try {
    const res = await axios.put('/api/users', body, config);

    dispatch({
      type: CHANGE_PASSWORD_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    /*   const errors = err.response.data.errorCode;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    } */

    dispatch({
      type: CHANGE_PASSWORD_ERROR
    });
  }
};

// Login User
export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post(
      'http://localhost:8080/user/authenticate',
      body,
      config
    );

    dispatch({
      type: AUTH_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser(email));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch(setAlert('Token Invalid', 'error'));

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// Logout / Clear Profile
export const logout = () => dispatch => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};

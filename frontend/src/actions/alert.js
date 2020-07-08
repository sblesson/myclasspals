import uuid from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

export const setAlert = (msg, alertType, timeout = 5000) => dispatch => {
  const id = uuid.v4();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id }
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};

export const catchHandler = (err, errorType) => dispatch => {
  const error = err && err.response && err.response.data && err.response.data;

  if (error && error.length > 0) {
    error.forEach(error => dispatch(setAlert(error.message, 'error')));
  } else {
    dispatch(setAlert(error.message, 'error', error.status));
  }

  dispatch({
    type: errorType
  });
  return;
};

export const onClear = () => {
  return { type: 'DESTROY_SESSION' };
};

import uuid from 'uuid';
import { SET_ALERT, REMOVE_ALERT, REMOVE_ALL_ALERT } from './types';

export const setAlert = (msg, alertType, timeout = 5000) => dispatch => {
  const id = uuid.v4();
  dispatch({
    type: REMOVE_ALL_ALERT
  });
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id }
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};

export const catchHandler = (err, errorMessage) => dispatch => {
  let message = errorMessage
    ? errorMessage
    : 'Error occured, please try again later';
  if (
    err &&
    err.response &&
    err.response.data &&
    err.response.data.message !== null
  ) {
    message = err.response.data.message;
  }

  dispatch(setAlert(message, 'error'));
};

export const removeAllAlerts = () => dispatch => {
  dispatch({ type: REMOVE_ALL_ALERT });
};

export const onClear = () => {
  return { type: 'DESTROY_SESSION' };
};

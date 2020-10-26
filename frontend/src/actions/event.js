import axios from 'axios';
import { setAlert, catchHandler } from './alert';

// Add Event
export const addEvent = (formData, callback) => async (dispatch) => {
  let cancelTokenSrc = axios.CancelToken.source();

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post('/event', formData, config, {
      cancelToken: cancelTokenSrc.token,
    });

    dispatch({
      type: 'ADD_EVENT',
      payload: res.data,
    });

    dispatch(setAlert('Event Created', 'success'));
    callback(res.data);
  } catch (err) {
    dispatch(
      setAlert(
        err &&
          err.response &&
          err.response.data &&
          err.response.data.message !== null
          ? err.response.data.message
          : 'Unable to create group, please try again later',
        'error'
      )
    );
  }
  callback(cancelTokenSrc);
};

// Get all userGroups
export const getEvents = (callback) => async (dispatch) => {
  let cancelTokenSrc = axios.CancelToken.source();

  try {
    const response = await axios.get(`/user/events`, {
      cancelToken: cancelTokenSrc.token,
    });

    dispatch({
      type: 'GET_EVENTS',
      payload: response.data,
    });
  } catch (err) {
    catchHandler(err, 'GET_EVENTS_ERROR');
  }
  callback(cancelTokenSrc);
};

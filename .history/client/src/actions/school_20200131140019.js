import axios from 'axios';
import { setAlert } from './alert';

import { GET_SCHOOL_DATA, GET_SCHOOL_DATA_ERROR } from './types';

// Get Github repos
export const getSchoolData = (value = '') => async dispatch => {
  try {
    console.log('school data');
    const res = await axios.get(`/api/leftnav?screen=${value}`);

    dispatch({
      type: GET_SCHOOL_DATA,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_SCHOOL_DATA_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

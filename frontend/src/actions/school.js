import axios from 'axios';
import { setAlert } from './alert';

import { FETCH_SCHOOL, FETCH_SCHOOL_ERROR } from './types';

export const fetchSchool = (searchTerm = '') => async dispatch => {
  try {
    const res = await axios.get(`/school/schoollist?searchkey=${searchTerm}`);
    dispatch({
      type: FETCH_SCHOOL,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: FETCH_SCHOOL_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

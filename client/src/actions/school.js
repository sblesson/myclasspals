import axios from 'axios';
import { setAlert } from './alert';

import { GET_SCHOOL_DATA, GET_SCHOOL_DATA_ERROR } from './types';

// Get Github repos
export const getSchoolData = (searchTerm = '') => async dispatch => {
  try {
    console.log('school data');
    const res = await axios.get(
      `https://api.schooldigger.com/v1.2/autocomplete/schools?q=${searchTerm}&appID=02e5e1fb&appKey=516f6dd0da01a186ffedea905bec1041`
    );
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

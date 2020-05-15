import axios from 'axios';
import { setAlert } from './alert';

import { FETCH_SCHOOL, FETCH_SCHOOL_ERROR } from './types';

// Get Github repos
export const fetchSchool = (searchTerm = '') => async dispatch => {
  try {
    /*     const res = await axios.get(
      `https://api.schooldigger.com/v1.2/autocomplete/schools?q=${searchTerm}&appID=02e5e1fb&appKey=516f6dd0da01a186ffedea905bec1041`
    ); */
    const res = await axios.get(
      `http://localhost:8080/school/schoollist?searchkey=${searchTerm}`
    );
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

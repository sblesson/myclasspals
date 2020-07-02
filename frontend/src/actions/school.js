import axios from 'axios';
import { catchHandler } from './alert';

import {
  FETCH_SCHOOL,
  FETCH_SCHOOL_ERROR,
  CLEAR_AUTOCOMPLETE_SCHOOL_SEARCH
} from './types';

export const fetchSchool = (searchTerm = '') => async dispatch => {
  try {
    const res = await axios.get(`/school/schoollist?searchkey=${searchTerm}`);
    dispatch({
      type: FETCH_SCHOOL,
      payload: res.data
    });
  } catch (err) {
    catchHandler(err, FETCH_SCHOOL_ERROR);
  }
};
export const clearAutoCompleteSchoolSearchResult = () => async dispatch => {
  dispatch({ type: CLEAR_AUTOCOMPLETE_SCHOOL_SEARCH });
};

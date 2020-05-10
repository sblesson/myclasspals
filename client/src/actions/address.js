import axios from 'axios';
import { setAlert } from './alert';

import { GET_CITY_DATA, GET_CITY_DATA_ERROR } from './types';

// Get Github repos
export const getCityData = (searchTerm = '') => async dispatch => {
  try {
    const res = await axios.get(
      `http://localhost:8080/postaladdress/searchbycity?searchkey=${searchTerm}`
    );
    dispatch({
      type: GET_CITY_DATA,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_CITY_DATA_ERROR
      //payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

import axios from 'axios';
import { catchHandler } from './alert';

import { GET_CITY_DATA, GET_CITY_DATA_ERROR } from './types';

// Get Github repos
export const getCityData = (searchTerm = '') => async dispatch => {
  try {
    const res = await axios.get(
      `/postaladdress/searchbycity?searchkey=${searchTerm}`
    );
    dispatch({
      type: GET_CITY_DATA,
      payload: res.data
    });
  } catch (err) {
    catchHandler(err, 'GET_CITY_DATA_ERROR');
  }
};

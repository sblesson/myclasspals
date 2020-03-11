import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_LEFT_NAV,
  LEFT_NAV_ERROR,
  GET_CATEGORIES,
  GET_CATEGORIES_ERROR
} from './types';

// Get Github repos
export const getLeftNav = (screen = 'dashboard') => async dispatch => {
  try {
    const res = await axios.get(`/api/leftnav?screen=${screen}`);

    dispatch({
      type: GET_LEFT_NAV,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: LEFT_NAV_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get Github repos
export const getCategories = (screen = 'dashboard') => async dispatch => {
  try {
    const res = await axios.get(`/api/categories`);

    dispatch({
      type: GET_CATEGORIES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_CATEGORIES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

import axios from 'axios';
import { setAlert } from './alert';

import { GET_LEFT_NAV, LEFT_NAV_ERROR } from './types';

// Get Github repos
export const getLeftNav = (screen = 'dashboard', id) => async dispatch => {
  try {
    dispatch({
      type: GET_LEFT_NAV,
      payload: { screen: screen, id: id }
    });
  } catch (err) {
    dispatch({
      type: LEFT_NAV_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

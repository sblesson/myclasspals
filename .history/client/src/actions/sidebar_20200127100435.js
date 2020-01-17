import axios from 'axios';
import { setAlert } from './alert';

import { GET_LEFT_NAV, LEFT_NAV_ERROR } from './types';

// Get Github repos
export const getLeftNav = screen => async dispatch => {
  try {
    const res = await axios.get(`/api/leftnavmenu/${screen}`);

    dispatch({
      type: GET_LEFT_NAV_MENU,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: LEFT_NAV_MENU_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

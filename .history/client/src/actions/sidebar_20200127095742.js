import axios from 'axios';
import { setAlert } from './alert';

import { GET_SIDE_BAR_MENU, SIDE_BAR_ERROR } from './types';

// Get Github repos
export const getSideBarMenu = screen => async dispatch => {
  try {
    const res = await axios.get(`/api/sidebar/${screen}`);

    dispatch({
      type: GET_SIDE_BAR_MENU,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: SIDE_BAR_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

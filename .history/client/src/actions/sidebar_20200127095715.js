import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_SIDE_BAR_MENU,
  GET_PROFILES,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
  GET_REPOS,
  GET_SCHOOL_DETAILS
} from './types';

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

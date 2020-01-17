
import { SHOW_MODAL, HIDE_MODAL } from './types';

export const showModal = 
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

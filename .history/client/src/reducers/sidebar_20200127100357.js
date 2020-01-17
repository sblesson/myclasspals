import { GET_SIDE_BAR_MENU, LEFT_NAV_MENU_ERROR } from '../actions/types';
import { GET_LEFT_NAV_MENU, LEFT_NAV_MENU_ERROR } from './types';

const initialState = {
  sidebarmenu: [],
  post: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_SIDE_BAR_MENU:
      return {
        ...state,
        posts: payload,
        loading: false
      };
    default:
      return state;
  }
}

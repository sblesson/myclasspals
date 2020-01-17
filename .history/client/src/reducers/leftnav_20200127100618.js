import { GET_LEFT_NAV, LEFT_NAV_ERROR } from './types';

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

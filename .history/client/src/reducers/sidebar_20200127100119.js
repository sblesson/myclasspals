import { GET_SIDE_BAR_MENU, SIDE_BAR_ERROR } from '../actions/types';

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

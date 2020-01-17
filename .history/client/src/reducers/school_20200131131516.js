import { GET_SCHOOL_DATA, LEFT_NAV_ERROR } from '../actions/types';

const initialState = {
  leftnav: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_LEFT_NAV:
      return {
        ...state,
        leftnav: payload,
        loading: false
      };

    case LEFT_NAV_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}

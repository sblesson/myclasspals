import { GET_SCHOOL_DATA, GET_SCHOOL_DATA_ERROR } from '../actions/types';

const initialState = {
  results: [],
  isloading: false,
  error: {}

  results: [],
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

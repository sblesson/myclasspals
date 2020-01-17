import { GET_SCHOOL_DATA, GET_SCHOOL_DATA_ERROR } from '../actions/types';

const initialState = {
  results: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_SCHOOL_DATA:
      return {
        ...state,
        results: payload,
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

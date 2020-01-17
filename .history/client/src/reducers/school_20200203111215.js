import { GET_SCHOOL_DATA, GET_SCHOOL_DATA_ERROR } from '../actions/types';

const initialState = {
  results: [],
  isLoading: true,
  value: '',
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_SCHOOL_DATA:
      return {
        ...state,
        results: payload.schoolMatches,
        isLoading: false,
        value: ''
      };

    case GET_SCHOOL_DATA_ERROR:
      return {
        ...state,
        error: payload,
        results: payload.schoolMatches,
value: ''
        isLoading: false
      };
    default:
      return state;
  }
}

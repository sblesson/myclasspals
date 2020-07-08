import {
  FETCH_SCHOOL,
  FETCH_SCHOOL_ERROR,
  CLEAR_AUTOCOMPLETE_SCHOOL_SEARCH
} from '../actions/types';

const initialState = {
  results: [],
  isLoading: false,
  value: '',
  error: {},
  selectedSchools: []
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case FETCH_SCHOOL:
      return {
        ...state,
        results: payload.schoolMatches,
        isLoading: false,
        value: ''
      };

    case FETCH_SCHOOL_ERROR:
      return {
        ...state,
        error: payload,
        isLoading: false
      };
    case CLEAR_AUTOCOMPLETE_SCHOOL_SEARCH:
      return {
        ...state,
        loading: false,
        results: []
      };
    default:
      return state;
  }
}

import { GET_CITY_DATA, GET_CITY_DATA_ERROR } from '../actions/types';

const initialState = {
  results: [],
  isLoading: true,
  error: {},
  selectedAddress: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CITY_DATA:
      return {
        ...state,
        results: payload.postalAddresses,
        isLoading: false
      };

    case GET_CITY_DATA_ERROR:
      return {
        ...state,
        error: payload,
        isLoading: false
      };
    default:
      return state;
  }
}

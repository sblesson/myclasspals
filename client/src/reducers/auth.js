import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  ACCOUNT_DELETED,
  SEND_USER_EMAIL,
  GET_USER_GROUP,
  GET_USER_GROUP_ERROR,
  GET_USER,
  SEARCH_USER,
  GET_USER_BY_REGISTRATION_ID
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: true,
  user: localStorage.getItem('user'),
  profileUser: null,
  searchUserResult: [],
  senderEmail: null,
  invalidRegistrationToken: false
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_USER:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload.user
      };
    case SEARCH_USER:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        searchUserResult: payload.users
      };

    case GET_USER_BY_REGISTRATION_ID:
      console.log(payload);
      if (payload.exception) {
        return {
          ...state,
          isAuthenticated: false,
          loading: false,
          user: null,
          invalidRegistrationToken: true
        };
      } else {
        return {
          ...state,
          isAuthenticated: false,
          loading: false,
          user: payload.user,
          invalidRegistrationToken: false
        };
      }

    case GET_USER_GROUP:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      };

    case USER_LOADED:
      localStorage.setItem('user', JSON.stringify(payload.user));
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload.user
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      localStorage.setItem('isAuthenticated', payload.isAuthenticated);

      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
    case ACCOUNT_DELETED:
      localStorage.removeItem('token');
      localStorage.setItem('isAuthenticated', false);
      localStorage.setItem('user', null);

      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false
      };
    case SEND_USER_EMAIL:
      return { ...state, ...payload, loading: false };

    default:
      return state;
  }
}

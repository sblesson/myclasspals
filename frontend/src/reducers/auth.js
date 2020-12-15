import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  AUTH_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  ACCOUNT_DELETED,
  SEND_USER_EMAIL,
  GET_USER_GROUP,
  GET_USER_GROUP_ERROR,
  GET_USER,
  UPDATE_USER,
  SEARCH_USER,
  GET_USER_BY_REGISTRATION_ID,
  CHANGE_PASSWORD_SUCCESS,
  UPDATE_USER_GLOBAL,
} from '../actions/types';

import { setAuthToken } from '../utils/setAuthToken';

const initialState = {
  token: '',
  isAuthenticated: false,
  loading: true,
  user: {},
  profileUser: null,
  searchUserResult: [],
  senderEmail: null,
  invalidRegistrationToken: false,
};

const updateUserLocalObject = (user) => {
  if (user) {
    localStorage.setItem('userEmail', user.email);
    localStorage.setItem('userId', user._id);
  }
};
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_USER:
    case USER_LOADED:
      updateUserLocalObject(payload.user);
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload.user,
      };
    case SEARCH_USER:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        searchUserResult: payload.users,
      };
    case UPDATE_USER:
      return {
        ...state,
        user: payload.user,
        loading: false,
      };

    case GET_USER_BY_REGISTRATION_ID:
      if (payload.exception) {
        return {
          ...state,
          isAuthenticated: false,
          loading: false,
          user: null,
          invalidRegistrationToken: true,
        };
      } else {
        return {
          ...state,
          isAuthenticated: false,
          loading: false,
          user: payload.user,
          invalidRegistrationToken: false,
        };
      }

    case GET_USER_GROUP:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };

    case REGISTER_SUCCESS:
      if (payload.user) {
        updateUserLocalObject(payload.user);
      }

      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: payload.user,
      };
    case UPDATE_USER_GLOBAL:
      if (payload.user) {
        updateUserLocalObject(payload.user);
      }

      return {
        ...state,
        user: payload.user,
      };
    case AUTH_SUCCESS:
      if (payload.token) {
        localStorage.setItem('token', payload.token);
        localStorage.setItem('isAuthenticated', true);
        setAuthToken(payload.token);
      }

      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };

    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
    case ACCOUNT_DELETED:
      window.localStorage.clear();
      updateUserLocalObject(null);
      return {
        ...state,
        token: '',
        isAuthenticated: false,
        loading: true,
        user: {},
        profileUser: null,
        searchUserResult: [],
        senderEmail: null,
        invalidRegistrationToken: false,
      };
    case SEND_USER_EMAIL:
      return { ...state, ...payload, loading: false };

    case 'CLEAR_AUTOCOMPLETE_USER_SEARCH':
      return {
        ...state,
        loading: false,
        searchUserResult: [],
      };

    default:
      return state;
  }
}

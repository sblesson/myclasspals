import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  GET_PROFILES,
  ADD_SCHOOL,
  DELETE_SCHOOL,
  CREATE_PROFILE
} from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
      console.log(payload.user);
      return {
        ...state,
        profile: payload.user,
        loading: false
      };
    case CREATE_PROFILE:
    case UPDATE_PROFILE:
      console.log(payload);
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false
      };
    case ADD_SCHOOL:
      return {
        ...state,
        school: payload,
        loading: false
      };
    case DELETE_SCHOOL:
      return {
        ...state,
        school: state.school.filter(sch => sch._id !== payload),
        loading: false
      };
    default:
      return state;
  }
}

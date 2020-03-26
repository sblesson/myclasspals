import { ADD_GROUP, GET_GROUPS } from '../actions/types';

const initialState = {
  groups: [],
  group: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_GROUP:
      return {
        ...state,
        //group: [payload, ...state.groupName],
        loading: false
      };

    default:
      return state;
  }
}

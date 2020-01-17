import { SHOW_MODAL, HIDE_MODAL } from '../actions/types';

const initialState = {
  modalType: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SHOW_MODAL:
      return {
        ...state,
        modalType: payload
      };

    case HIDE_MODAL:
      return {
        ...state,
        initialState
      };
    default:
      return state;
  }
}

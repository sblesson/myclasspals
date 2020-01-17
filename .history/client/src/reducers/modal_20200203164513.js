import { SHOW_MODAL, HIDE_MODAL, TOGGLE_MODAL } from '../actions/types';

const initialState = {
  modalType: null,
  isOpen: false
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SHOW_MODAL:
      return {
        ...state,
        modalType: payload,
        isOpen: true
      };

    case HIDE_MODAL:
      return {
        ...state,
        initialState
      };
    case TOGGLE_MODAL:
      return {
        ...state,
        isOpen: payload,
      };
    default:
      return state;
  }
}

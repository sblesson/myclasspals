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
        isOpen: payload
      };
    default:
      return state;
  }
}
import { SHOW_MODAL, HIDE_MODAL } from '../constants/ActionTypes';

const initialState = {
  type: null,
  props: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        ...state,
        type: action.payload.type,
        props: action.payload.props
      };
    case HIDE_MODAL:
      return initialState;
    default:
      return state;
  }
}

export default modalReducer;
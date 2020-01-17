import { SHOW_MODAL, HIDE_MODAL } from '../actions/types';

const defaultState = null;

export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case SHOW_MODAL': {
      return { modalProps: action.payload };
    }

    case 'HIDE_MODAL': {
      return null;
    }

    default:
      return state;
  }
};

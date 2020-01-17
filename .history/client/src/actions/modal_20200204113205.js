import { SHOW_MODAL, HIDE_MODAL, TOGGLE_MODAL } from './types';

export const showModal = modalType => dispatch => {
  dispatch(  payload: {
    type,
    props
  });
};
export const hideModal = modalType => {
  return {
    type: HIDE_MODAL,
    modalType
  };
};
export const toggleModal = isOpen => dispatch => {
  dispatch({
    type: TOGGLE_MODAL,
    isOpen
  });
};

import { SHOW_MODAL, HIDE_MODAL, TOGGLE_MODAL } from './types';

export const showModal = (type, props) => ({
  type: SHOW_MODAL,
  payload: {
    type,
    props
  }
});

export const hideModal = () => ({
  type: HIDE_MODAL
});

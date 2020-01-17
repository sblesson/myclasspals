import { SHOW_MODAL, HIDE_MODAL } from './types';

export const showModal = modalType => dispatch => {
  dispatch({
    type: SHOW_MODAL,
    modalType
  });
};
export const hideModal = modalType => {
  return {
    type: HIDE_MODAL,
    modalType
  };
};
export const toggleModal = modalType => dispatch => {
  dispatch({
    type: SHOW_MODAL,
    modalType
  });
};

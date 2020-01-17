import { SHOW_MODAL, HIDE_MODAL } from './types';

export const openModal = modalProps => {
  return {
    type: SHOW_MODAL,
    payload: modalProps
  };
};

export const closeModal = () => {
  return {
    type: HIDE_MODAL
  };
};

import { SHOW_MODAL, MODAL_CLOSE } from './actionTypes';

export const openModal = modalProps => {
  return {
    type: MODAL_OPEN,
    payload: modalProps
  };
};

export const closeModal = () => {
  return {
    type: MODAL_CLOSE
  };
};

import { SHOW_MODAL, HIDE_MODAL } from './actionTypes';

export const openModal = modalProps => {
  return {
    type: import { SHOW_MODAL, HIDE_MODAL } from './actionTypes';
    ,
    payload: modalProps
  };
};

export const closeModal = () => {
  return {
    type: HIDE_MODAL
  };
};

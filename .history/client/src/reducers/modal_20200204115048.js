const defaultState = null;

export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case 'MODAL_OPEN': {
      return { modalProps: action.payload };
    }

    case 'SHOW_MODAL': {
      return null;
    }

    default:
      return state;
  }
};

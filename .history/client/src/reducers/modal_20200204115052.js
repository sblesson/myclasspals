const defaultState = null;

export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case 'SHOW_MODAL': {
      return { modalProps: action.payload };
    }

    case 'MODAL_CLOSE': {
      return null;
    }

    default:
      return state;
  }
};

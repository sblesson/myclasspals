const initialState = {
  events: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case 'ADD_EVENT':
      return {
        ...state,
        event: [payload.event, ...state.event],
        loading: false,
      };
    case 'GET_EVENTS':
      return {
        ...state,
        event: [payload.event],
        loading: false,
      };

    default:
      return state;
  }
}

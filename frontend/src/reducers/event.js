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
        events: [payload.event, ...state.events],
        loading: false,
      };
    case 'GET_EVENTS':
      console.log(payload);
      return {
        ...state,
        events: payload.events,
        loading: false,
      };
    case 'DELETE_EVENT':
      return {
        ...state,
        events: state.events.filter((event) => event._id !== payload),
        loading: false,
      };

    default:
      return state;
  }
}

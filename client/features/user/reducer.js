const initialState = {
  current: {
    firstName: null,
    lastName: null,
    id: null,
  },
  list: [],
  fetched: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_USER':
      const listItems = state.list.map(report => {
        if (report._id === action.payload._id) {
          return action.payload;
        } else {
          return report;
        }
      });
      return {
        ...state,
        list: listItems,
      };
    case 'LOAD_USERS':
      return {
        ...state,
        list: action.payload,
        fetched: true,
      };
    case 'ADD_NEW_USER':
      return {
        ...state,
        list: state.list.concat(action.payload),
      };
    case 'LOGIN_ACTION':
      return {
        ...state,
        current: {
          ...state.currentUser,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          id: action.payload.userId,
        }
      };
    case 'LOGOUT_ACTION':
      return {
        ...state,
        current: {
          ...state.currentUser,
          firstName: null,
          lastName: null,
          id: null,
        }
      };
    default:
      return state;
  }
}

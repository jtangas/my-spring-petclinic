import lodash from 'lodash';

const initialState = {
  current: {
    firstName: null,
    lastName: null,
    id: null,
  },
  list: [],
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
      const loadedUsers = lodash.union(state.list, action.payload);
      return {
        ...state,
        list: loadedUsers,
      };
    case 'ADD_NEW_USER':
      const addedUser = lodash.union(state.list, action.payload);
      return {
        ...state,
        list: addedUser,
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
      return initialState;
    default:
      return state;
  }
}

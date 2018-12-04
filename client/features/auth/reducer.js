const initialState = {
  loggedIn: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_ACTION':
      return {
        ...state,
        loggedIn: true,
      };
    case 'LOGOUT_ACTION':
      return {
        ...state,
        loggedIn: false,
      };
    default:
      return state;
  }
}

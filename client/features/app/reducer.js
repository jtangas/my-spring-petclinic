const initialState = {
  loaded: false,
  showFlash: false,
  flashMessages: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'APP_LOADED':
      console.log('APP LOADED');
      return {
        ...state,
        loaded: true,
      };
    case 'REMOVE_NOTIFICATION':
      const messages = state.flashMessages.filter(message => message !== null && message.id !== action.payload.id);
      return {
        ...state,
        showFlash: messages.length > 0,
        flashMessages: messages,
      };
    case 'API_REQUESTED':
      return {
        ...state,
        showFlash: true,
        flashMessages: state.flashMessages.concat(action.payload),
      };
    default:
      return state;
  }
}

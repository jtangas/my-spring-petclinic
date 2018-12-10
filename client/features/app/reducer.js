const initialState = {
  loaded: false,
  showFlash: false,
  flashMessages: [],
};

export default (state = initialState, action) => {
  let messages;
  switch (action.type) {
    case 'APP_LOADED':
      return {
        ...state,
        loaded: true,
      };
    case 'REMOVE_NOTIFICATION':
      messages = state.flashMessages.filter(message => message !== null && message.id !== action.payload.id);
      return {
        ...state,
        showFlash: messages.length > 0,
        flashMessages: messages,
      };
    case 'PUSH_NOTIFICATION':
      messages = (state.flashMessages === undefined) ? [] : state.flashMessages;
      messages.push(action.payload);
      return {
        ...state,
        showFlash: true,
        flashMessages: messages,
      };
    default:
      return state;
  }
}

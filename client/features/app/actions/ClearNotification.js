export default message => dispatch => {
  console.log('removing message');
  dispatch({
    type: 'REMOVE_NOTIFICATION',
    payload: message,
  });
};

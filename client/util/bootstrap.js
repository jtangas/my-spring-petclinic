export default () => dispatch => {
  console.log('executing');
  fetch('/api/bootstrap')
    .then(res => res.json())
    .then(data => {
      dispatch({
        type: 'APP_LOADED',
        payload: data.data,
      });
    });
};

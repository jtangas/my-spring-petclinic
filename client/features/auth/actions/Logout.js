export default () => dispatch => {
  return new Promise((resolve, reject) => {
    try {
      dispatch({
        type: 'LOGOUT_ACTION',
      });
      resolve('ok');
    } catch (err) {
      reject(err);
    }
  });
};

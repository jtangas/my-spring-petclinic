export default values => dispatch => (new Promise((resolve, reject) => {
    fetch(`/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(values),
    })
      .then(res => res.json())
      .then(data => {
        dispatch({
          type: 'API_REQUESTED',
          payload: {
            id: data.requestId,
            message: data.message,
            success: data.success,
          },
        });

        if (data.success) {
          dispatch({
            type: 'LOGIN_ACTION',
            payload: data.user,
          });
          resolve('ok');
        } else {
          reject('invalid form');
        }
      })
      .catch(err => reject(err))
  })
);

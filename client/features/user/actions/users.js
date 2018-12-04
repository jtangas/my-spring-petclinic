const loadUsersAction = () => dispatch => new Promise((resolve, reject) => {
  try {
    fetch('/api/user')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          dispatch({
            type: 'LOAD_USERS',
            payload: data.data,
          });
        } else {
          dispatch({
            type: 'LOAD_USERS',
            payload: []
          });
          dispatch({
            type: 'API_REQUESTED',
            payload: {
              id: data.requestId,
              message: data.message,
              success: data.success,
            }
          })
        }
      });
    resolve('ok');
  } catch (err) {
    reject(err);
  }
});

const updateUserAction = (reportId, values) => dispatch => {
  fetch(`/api/user/${reportId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(values)
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        dispatch({
          type: 'UPDATE_USER',
          payload: data.data,
        });
        dispatch({
          type: 'API_REQUESTED',
          payload: {
            id: data.requestId,
            message: data.message,
            success: data.success,
          },
        })
      } else {
        dispatch({
          type: 'FAILED_UPDATE_USER',
          payload: data.data,
        });
        dispatch({
          type: 'API_REQUESTED',
          payload: {
            id: data.requestId,
            message: data.message,
            success: data.success,
          },
        })
      }
    })
};

const createUserAction = values => dispatch => new Promise((resolve, reject) => {
  try {
    fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(values),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          dispatch({
            type: 'ADD_NEW_USER',
            payload: data.data,
          });
        } else {
          console.log(data.message);
        }
      });
  } catch (err) {
    reject(err);
  }
});

export {
  loadUsersAction,
  createUserAction,
  updateUserAction,
};

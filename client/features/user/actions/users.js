const loadUsersAction = (type, users = [], perPage = 10, page = 1) => dispatch => new Promise((resolve, reject) => {
  let start = (page - 1) * perPage;
  let end = page * perPage;
  if (start >= users.length || end > users.length) {
    fetch(`/api/${type}?page=${page}&perPage=${perPage}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          dispatch({
            type: `LOAD_USERS`,
            payload: data.data,
          });
        } else {
          dispatch({
            type: `LOAD_USERS`,
            payload: []
          });
          dispatch({
            type: 'API_REQUESTED',
            payload: {
              id: data.requestId,
              message: data.message,
              success: data.success,
            }
          });
          resolve([]);
        }
      });
  } else {
    resolve(users.slice(start, end));
    return users.slice(start, end);
  }
});

const updateUserAction = (userId, values) => dispatch => {
  const { type } = values;

  console.log('test');

  fetch(`/api/${type}/${userId}`, {
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
    const { type } = values;
    fetch(`/api/${type}`, {
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

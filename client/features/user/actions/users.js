const loadUsersAction = (type, users = [], perPage = 10, page = 1) => dispatch => new Promise((resolve, reject) => {
  let start = (page - 1) * perPage;
  let end = page * perPage;
  if (start >= users.length || end > users.length) {
    const url = `/api/${type}?page=${page}&perPage=${perPage}`;
    dispatch({
      type: 'API_REQUEST',
      endpoint: url,
      method: 'GET',
      actions: {
        success: 'LOAD_USERS',
      }
    });
    resolve([]);
  } else {
    resolve(users.slice(start, end));
    return users.slice(start, end);
  }
});

const updateUserAction = (userId, values) => dispatch => {
  const { type } = values;
  const url = `/api/${type}/${userId}`;
  console.log(url);
  dispatch({
    type: 'API_REQUEST',
    endpoint: url,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(values),
    actions: {
      success: 'UPDATE_USER',
      failure: 'FAILED_UPDATE_USER',
    }
  });
};

const createUserAction = values => dispatch => new Promise((resolve, reject) => {
  try {
    const { type } = values;
    const url = `/api/${type}`;
    dispatch({
      type: 'API_REQUEST',
      endpoint: url,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(values),
      actions: {
        success: 'ADD_NEW_USER',
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

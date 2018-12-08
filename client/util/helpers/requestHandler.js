const apiMiddleware = store => next => action => {
  if (action.type === 'API_REQUEST') {
    console.log(action);
    const { endpoint, headers, method, body, actions } = action;
    const packageRequest = {
      headers,
      method,
    };

    if (body) {
      packageRequest.body = body;
    }

    fetch(endpoint, packageRequest)
      .then(res => res.json())
      .then(data => {
        next({
          type: 'API_REQUESTED',
          payload: {
            id: data.requestId,
            message: data.message,
            success: data.success,
          },
          data,
          actions,
        });
      });
      //ill put a catch here later
  } else {
    next(action);
  }
};

const apiRequestHandler = store => next => action => {
  if (action.type === 'API_REQUESTED') {
    const { data, actions } = action;
    const { success, failure } = actions;

    if (data.success && success) {
      next({
        type: success,
        payload: data.data,
      });
    }

    if (!data.success && failure) {
      next({
        type: failure,
        payload: data.data,
      });
    }
  }

  next(action);
};

export {
  apiRequestHandler,
  apiMiddleware,
};
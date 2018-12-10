const apiMiddleware = store => next => action => {
  if (action.type === 'API_REQUEST') {
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
        const nextAction = {
          type: 'API_REQUESTED',
          payload: {
            id: data.requestId,
            message: data.message,
            success: data.success,
          },
          ...data,
          actions,
        };

        next(nextAction);
      })
      .catch(err => next({
        type: 'API_REQUESTED',
        payload: {
          id: 'API_ERROR',
          message: err.toString(),
          success: false,
        },
        actions: {
          failure: 'PUSH_NOTIFICATION',
        }
      }));
      //ill put a catch here later
  } else {
    next(action);
  }
};

const apiRequestHandler = store => next => action => {
  if (action.type === 'API_REQUESTED') {
    const { payload, actions } = action;
    const { success, failure } = actions;

    let nextAction;
    if (payload.success && success) {
      nextAction = success;
    }

    if (!payload.success && failure) {
      nextAction = failure;
    }

    if (nextAction === undefined) {
      nextAction = 'PUSH_NOTIFICATION';
    }

      const nextActionObj = {
        type: nextAction,
        payload: payload,
      };

      next(nextActionObj);
  } else {
    next(action);
  }
};

export {
  apiRequestHandler,
  apiMiddleware,
};

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import { throttle } from 'lodash';

import reducer from 'core/reducers';
import { saveToStorage, loadFromStorage } from 'core/localStorage';
import { apiMiddleware, apiRequestHandler } from 'util/helpers/requestHandler';

const enhancer = compose(applyMiddleware(thunk, promise, apiMiddleware, apiRequestHandler));

let preLoadedState = loadFromStorage('state');

const store = createStore(reducer, preLoadedState, enhancer);

store.subscribe(
  throttle(() => {
    saveToStorage('state', store.getState());
  }, 2000)
);

export default store;

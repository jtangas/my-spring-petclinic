import { combineReducers } from 'redux';

import app from 'features/app/reducer';
import auth from 'features/auth/reducer';
import user from 'features/user/reducer';
//import views from 'features/views/reducer';
//import matches from 'features/matches/reducer';

export default combineReducers({
  app,
  auth,
  user,
  //views,
});

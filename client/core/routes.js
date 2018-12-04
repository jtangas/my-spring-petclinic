import app from 'features/app/routes';
import auth from 'features/auth/routes';
import user from 'features/user/routes';
import pet from 'features/pet/routes';

//import dashboard from 'features/dashboard/routes';
//import views from 'features/views/routes';
//import matches from 'features/matches/routes';

const fullRoutes = [
  ...auth,
  ...app,
  ...user,
  ...pet,
  //...views,
  //...dashboard,
  //...matches,
];

export {
  fullRoutes,
};

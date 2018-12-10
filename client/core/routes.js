import app from 'features/app/routes';
import auth from 'features/auth/routes';
import user from 'features/user/routes';
import pet from 'features/pet/routes';

const fullRoutes = [
  ...auth,
  ...app,
  ...user,
  ...pet,
];

export {
  fullRoutes,
};

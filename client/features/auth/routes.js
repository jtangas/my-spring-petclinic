import Page from 'features/app/containers/PageContainer';
import Login from 'features/auth/components/Login/Login';
import Register from 'features/auth/components/Register/Register';

export default [
  {
    path: '/',
    name: 'Login',
    component: Page,
    exact: true,
    render: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Page,
    exact: true,
    render: Register,
  }
];

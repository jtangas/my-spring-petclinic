import Dashboard from 'features/app/containers/DashboardContainer';
import Page from 'features/app/containers/PageContainer';

export default [
  {
    path: '/dashboard',
    component: Page,
    name: 'Dashboard',
    requiresAuth: true,
    render: Dashboard,
    sideNavProps: {
      routes: [],
    }
  },
];

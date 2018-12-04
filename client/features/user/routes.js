import Page from 'features/app/containers/PageContainer';
import ManageUsers from 'features/user/containers/ManageUsers';

const UserRoutes = [
  {
    path: '/users/vets/view',
    name: 'View Vets',
    group: 'Vet Management',
  },
  {
    path: '/users/vets/create',
    name: 'Add Vet',
    group: 'Vet Management',
  },
  {
    path: '/users/owners/view',
    name: 'View Owners',
    group: 'Owner Management',
  },
  {
    path: '/users/owners/create',
    name: 'Add Owner',
    group: 'Owner Management',
  }
];

export default [
  {
    path: '/users/:type?/:action?/:id?',
    pathDisplay: '/users',
    name: 'Manage Users',
    requiresAuth: true,
    component: Page,
    exact: false,
    inMenu: true,
    withSideNav: true,
    render: ManageUsers,
    sideNavProps: {
      routes: UserRoutes,
    },
  },
];

import Page from 'features/app/containers/PageContainer';
import ManagePets from 'features/pet/containers/ManagePets';

const PetRoutes = [
  {
    path: '/pets/view',
    name: 'View Pets',
    group: 'Pet Management',
  },
  {
    path: '/pets/create',
    name: 'Add Pet',
    group: 'Pet Management',
  }
];

export default [
  {
    path: '/pets/:action?/:id?',
    pathDisplay: '/pets',
    name: 'Manage Pets',
    requiresAuth: true,
    component: Page,
    exact: false,
    inMenu: true,
    withSideNav: true,
    render: ManagePets,
    sideNavProps: {
      routes: PetRoutes,
    },
  },
];

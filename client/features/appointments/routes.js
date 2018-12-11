import Page from 'features/app/containers/PageContainer';
import ApptCalendar from 'features/appointments/containers/ApptCalendar';

export default [
  {
    path: '/appointments/:action?',
    pathDisplay: '/appointments',
    name: 'Scheduler',
    requiresAuth: true,
    component: Page,
    exact: false,
    inMenu: true,
    render: ApptCalendar,
  },
];

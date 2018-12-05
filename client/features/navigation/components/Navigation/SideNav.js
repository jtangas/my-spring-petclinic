import React from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

import { GenerateGroups, GenerateMenuItem } from 'features/navigation/components/Navigation/Menu';

export default compose(
  withRouter
)(props => {
  const { routes, history, authenticated, dispatch, staticContext, match, location, ...rest } = props;

  const groups = [...new Set(routes.map(route => route.group))].filter(n => n);
  const ungroupedRoutes = routes.length && routes.map(route => {
    if (route.group === null || route.group === undefined || route.group === '') {
      return route;
    }
    return null;
  }).filter(n => n);

  return (
    <Menu {...rest}>
      {
        ungroupedRoutes.length > 0 && ungroupedRoutes.map(route => (
          <GenerateMenuItem
            key={`menu_item_${route.name}`}
            route={route}
            history={history}
          />
        ))
      }
      {
        groups.length > 0 && groups.map(group => (
          <GenerateGroups
            key={`route_group_${group}`}
            routes={routes}
            group={group}
            history={history}
          />
        ))
      }
    </Menu>
  )
});

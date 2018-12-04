import React from 'react';
import { connect } from 'react-redux';
import { Container, Segment } from 'semantic-ui-react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import {appRoutes, fullRoutes} from 'core/routes';
import Navigation from 'features/navigation/components/Navigation/Navigation';
import PageContainer from 'features/app/containers/PageContainer';

export default props => {
  return (
    <BrowserRouter>
      <div className="App">
        <Segment vertical style={{padding: 0, border: 0, boxShadow: 'none'}}>
          <Navigation routes={fullRoutes}/>
        </Segment>
        <Segment
          style={{
            padding: 0,
            border: 'none',
            boxShadow: 'none',
            display: 'flex',
            flexDirection: 'row',
            height: '100%',
            marginTop: 0,
          }}
        >
          <Switch>
            {
              fullRoutes.map(route => {
                return (
                  <Route
                    exact={route.exact}
                    path={route.path}
                    key={`route_${route.name}`}
                    render={props => <PageContainer {...props} {...route} />}
                  />
                )
              })
            }
          </Switch>
        </Segment>
      </div>
    </BrowserRouter>
  );
};

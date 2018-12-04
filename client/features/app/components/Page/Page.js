import React from 'react';
import { Route } from 'react-router-dom';
import { Message, Container, Transition } from 'semantic-ui-react';

import SideNav from 'features/navigation/components/Navigation/SideNav';
import FlashNotification from 'features/app/components/Notifications/FlashNotification';

export default props => {
  const {
    withSideNav,
    render: RenderComponent,
    exact,
    path,
    sideNavProps,
    title,
    appState,
    ...rest
  } = props;

  return (
    <div style={{ display: 'flex', flex: 1 }}>
      { appState.showFlash === true && (
        <div className="ui" style={{ position: 'fixed', right: 0, bottom: 0, display: 'flex', flexDirection: 'column', zIndex: 10000 }}>
          {appState.flashMessages.map(message => {
            if (message !== null) {
              return <FlashNotification key={`notification_${message.id}`} message={ message } />
            }
          })}
        </div>
      )}
      <div style={{ display: 'flex', flexDirection: 'row', flex: 1 }}>
        { withSideNav === true && (
          <SideNav
            vertical
            inverted
            {...sideNavProps}
            style={{
              borderRadius: 0,
              margin: 0,
              padding: 0,
              height: '100%',
            }}
          />
        )}
        <Route path={path} exact={exact} render={props =>  <RenderComponent {...props} title={title} {...rest} />} />
      </div>
    </div>
  )
};

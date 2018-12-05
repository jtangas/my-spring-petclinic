import React from 'react';
import { connect } from 'react-redux';
import { Menu } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { GenerateMenu } from 'features/navigation/components/Navigation/Menu';

import logoutAction from 'features/auth/actions/Logout';

const mapStateToProps = state => ({
  authenticated: state.auth.loggedIn,
  user: state.user,
});

export default withRouter(connect(mapStateToProps, {logout: logoutAction})(props => {
  const {
    routes,
    authenticated,
    user,
    history,
    logout,
  } = props;

  return (
    <GenerateMenu authenticated={authenticated} routes={routes} history={history}>
      <Menu.Menu position="right">
        {authenticated === true && ([
          <Menu.Item
            key="profile_link"
            name={`${user.current.firstName} ${user.current.lastName}`}
            active={history.location.pathname.startsWith('/profile')}
            onClick={() => history.push('/profile')}
          />,
          <Menu.Item
            key="logout_link"
            name="logout"
            onClick={logout}
          />
        ])}
        {authenticated === false && ([
          <Menu.Item
            key="login_link"
            name="Log In"
            active={history.location.pathname.startsWith('/login')}
            onClick={() => history.push('/login')}
          />
        ])}
      </Menu.Menu>
    </GenerateMenu>
  )
}));

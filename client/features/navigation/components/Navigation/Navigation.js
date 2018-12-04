import React from 'react';
import { connect } from 'react-redux';
import { Menu } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { GenerateMenu } from 'util/helpers/Menu';

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

  let children = [];

  if (authenticated === true) {
    children.push(<Menu.Menu position="right">
      <Menu.Item
        key="profile_link"
        name={`${user.current.firstName} ${user.current.lastName}`}
        active={history.location.pathname.startsWith('/profile')}
        onClick={() => history.push('/profile')}
      />
      <Menu.Item
        key="logout_link"
        name="logout"
        onClick={logout}
      />
    </Menu.Menu>);
  }

  return <GenerateMenu authenticated={authenticated} routes={routes} history={history} children={children} />;

}));

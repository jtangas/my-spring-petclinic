import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Page from 'features/app/components/Page/Page';

class PageContainer extends React.Component {
  constructor(props) {
    super(props);
    // maybe do tracking here
  }

  componentWillMount() {
    if (!this.props.isAuthenticated) {
      return;
    }
  }

  render() {
    const passThroughProps = ((
      {
        withSideNav,
        path,
        exact,
        render,
        sideNavProps,
        appState,
      }) => (
      {
        withSideNav,
        path,
        exact,
        render,
        sideNavProps,
        appState,
      }
    ))(this.props);
    if (!this.props.isAuthenticated && this.props.requiresAuth) {
      return (
        <Redirect
          to={{
            pathname: '/',
          }}
        />
      )
    }

    return (
      <Page
        {...passThroughProps}
      />
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.loggedIn,
  appState: state.app,
});

export default connect(mapStateToProps, null)(PageContainer);

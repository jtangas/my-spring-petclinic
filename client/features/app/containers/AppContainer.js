import React from 'react';
import { connect } from 'react-redux';
import App from 'features/app/components/App/App';

class AppContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <App {...this.props} />
    )
  }
}

AppContainer.defaultProps = {
  isAuthenticated: false,
};

AppContainer = connect(
  state => ({
    // appState: state.app,
    // isAuthenticated: state.auth.isAuthenticated,
  }),
  null
)(AppContainer);

export default AppContainer;

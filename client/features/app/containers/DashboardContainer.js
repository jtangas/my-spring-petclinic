import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


const Dashboard = props => {
  const { authenticated } = props;
  if (authenticated === false) {
    return <Redirect to="/" />;
  }
  return (
    <div style={{ flex: 1 }}>
      <p>Dashboard Page</p>
    </div>
  );
};

Dashboard.defaultProps = {
  authenticated: false,
};

Dashboard.propTypes = {
  authenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  authenticated: state.auth.loggedIn,
});

export default withRouter(connect(mapStateToProps, null)(Dashboard));

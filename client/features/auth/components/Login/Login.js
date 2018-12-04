import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import loginAction from 'features/auth/actions/Login';
import LoginForm from 'features/auth/components/Form/Login';

export default withRouter(connect(null, {login: loginAction})(props => {
  const { history, login } = props;
  const handleSubmit = values => {
    login(values)
      .then(data => {
        history.push('/dashboard');
      })
      .catch(err => console.log(err));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, alignSelf: 'center' }}>
      <LoginForm handleSubmit={handleSubmit} />
    </div>
  )
}));

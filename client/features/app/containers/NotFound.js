import React from 'react';
import { Button } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

const NotFound = props => {
  const { history } = props;
  return (
    <div style={{ padding: '10px', flex: 1 }}>
      <p>Page Not Found</p>
      <Button onClick={() => history.push('/dashboard')}>Back To Dashboard</Button>
    </div>
  );
};

export default withRouter(NotFound);

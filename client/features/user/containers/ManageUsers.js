import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import { createUserAction, updateUserAction } from 'features/user/actions/users';
import ConnectedList from 'features/app/components/List/ConnectedList';
import CreateUser from 'features/user/components/Form/CreateUser';
import UserTemplate from 'features/user/components/Form/templates/UserTemplate';
import NotFound from 'features/app/containers/NotFound';
import TableHeaders from 'features/user/components/Form/definitions/TableHeaders';

const mapDispatchToProps = {
  addNewUser: createUserAction,
  updateUser: updateUserAction,
};

export default
  compose(
    withRouter,
    connect(null, mapDispatchToProps),
  )(props => {
    const {
      history,
      match,
      addNewUser,
      updateUser,
    } = props;

    const { type = 'users', id, action } = match.params;
    const handleUpdateSubmit = values => updateUser(id, values);
    const handleSubmit = values => addNewUser(values);

    if (id !== null && id !== false && action === 'edit') {
      return (
        <CreateUser
          type={type}
          userId={id}
          render={UserTemplate}
          submitHandler={handleUpdateSubmit}
        />
      );
    }

    if (action === 'create') {
      return <CreateUser type={type} render={UserTemplate} submitHandler={handleSubmit} />
    }

    if (action === 'view' && !id || (!action && !id)) {
      return (
        <Container style={{ padding: '10px', flex: 1}}>
          <ConnectedList type={type} tableHeaders={TableHeaders} />
        </Container>
      )
    }

    return <NotFound/>

  });

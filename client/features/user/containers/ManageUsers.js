import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import { createUserAction, updateUserAction } from 'features/user/actions/users';
import UserList from 'features/user/components/List/List';
import CreateOwner from 'features/user/components/Form/CreateOwner';
import CreateVet from 'features/user/components/Form/CreateVet';
import UserTemplate from 'features/user/components/Form/templates/UserTemplate';
import NotFound from 'features/app/containers/NotFound';

const mapDispatchToProps = {
  addNewUser: createUserAction,
  updateUser: updateUserAction,
};

const CreateTemplate = props => {
  const { type, ...rest } = props;

  switch (type) {
    case 'vet':
      return <CreateVet {...rest} />;
    case 'owner':
    default:
      return <CreateOwner {...rest} />;
  }
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
        <CreateTemplate
          type={type}
          userId={id}
          render={UserTemplate}
          handleSubmit={handleUpdateSubmit}
        />
      );
    }

    if (action === 'create') {
      return <CreateTemplate type={type} render={UserTemplate} handleSubmit={handleSubmit} />
    }

    if (action === 'view' && !id || (!action && !id)) {
      return (
        <Container style={{ padding: '10px', flex: 1}}>
          <UserList type={type}/>
        </Container>
      )
    }

    return <NotFound/>

  });

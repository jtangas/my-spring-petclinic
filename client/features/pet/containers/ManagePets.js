import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import NotFound from 'features/app/containers/NotFound';
import {createUserAction, updateUserAction} from "../../user/actions/users";
import PetTemplate from 'features/pet/components/Form/templates/CreatePetTemplate';
import CreatePet from 'features/pet/components/Form/CreatePet';

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

  const { id, action } = match.params;
  const handleUpdateSubmit = values => updateUser(id, values);
  const handleSubmit = values => addNewUser(values);

  if (id !== null && id !== false && action === 'edit') {
    return (
      <CreatePet
        petId={id}
        render={PetTemplate}
        submitHandler={handleUpdateSubmit}
      />
    );
  }

  if (action === 'create') {
    return <CreatePet render={PetTemplate} submitHandler={handleSubmit} />
  }

  if (action === 'view' && !id || (!action && !id)) {
    return (
      <Container style={{ padding: '10px', flex: 1}}>
        {/*<List type={type}/>*/}
        <p>List of pets</p>
      </Container>
    )
  }

  return <NotFound/>

});

import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import NotFound from 'features/app/containers/NotFound';
import { updateUserAction } from "../../user/actions/users";
import { createPetAction } from 'features/pet/actions/pets';
import PetTemplate from 'features/pet/components/Form/templates/CreatePetTemplate';
import CreatePet from 'features/pet/components/Form/CreatePet';
import ConnectedList from 'features/app/components/List/ConnectedList';
import TableHeaders from 'features/pet/components/Form/definitions/TableHeaders';

const mapDispatchToProps = {
  addNewPet: createPetAction,
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
    addNewPet,
    updateUser,
  } = props;

  const { id, action } = match.params;
  const handleUpdateSubmit = values => updateUser(id, values);
  const handleSubmit = values => addNewPet(values);
  const type = 'pets';

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
        <ConnectedList type={type} tableHeaders={TableHeaders} />
      </Container>
    )
  }

  return <NotFound/>

});

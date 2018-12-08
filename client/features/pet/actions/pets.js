const createPetAction = values => dispatch => {
  console.log('test');
  const url = `/api/pets`;
  dispatch({
    type: 'API_REQUEST',
    endpoint: url,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(values),
    actions: {
      success: 'ADD_NEW_PET',
    }
  });
};

export {
  createPetAction,
}
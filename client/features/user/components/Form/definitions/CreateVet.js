import * as Yup from 'yup';

export const Values = {
  firstName: '',
  lastName: '',
  specialties: [],
  type: 'vets',
};

export const Validation = Yup.object().shape({
  firstName: Yup.string()
    .required('First Name is required'),
  lastName: Yup.string()
    .required('Last Name is required'),
});

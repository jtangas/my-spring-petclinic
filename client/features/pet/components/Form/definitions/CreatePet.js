import * as Yup from 'yup';

export const Values = {
  name: '',
  birthDate: '',
  type: '',
  owner: '',
};

export const Validation = Yup.object().shape({
  name: Yup.string()
    .required('First Name is required'),
});

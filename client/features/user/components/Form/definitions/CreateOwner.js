import * as Yup from 'yup';

export const Values = {
  firstName: '',
  lastName: '',
  type: '',
};

export const Validation = Yup.object().shape({
  firstName: Yup.string()
    .required('First Name is required'),
  lastName: Yup.string()
    .required('Last Name is required'),
  type: Yup.string()
    .required('User Type is required')
});

export const Fields = [
  {
    type: 'hidden',
    name: '_id',
  },
  {
    type: 'text',
    name: 'firstName',
    label: 'First Name',
    placeholder: 'Your Name',
  },
  {
    type: 'text',
    name: 'lastName',
    label: 'Last Name',
    placeholder: 'Your Last Name',
  },
  {
    type: 'hidden',
    name: 'type',
    value: 'owner',
  },
];

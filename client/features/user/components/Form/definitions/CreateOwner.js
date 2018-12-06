import * as Yup from 'yup';

export const Values = {
  firstName: '',
  lastName: '',
  type: 'owners',
};

export const Validation = Yup.object().shape({
  firstName: Yup.string()
    .required('First Name is required'),
  lastName: Yup.string()
    .required('Last Name is required'),
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
    type: 'text',
    name: 'address',
    label: 'Street Address',
    placeholder: 'Street Address',
  },
  {
    type: 'text',
    name: 'city',
    label: 'City',
    placeholder: 'Anywhere',
  },
  {
    type: 'text',
    name: 'telephone',
    label: 'Telephone',
    placeholder: '5558765309',
  },
  {
    type: 'hidden',
    name: 'type',
  },
];

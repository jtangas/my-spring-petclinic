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

export const Fields = [
  {
    type: 'text',
    name: 'name',
    placeholder: 'Your pets name',
    label: 'Pet Name',
  },
  {
    type: 'text',
    name: 'birthDate',
    placeholder: 'Your pets date of birth',
    label: 'Pets Date of Birth',
  },
  {
    type: 'select',
    name: 'type',
    label: 'Type of Pet',
    placeholder: 'Please Select',
    options: [
      {key: 'aaaa', text: 'Cat', value: 'aaaa'},
      {key: 'bbbb', text: 'Dog', value: 'bbbb'},
    ],
    width: 8
  },
  {
    type: 'selectSearch',
    name: 'owner',
    label: 'Pets Owner',
    placeholder: 'Start typing owners name',
    width: 8,
    options: []
  }
];

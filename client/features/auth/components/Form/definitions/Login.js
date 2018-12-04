import * as Yup from 'yup';

export const Values = {
  username: '', password: '',
};

export const Validation = Yup.object().shape({
  username: Yup.string()
    .email()
    .required('Username is required')
    .nullable(),
  password: Yup.string()
    .min(4)
    .required()
    .nullable(),
});

export const Fields = [
  {
    type: 'text',
    name: 'username',
    label: 'Username',
    placeholder: 'Email Address',
  },
  {
    type: 'password',
    name: 'password',
    label: 'Password',
    placeholder: 'Password',
  }
];

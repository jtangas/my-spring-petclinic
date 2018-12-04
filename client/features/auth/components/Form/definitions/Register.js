import * as Yup from 'yup';

export const Values = {
  username: '',
  password: '',
  passwordConfirm: '',
  firstName: '',
  lastName: '',
  email: '',
};

export const Validation = Yup.object().shape({
  username: Yup.string()
    .required('Username is required'),
  email: Yup.string()
    .required('Email Address is required'),
  password: Yup.string()
    .min(4)
    .required()
    .nullable(),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password'), null])
    .required('Password must match'),
  firstName: Yup.string()
    .required(),
  lastName: Yup.string()
    .required(),
});

export const Fields = [
  [
    {
      type: 'text',
      name: 'username',
      label: 'Username',
      placeholder: 'Username',
      width: 8
    },
    {
      type: 'text',
      name: 'email',
      label: 'Email Address',
      placeholder: 'johndoe@email.com',
      width: 8
    },
  ],
  [
    {
      type: 'text',
      name: 'firstName',
      label: 'First Name',
      placeholder: 'John',
      width: 8,
    },
    {
      type: 'text',
      name: 'lastName',
      label: 'Last Name',
      placeholder: 'Doe',
      width: 8,
    }
  ],
  [
    {
      type: 'password',
      name: 'password',
      label: 'Password',
      placeholder: 'Password',
      width: 8,
    },
    {
      type: 'password',
      name: 'passwordConfirm',
      label: 'Confirm Password',
      width: 8,
    }
  ]
];

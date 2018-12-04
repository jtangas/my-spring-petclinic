import React from 'react';
import { Formik } from 'formik';

import LoginFormTemplate from 'features/auth/components/Form/templates/LoginFormTemplate';

import {
  Values,
  Validation,
  Fields
} from 'features/auth/components/Form/definitions/Login';

export default props => {
  const {
    handleSubmit,
    render: UserComponent,
  } = props;

  const Template = UserComponent || LoginFormTemplate;

  return (
    <Formik
      values={Values}
      onSubmit={handleSubmit}
      validationSchema={Validation}
      render={formikProps => <Template formFields={Fields} {...formikProps} />}
    />
  )
}

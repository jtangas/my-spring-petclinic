import React from 'react';
import FullWidthTemplate from 'features/form/templates/FullWidthForm';
import { Formik } from 'formik';

import { Values, Validation, Fields } from 'features/user/components/Form/definitions/CreateOwner';

export default props => {
  const { handleSubmit, render: UserDefinedTemplate } = props;

  const Template = UserDefinedTemplate || FullWidthTemplate;

  return (
    <Formik
      initialValues={Values}
      onSubmit={handleSubmit}
      validationSchema={Validation}
      render={props => <Template formFields={Fields} {...props} />}
    />
  )
};

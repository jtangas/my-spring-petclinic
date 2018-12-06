import React from 'react';
import FullWidthTemplate from 'features/form/templates/FullWidthForm';
import { Formik } from 'formik';

import { Values, Validation, Fields } from 'features/user/components/Form/definitions/CreateOwner';

class CreateOwner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fieldList: [],
      currentUser: null,
    }
  }

  componentWillReceiveProps(nextProps) {
    const {userId} = nextProps;
    if (userId !== null) {
      fetch(`/api/owners/${userId}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            this.setState(state => ({
              ...state,
              currentUser: data.data,
            }));
          }
        })
    }
  }

  componentWillMount() {
    const { userId } = this.props;
    if (userId !== null) {
      fetch(`/api/owners/${userId}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            this.setState(state => ({
              ...state,
              currentUser: data.data,
            }));
          }
        })
    } else {
      this.setState(state => ({
        ...state,
        currentUser: null,
      }))
    }
  }

  render() {
    const { handleSubmit: submitHandler, render: UserDefinedTemplate, userId } = this.props;
    const Template = UserDefinedTemplate || FullWidthTemplate;
    const { currentUser } = this.state;

    console.log(submitHandler);

    let initialValues = currentUser || Values;

    if (userId !== undefined && !currentUser) {
      return (<div><p>Loading form</p></div>);
    }

    return (
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={submitHandler}
        validationSchema={Validation}
        render={formikProps => <Template formFields={Fields} {...formikProps} />}
      />
    )
  }
}

export default CreateOwner;

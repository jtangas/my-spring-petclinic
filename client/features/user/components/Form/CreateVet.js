import React from 'react';
import FullWidthTemplate from 'features/form/templates/FullWidthForm';
import { Formik } from 'formik';

import { Values, Validation } from 'features/user/components/Form/definitions/CreateVet';

class CreateVet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fieldList: [],
      currentUser: null
    }
  }

  componentWillReceiveProps(nextProps) {
    const { userId } = nextProps;
    if (userId !== null) {
      fetch(`/api/vets/${userId}`)
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
    const { fieldList } = this.state;
    const { userId } = this.props;

    if (userId !== null) {
      fetch(`/api/vets/${userId}`)
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

  render() {
    const { handleSubmit: submitHandler, render: UserDefinedTemplate, userId } = this.props;
    const Template = UserDefinedTemplate || FullWidthTemplate;
    const { fieldList, currentUser } = this.state;

    let initialValues = currentUser || Values;

    if ( fieldList.length === 0 || (userId !== null && !currentUser)) {
      return (<div><p>Loading form</p></div>);
    }

    return (
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={submitHandler}
        validationSchema={Validation}
        render={formikProps => <Template formFields={fieldList} {...formikProps} />}
      />
    )
  }
}

export default CreateVet;

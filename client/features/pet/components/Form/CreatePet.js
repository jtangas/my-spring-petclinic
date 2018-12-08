import React from 'react';
import { Formik } from 'formik';
import { connect } from 'react-redux';

import CreatePetTemplate from 'features/pet/components/Form/templates/CreatePetTemplate';

import {
  Values,
  Validation,
  Fields
} from 'features/pet/components/Form/definitions/CreatePet';
import {withRouter} from "react-router-dom";

class CreatePet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fieldList: Fields,
      currentPet: null,
    }
  }

  loadThePage(props) {
    const { petId } = props;
    const { currentPet } = this.state;

    if (petId !== undefined && (currentPet === null || (currentPet !== null && currentPet._id !== petId))) {
      fetch(`/api/pets/${petId}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            this.setState(state => ({
              ...state,
              currentPet: data.data,
            }));
          }
        })
    }
  }

  componentWillReceiveProps(nextProps) {
    this.loadThePage(nextProps);
  }

  componentWillMount() {
    this.loadThePage(this.props);
  }

  render() {
    const { submitHandler, render: UserDefinedTemplate, petId } = this.props;

    const Template = UserDefinedTemplate || CreatePetTemplate;
    const { currentPet, fieldList } = this.state;

    let initialValues = currentPet || Values;

    if (petId !== undefined && !currentPet) {
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

export default withRouter(CreatePet);

import React from 'react';
import { Formik } from 'formik';
import { connect } from 'react-redux';

import CreatePetTemplate from 'features/pet/components/Form/templates/CreatePetTemplate';

import {
  Values,
  Validation
} from 'features/pet/components/Form/definitions/CreatePet';
import {withRouter} from "react-router-dom";

class CreatePet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fieldList: [],
      currentPet: null,
    }
  }

  loadThePage(props) {
    const { petId } = props;
    const { currentPet, fieldList } = this.state;

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

    if (fieldList.length === 0) {
      fetch(`/api/system/pet-types`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            this.setState(state => ({
              ...state,
              fieldList: [
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
                  options: data.data,
                  width: 8
                }
              ]
            }))
          }
        })
    }

    let ownerList = fieldList.find(field => field.name === 'owner');
    if (!ownerList && fieldList.length > 0) {
      fetch(`/api/owners`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            const ownerList = {
              type: 'selectSearch',
              name: 'owner',
              label: 'Pets Owner',
              placeholder: 'Start typing owners name',
              width: 8,
              options: data.data
            };

            this.setState(state => ({
              ...state,
              fieldList: state.fieldList.concat(ownerList),
            }))
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

    if (fieldList.length === 0) {
      return (<div><p>Loading form</p></div>);
    }

    if (petId !== undefined && !currentPet) {
      return (<div><p>Loading form</p></div>);
    }

    console.log(fieldList);

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

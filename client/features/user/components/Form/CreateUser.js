import React from 'react';
import FullWidthTemplate from 'features/form/templates/FullWidthForm';
import { withRouter } from 'react-router-dom';
import { Formik } from 'formik';

import { Values as OwnerValues, Validation as OwnerValidation, Fields as OwnerFields } from 'features/user/components/Form/definitions/CreateOwner';
import { Values as VetValues, Validation as VetValidation } from 'features/user/components/Form/definitions/CreateVet';

class CreateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fieldList: (props.type === 'owners') ? OwnerFields : [],
      currentUser: null,
    }
  }

  loadThePage(props) {
    const { userId, type } = props;
    const { currentUser } = this.state;

    if (type === 'vets') {
      fetch('/api/system/vet-specialties')
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            this.setState(state => ({
              ...state,
              fieldList: [
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
                  type: 'checkboxGroup',
                  name: 'specialties',
                  label: 'Specialties',
                  options: data.data,
                },
                {
                  type: 'hidden',
                  name: 'type',
                },
              ]
            }));
          }
        })
        .catch(err => console.warn(err));
    } else {
      this.setState(state => ({
        ...state,
        fieldList: OwnerFields,
      }))
    }

    if (userId !== undefined && (currentUser === null || (currentUser !== null && currentUser._id !== userId))) {
      console.log({
        userId,
        method: 'componentWillMount',
      });
      fetch(`/api/${type}/${userId}`)
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

  componentWillReceiveProps(nextProps) {
    this.loadThePage(nextProps);
  }

  componentWillMount() {
    this.loadThePage(this.props);
  }

  render() {
    const { submitHandler, render: UserDefinedTemplate, userId, type } = this.props;

    const Template = UserDefinedTemplate || FullWidthTemplate;
    const { currentUser, fieldList } = this.state;

    let Values = [];
    let Validation = null;

    switch (type) {
      case 'vets':
        Validation = VetValidation;
        Values = VetValues;
        break;
      case 'owners':
      default:
        Validation = OwnerValidation;
        Values = OwnerValues;
        break;
    }

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
        render={formikProps => <Template formFields={fieldList} {...formikProps} />}
      />
    )
  }
}

export default withRouter(CreateUser);

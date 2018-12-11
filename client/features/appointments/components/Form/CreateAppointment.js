import React from 'react';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import debounce from 'debounce';

import CreatePetTemplate from 'features/appointments/components/Form/templates/CreateApptTemplate';

import {
    Values,
    Validation
} from 'features/appointments/components/Form/definitions/CreateAppt';
import {withRouter} from "react-router-dom";

class CreatePet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fieldList: {},
            currentOwner: null,
            owners: [],
        }
    }

    fetchOwner(id) {
        fetch(`/api/owners/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    this.setState(state => ({
                        ...state,
                        currentOwner: data.data,
                        fieldList: {
                            ...state.fieldList,
                            pet: {
                                type: 'selectSearch',
                                name: 'pet',
                                label: 'Pet',
                                placeholder: 'Start typing pet name',
                                width: 8,
                                options: data.data.pets.map(option => ({
                                    text: option.name,
                                    value: option._id,
                                    id: option._id,
                                })),
                            }
                        }
                    }))
                }
            })
    }

    fetch(type, query) {
        const body = {
            query: query,
        };

        fetch(`/api/${type}/search`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(body),
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    this.setState(state => ({
                        ...state,
                        owners: data.data,
                    }))
                }
            });
    }

    search(type, query) {
        debounce(this.fetch(type, query), 500);
    }

    loadThePage(props) {
        const { fieldList, owners } = this.state;
        const ownerOptions = owners.map(option => ({
            text: `${option.firstName} ${option.lastName}`,
            value: option._id,
            id: option._id,
        }));

        if (fieldList !== undefined && fieldList !== []) {
            let ownerField = fieldList.owner;
            if (ownerField === undefined || ownerField.options !== ownerOptions) {
                this.setState(state => ({
                    ...state,
                    fieldList: {
                        ...state.fieldList,
                        owner: {
                            type: 'selectSearch',
                            name: 'owner',
                            label: 'Pet Owner',
                            placeholder: 'Start typing owners name',
                            width: 8,
                            options: ownerOptions,
                            onSearchChange: (e) => {
                                e.persist();
                                const query = e.target.value;
                                this.search('owners', query)
                            },
                            onChange: (e) => {
                                this.fetchOwner(e);
                            }
                        }
                    }
                }))
            }
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { owners: stateOwners, lastFieldList } = prevState;
        const { owners, fieldList } = this.state;
        if (stateOwners !== owners) {
            this.loadThePage('owners');
        }
    }

    componentWillReceiveProps(nextProps) {
        this.loadThePage(nextProps);
    }

    componentWillMount() {
        this.loadThePage(this.props);
    }

    render() {
        const { submitHandler, render: UserDefinedTemplate } = this.props;

        const Template = UserDefinedTemplate || CreatePetTemplate;
        const { fieldList } = this.state;

        let initialValues = Values;

        if (fieldList.length === 0) {
            return (<div><p>Loading form</p></div>);
        }

        return (
            <Formik
                enableReinitialize
                initialValues={initialValues}
                onSubmit={submitHandler}
                validationSchema={Validation}
                render={formikProps => <Template formFields={Object.values(fieldList)} {...formikProps} />}
            />
        )
    }
}

export default withRouter(CreatePet);

import * as Yup from 'yup';

export const Values = {
    pet: String,
    owner: String,
    vet: String,
    datetime: Date,
};

export const Validation = Yup.object().shape({
    pet: Yup.string()
        .required('Pet is required'),
    owner: Yup.string()
        .required('Owner is required'),
    vet: Yup.string()
        .required('Vet is required'),
    datetime: Yup.date()
        .required('Appointment date is required')
});

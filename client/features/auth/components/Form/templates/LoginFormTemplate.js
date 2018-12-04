import React from 'react';
import {
  Button,
  Form,
  Grid,
  Segment,
} from 'semantic-ui-react';

import { textFields } from 'features/form/config';

export default props => {
  const {
    formFields,
    values,
    handleSubmit,
    handleChange,
    handleBlur,
    errors,
    touched,
  } = props;

  return (
    <Grid textAlign="center" style={ { height: '100%' } } verticalAlign="middle">
      <Grid.Column style={ { width: '450px' } }>
        <Form onSubmit={handleSubmit}>
          <Segment style={{ border: 0, boxShadow: 'none' }}>
            {formFields.map((field, i) => (
              <Form.Field key={`form_field_${i}`}>
                {
                  field.label &&
                  (
                    <label
                      style={{
                        textAlign: 'left',
                        color: textFields.includes(field.type) && errors[field.name] && touched[field.name] ? 'red' : null
                      }}
                    >
                      {field.label}
                    </label>
                  )
                }
                {textFields.includes(field.type) && (
                  <input
                    type={field.type}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values[field.name]}
                    name={field.name}
                    placeholder={field.placeholder}
                  />
                )}
                {
                  textFields.includes(field.type) &&
                  !field.label &&
                  touched[field.name] &&
                  errors[field.name] &&
                  (<p>{errors[field.name]}</p>)
                }
              </Form.Field>
            ))}
            <Button type="submit" color="teal" fluid size="large">
              Login
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  )
};

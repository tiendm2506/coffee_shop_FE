import * as yup from 'yup'

export const yupHelper = {
  string: ({ label = 'Field', required = true } = {}) => {
    let schema = yup.string()

    if (required) {
      schema = schema.required(`${label} is required`)
    }

    return schema
  },

  min: (schema, length, label = 'Field') =>
    schema.min(length, `${label} must be at least ${length} characters`)
}
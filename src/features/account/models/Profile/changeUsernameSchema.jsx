import {string, object} from 'yup'

import profileFormModel from './profileFormModel'
const {
  formField: {
    user: {username, confirmPassword},
  },
} = profileFormModel

export default object().shape({
  user: object({
    [username.key]: string()
      .trim()
      .required(`${username.requiredErrorMsg}`)
      .min(username.min, `${username.label} must be a minimum of ${username.min} characters`)
      .max(username.max, `${username.label} must be a maximum of ${username.max} characters`),
    [confirmPassword.key]: string().required(`${confirmPassword.requiredErrorMsg}`),
  }),
})

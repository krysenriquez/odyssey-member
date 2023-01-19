import {string, object} from 'yup'

import profileFormModel from './profileFormModel'
const {
  formField: {
    user: {emailAddress, confirmPassword},
  },
} = profileFormModel

export default object().shape({
  user: object({
    [emailAddress.key]: string()
      .email(`${emailAddress.invalidErrorMsg}`)
      .required(`${emailAddress.requiredErrorMsg}`),
    [confirmPassword.key]: string().required(`${confirmPassword.requiredErrorMsg}`),
  }),
})

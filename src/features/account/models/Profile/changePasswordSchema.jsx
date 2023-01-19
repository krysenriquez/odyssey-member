import {string, object, ref} from 'yup'
import * as yup from 'yup'
import YupPassword from 'yup-password'
YupPassword(yup)
import profileFormModel from './profileFormModel'
const {
  formField: {
    user: {currentPassword, newPassword, confirmNewPassword},
  },
} = profileFormModel

export default object().shape({
  user: object({
    [currentPassword.key]: string().required(`${currentPassword.requiredErrorMsg}`),
    [newPassword.key]: string()
      .min(8, 'Password must be at least 8 characters')
      .minLowercase(1, 'Password must contain at least 1 lower case letter')
      .minUppercase(1, 'Password must contain at least 1 upper case letter')
      .minNumbers(1, 'Password must contain at least 1 number')
      .minSymbols(1, 'Password must contain at least 1 special character')
      .required(`${newPassword.requiredErrorMsg}`),
    [confirmNewPassword.key]: string()
      .required(`${confirmNewPassword.requiredErrorMsg}`)
      .oneOf([ref('newPassword'), null], `${confirmNewPassword.invalidErrorMsg}`),
  }),
})

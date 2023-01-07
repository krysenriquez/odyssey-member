import {string, object} from 'yup'
import franchiseeCreateFormModel from './franchiseeCreateFormModel'

const {
  formField: {
    firstName,
    middleName,
    lastName,
    gender,
    contactNumber,
    emailAddress,
    street,
    city,
    state,
  },
} = franchiseeCreateFormModel

export default object().shape({
  [firstName.key]: string().trim().required(`${firstName.requiredErrorMsg}`),
  [middleName.key]: string().trim().required(`${middleName.requiredErrorMsg}`),
  [lastName.key]: string().trim().required(`${lastName.requiredErrorMsg}`),
  [gender.key]: string().trim().required(`${gender.requiredErrorMsg}`),
  [contactNumber.key]: string().required(`${contactNumber.requiredErrorMsg}`),
  [emailAddress.key]: string()
    .email(`${emailAddress.invalidErrorMsg}`)
    .required(`${emailAddress.requiredErrorMsg}`),
  [street.key]: string().required(`${street.requiredErrorMsg}`),
  [city.key]: string().required(`${city.requiredErrorMsg}`),
  [state.key]: string().required(`${state.requiredErrorMsg}`),
})

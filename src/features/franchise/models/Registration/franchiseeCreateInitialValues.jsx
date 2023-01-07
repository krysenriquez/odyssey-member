import franchiseeCreateFormModel from './franchiseeCreateFormModel'

const {
  formField: {
    sponsorAccountId,
    sponsorAccountName,
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

export default {
  [sponsorAccountId.key]: '',
  [sponsorAccountName.key]: '',
  [firstName.key]: '',
  [middleName.key]: '',
  [lastName.key]: '',
  [gender.key]: '',
  [contactNumber.key]: '',
  [emailAddress.key]: '',
  [street.key]: '',
  [city.key]: '',
  [state.key]: '',
}

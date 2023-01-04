import registrationFormModel from './registrationFormModel'
const {
  formField: {
    parentAccountId,
    parentAccountName,
    parentSide,
    sponsorAccountId,
    sponsorAccountName,
    firstName,
    middleName,
    lastName,
    personalInfo: {birthdate, gender},
    contactInfo: {contactNumber},
    addressInfo: {street, city, state},
    user: {username, emailAddress, password, repeatPassword},
  },
} = registrationFormModel

export default {
  [parentAccountId.key]: '',
  [parentAccountName.key]: '',
  [parentSide.key]: '',
  [sponsorAccountId.key]: '',
  [sponsorAccountName.key]: '',
  [firstName.key]: '',
  [middleName.key]: '',
  [lastName.key]: '',
  personalInfo: {
    [birthdate.key]: new Date(),
    [gender.key]: '',
  },
  contactInfo: {
    [contactNumber.key]: '',
  },
  addressInfo: {
    [street.key]: '',
    [city.key]: '',
    [state.key]: '',
  },
  avatarInfo: {},
  user: {
    [username.key]: '',
    [emailAddress.key]: '',
    [password.key]: '',
    [repeatPassword.key]: '',
  },
}

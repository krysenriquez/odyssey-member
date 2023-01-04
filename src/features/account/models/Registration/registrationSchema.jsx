import {string, object, boolean, number, array, ref, date, ValidationError} from 'yup'
import * as yup from 'yup'
import YupPassword from 'yup-password'
YupPassword(yup)
import {
  verifyAccountName,
  verifyParentAccountNumber,
  verifyParentSide,
  verifySponsorAccountNumber,
} from '../../api'
import {verifyUsername, verifyEmailAddress} from '../../api'
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

const verifyName = async (ctx) => {
  const firstName = ctx.parent.firstName
  const middleName = ctx.parent.middleName
  const lastName = ctx.parent.lastName
  if (firstName && middleName && lastName) {
    if (firstName.trim() !== '' && middleName.trim() !== '' && lastName.trim() !== '') {
      return await verifyAccountName(firstName, middleName, lastName)
        .then((response) => {
          console.log(response)
          return true
        })
        .catch((err) => {
          const errors = ['firstName', 'middleName', 'lastName'].map((key) => {
            return new ValidationError(err.response.data.message, key, key)
          })
          console.log(errors)
          return ctx.createError({message: () => errors})
        })
    }
  }
  return true
}

const validateSponsorAccountNumber = async (ctx) => {
  return await verifySponsorAccountNumber(ctx.parent.sponsorAccountId)
    .then((response) => {
      console.log(ctx)
      ctx.parent.sponsorAccountName = response.data.account
      return true
    })
    .catch((err) => {
      console.log(ctx)
      ctx.parent.sponsorAccountName = ''
      return ctx.createError({path: 'sponsorAccountId', message: err.response.data.message})
    })
}

const validateParentAccountNumber = async (ctx) => {
  return await verifyParentAccountNumber(ctx.parent.parentAccountId)
    .then((response) => {
      ctx.parent.parentAccountName = response.data.account
      return true
    })
    .catch((err) => {
      ctx.parent.parentAccountName = ''
      return ctx.createError({path: 'parentAccountId', message: err.response.data.message})
    })
}

const validateParentSide = async (ctx) => {
  return await verifyParentSide(ctx.parent.parentAccountId, ctx.parent.parentSide)
    .then((response) => {
      return true
    })
    .catch((err) => {
      return ctx.createError({path: 'parentSide', message: err.response.data.message})
    })
}

const validateUsername = async (ctx) => {
  return await verifyUsername(ctx.parent.username)
    .then((response) => {
      return true
    })
    .catch((err) => {
      console.log(ctx)
      return ctx.createError({path: 'user.username', message: err.response.data.message})
    })
}

const validateEmailAddress = async (ctx) => {
  return await verifyEmailAddress(ctx.parent.emailAddress)
    .then((response) => {
      return true
    })
    .catch((err) => {
      return ctx.createError({path: 'user.emailAddress', message: err.response.data.message})
    })
}

export default [
  object().shape({}),
  object().shape({
    [sponsorAccountId.key]: string()
      .required(`${sponsorAccountId.requiredErrorMsg}`)
      .test({
        name: 'is-valid-sponsor-account-number',
        test: (value, ctx) => validateSponsorAccountNumber(ctx),
        exclusive: true,
      }),
    [sponsorAccountName.key]: string().required(`${sponsorAccountName.requiredErrorMsg}`),
    [parentAccountId.key]: string()
      .required(`${parentAccountId.requiredErrorMsg}`)
      .test({
        name: 'is-valid-parent-account-number',
        test: (value, ctx) => validateParentAccountNumber(ctx),
        exclusive: true,
      }),
    [parentAccountName.key]: string().required(`${parentAccountName.requiredErrorMsg}`),
    [parentSide.key]: string()
      .required(`${parentSide.requiredErrorMsg}`)
      .test({
        name: 'is-valid-parent-side',
        test: (value, ctx) => validateParentSide(ctx),
        exclusive: true,
      }),
  }),
  object().shape({
    [firstName.key]: string().trim().required(`${firstName.requiredErrorMsg}`),
    [middleName.key]: string().trim().required(`${middleName.requiredErrorMsg}`),
    [lastName.key]: string()
      .trim()
      .required(`${lastName.requiredErrorMsg}`)
      .test({
        name: 'is-valid-account-name',
        test: (value, ctx) => verifyName(ctx),
        exclusive: true,
      }),
    personalInfo: object({
      [birthdate.key]: date(),
      [gender.key]: string().required(`${gender.requiredErrorMsg}`),
    }),
    contactInfo: object({
      [contactNumber.key]: string().required(`${contactNumber.requiredErrorMsg}`),
    }),
    addressInfo: object({
      [street.key]: string().required(`${street.requiredErrorMsg}`),
      [city.key]: string().required(`${city.requiredErrorMsg}`),
      [state.key]: string().required(`${state.requiredErrorMsg}`),
    }),
  }),
  object().shape({
    user: object({
      [username.key]: string()
        .trim()
        .required(`${username.requiredErrorMsg}`)
        .test({
          name: 'is-valid-username',
          test: (value, ctx) => validateUsername(ctx),
          exclusive: true,
        }),
      [emailAddress.key]: string()
        .email(`${emailAddress.invalidErrorMsg}`)
        .required(`${emailAddress.requiredErrorMsg}`)
        .test({
          name: 'is-valid-email-address',
          test: (value, ctx) => validateEmailAddress(ctx),
          exclusive: true,
        }),
      [password.key]: string()
        .min(8, 'Password must be at least 8 characters')
        .minLowercase(1, 'Password must contain at least 1 lower case letter')
        .minUppercase(1, 'Password must contain at least 1 upper case letter')
        .minNumbers(1, 'Password must contain at least 1 number')
        .minSymbols(1, 'Password must contain at least 1 special character')
        .required(`${password.requiredErrorMsg}`),
      [repeatPassword.key]: string()
        .required(`${repeatPassword.requiredErrorMsg}`)
        .oneOf([ref('password'), null], `${repeatPassword.invalidErrorMsg}`),
    }),
  }),
]

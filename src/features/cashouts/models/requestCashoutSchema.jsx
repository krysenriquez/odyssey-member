import {string, object, boolean, number, array, ref, date, ValidationError} from 'yup'
import cashoutFormModel from './cashoutFormModel'
const {
  formField: {activityAmount, wallet},
} = cashoutFormModel
import {getWalletCashoutSchedule, getWalletMaxCashout} from '../api'

const validateWalletCashoutSchedule = async (ctx) => {
  return await getWalletCashoutSchedule({
    accountId: ctx.parent.accountId,
    wallet: ctx.parent.wallet,
  })
    .then((response) => {
      return true
    })
    .catch((err) => {
      return ctx.createError({path: 'wallet', message: err.response.data.message})
    })
}

const validateWalletMaxCashout = async (ctx) => {
  return await getWalletMaxCashout({
    accountId: ctx.parent.accountId,
    wallet: ctx.parent.wallet,
    amount: ctx.parent.activityAmount,
  })
    .then((response) => {
      return true
    })
    .catch((err) => {
      return ctx.createError({path: 'activityAmount', message: err.response.data.message})
    })
}

export default object().shape({
  [activityAmount.key]: number()
    .integer(`${activityAmount.invalidErrorMsg}`)
    .required(`${activityAmount.requiredErrorMsg}`)
    .test({
      name: 'is-valid-activity-amount',
      test: (value, ctx) => validateWalletMaxCashout(ctx),
      exclusive: true,
    }),
  [wallet.key]: string()
    .required(`${wallet.requiredErrorMsg}`)
    .test({
      name: 'is-valid-wallet',
      test: (value, ctx) => validateWalletCashoutSchedule(ctx),
      exclusive: true,
    }),
})

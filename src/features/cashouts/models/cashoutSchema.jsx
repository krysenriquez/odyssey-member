import {string, object, number} from 'yup'
import cashoutFormModel from './cashoutFormModel'

const {
  formField: {
    activityAmount,
    activityAdminFee,
    activityTotalAmount,
    wallet,
    note,
    cashoutMethod: {cashoutMethodId, accountName, accountNumber, method, others},
  },
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
    .then(async (response) => {
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
  [activityAdminFee.key]: number()
    .integer(`${activityAdminFee.invalidErrorMsg}`)
    .required(`${activityAmount.requiredErrorMsg}`)
    .test({
      name: 'is-valid-activity-amount',
      test: (value, ctx) => validateWalletMaxCashout(ctx),
      exclusive: true,
    }),
  [activityTotalAmount.key]: number()
    .integer(`${activityTotalAmount.invalidErrorMsg}`)
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
  [note.key]: string(),
  cashoutMethod: object({
    [cashoutMethodId.key]: string(),
    [accountName.key]: string().when([cashoutMethodId.key], {
      is: (val) => !!val === true,
      then: string().notRequired(),
      otherwise: string().required(`${accountName.requiredErrorMsg}`),
    }),
    [accountNumber.key]: string().when([cashoutMethodId.key], {
      is: (val) => !!val === true,
      then: string().notRequired(),
      otherwise: string().required(`${accountNumber.requiredErrorMsg}`),
    }),
    [method.key]: string().when([cashoutMethodId.key], {
      is: (val) => !!val === true,
      then: string().notRequired(),
      otherwise: string().required(`${method.requiredErrorMsg}`),
    }),
    [others.key]: string().when([method.key], {
      is: (val) => val === 'Other/s',
      then: string().required(`${others.requiredErrorMsg}`),
      otherwise: string().notRequired(),
    }),
  }),
})

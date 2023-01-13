import cashoutFormModel from './cashoutFormModel'
const {
  formField: {
    accountId,
    activityAmount,
    activityAdminFee,
    activityTotalAmount,
    wallet,
    note,
    cashoutMethod: {cashoutMethodId, accountName, accountNumber, method, others},
  },
} = cashoutFormModel

export default {
  [accountId.key]: '',
  [activityAmount.key]: 0,
  [activityAdminFee.key]: 0,
  [activityTotalAmount.key]: 0,
  [wallet.key]: '',
  [note.key]: '',
  cashoutMethod: {
    [cashoutMethodId.key]: '',
    [accountName.key]: '',
    [accountNumber.key]: '',
    [method.key]: '',
    [others.key]: '',
  },
}

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
  [activityAmount.key]: '',
  [activityAdminFee.key]: '',
  [activityTotalAmount.key]: '',
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

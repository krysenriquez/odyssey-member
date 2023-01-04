import cashoutFormModel from './cashoutFormModel'
const {
  formField: {
    accountId,
    activityAmount,
    wallet,
    note,
    cashoutMethod: {cashoutMethodId, accountName, accountNumber, method, others},
  },
} = cashoutFormModel

export default {
  [accountId.key]: '',
  [activityAmount.key]: '',
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

export default {
  formId: 'cashoutForm',
  formField: {
    accountId: {
      key: 'accountId',
      name: 'accountId',
    },
    activityAmount: {
      key: 'activityAmount',
      name: 'activityAmount',
      label: 'Amount',
      requiredErrorMsg: 'Amount is required',
      invalidErrorMsg: 'Invalid Amount format',
    },
    activityAdminFee: {
      key: 'activityAdminFee',
      name: 'activityAdminFee',
      label: 'Admin Fee',
      requiredErrorMsg: 'Admin Fee is required',
      invalidErrorMsg: 'Invalid Amount format',
    },
    activityTotalAmount: {
      key: 'activityTotalAmount',
      name: 'activityTotalAmount',
      label: 'Total Amount',
      requiredErrorMsg: 'Total Amount is required',
      invalidErrorMsg: 'Invalid Amount format',
    },
    wallet: {
      key: 'wallet',
      name: 'wallet',
      label: 'Wallet',
      requiredErrorMsg: 'Wallet is required',
    },
    note: {
      key: 'note',
      name: 'note',
      label: 'Note',
    },
    cashoutMethod: {
      cashoutMethodId: {
        key: 'cashoutMethodId',
        name: 'cashoutMethod.cashoutMethodId',
        label: 'Cashout Method',
        requiredErrorMsg: 'Cashout Method is required',
      },
      accountName: {
        key: 'accountName',
        name: 'cashoutMethod.accountName',
        label: 'Account Name',
        requiredErrorMsg: 'Account Name is required',
      },
      accountNumber: {
        key: 'accountNumber',
        name: 'cashoutMethod.accountNumber',
        label: 'Account Number',
        requiredErrorMsg: 'Account Number is required',
      },
      method: {
        key: 'method',
        name: 'cashoutMethod.method',
        label: 'Method',
        requiredErrorMsg: 'Method is required',
      },
      others: {
        key: 'others',
        name: 'cashoutMethod.others',
        label: 'Other/s',
        requiredErrorMsg: 'Other/s is required',
      },
    },
  },
}

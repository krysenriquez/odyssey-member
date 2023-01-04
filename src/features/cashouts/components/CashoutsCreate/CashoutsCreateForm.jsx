import {useEffect, useMemo, useState} from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import {useWallet} from '@/features/wallets/stores/WalletProvider'
import {toast} from 'react-toastify'
import {requestCashout} from '../../api'
import {useAccount} from '@/providers/AccountProvider'
import {useCashoutsListQueryContext} from '../../stores/CashoutsListQueryProvider'
import {useCashouts} from '../../stores/CashoutsProvider'
import {useModalContext} from '@/components/elements/Modal/CustomModal'
import InputField from '@/components/elements/Input/InputField'
import SelectField from '@/components/elements/Input/SelectField'
import TextAreaField from '@/components/elements/Input/TextAreaField'
import {arrayObjectToSelectOptions, arrayToSelectOptions} from '@/utils/arrayToSelectOptions'
import cashoutSchema from '../../models/cashoutSchema'
import cashoutFormModel from '../../models/cashoutFormModel'
import cashoutInitialValues from '../../models/cashoutInitialValues'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const cashoutWallets = [
  {
    value: null,
    label: 'Select Wallet',
  },
  {
    value: 'B_WALLET',
    label: 'Binary Wallet',
  },
  {
    value: 'F_WALLET',
    label: 'Franchise Wallet',
  },
]

const methods = [
  {
    value: null,
    label: 'Select Method',
  },
  {
    value: 'GCash',
    label: 'GCash',
  },
  {
    value: 'BDO',
    label: 'BDO Transfer',
  },
  {
    value: 'Metrobank',
    label: 'Metrobank Transfer',
  },
  {
    value: 'Other/s',
    label: 'Other/s',
  },
]

export const CashoutsCreateForm = () => {
  const {toggleModal} = useModalContext()
  const {wallets} = useWallet()
  const {refetch} = useCashoutsListQueryContext()
  const {currentAccount} = useAccount()
  const {cashout, cashoutMethods, accountCashoutMethods} = useCashouts()
  const [initialCashout, setInitialCashout] = useState(cashoutInitialValues)

  const [cashoutMethodsOptions, setCashoutMethodsOptions] = useState([])
  const [accountCashoutMethodsOptions, setAccountCashoutMethodsOptions] = useState([])
  const swal = withReactContent(Swal)

  const {
    formField: {
      activityAmount,
      wallet,
      note,
      cashoutMethod: {cashoutMethodId, accountName, accountNumber, method, others},
    },
  } = cashoutFormModel

  const cancel = (withRefresh) => {
    if (withRefresh) {
      refetch()
    }
    toggleModal()
  }

  useEffect(() => {
    if (currentAccount) {
      setInitialCashout((prevState) => {
        return {...prevState, accountId: currentAccount.accountId}
      })
    }
  }, [currentAccount])

  useEffect(() => {
    if (cashout) {
      setInitialCashout(cashout)
    }
  }, [cashout])

  useEffect(() => {
    if (accountCashoutMethods) {
      setAccountCashoutMethodsOptions(
        arrayObjectToSelectOptions(
          accountCashoutMethods,
          'id',
          'cashoutMethodName',
          'Select Cashout Method'
        )
      )
    }
  }, [accountCashoutMethods])

  useEffect(() => {
    if (cashoutMethods) {
      setCashoutMethodsOptions(arrayToSelectOptions(cashoutMethods, 'Select Cashout Method'))
    }
  }, [cashoutMethods])

  const submitStep = async (values, actions) => {
    swal
      .fire({
        title: 'Create Cashout?',
        icon: 'question',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: 'btn btn-primary',
        cancelButtonColor: 'btn btn-danger',
        confirmButtonText: 'Create',
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          actions.setSubmitting(true)
          try {
            const {data: response} = await requestCashout(values)
            swal.fire('Cashout Created!', 'Cashout has been created.', 'success')
            toast.success(response.message)
          } catch (ex) {
            toast.error(ex.message)
          } finally {
            actions.setSubmitting(true)
            cancel(true)
          }
        }
      })
  }

  return (
    <Formik
      enableReinitialize
      validateOnChange={false}
      validationSchema={cashoutSchema}
      initialValues={initialCashout}
      onSubmit={submitStep}
    >
      {(actions) => (
        <Form>
          <div className='scroll-y me-n7 pe-7'>
            <div className='row g-9 mb-5'>
              <div className='col-md-6'>
                <SelectField
                  name={wallet.name}
                  label={wallet.label}
                  data={cashoutWallets}
                  required
                />
              </div>
              <div className='col-md-6'>
                <InputField name={activityAmount.name} label={activityAmount.label} />
              </div>
            </div>
            <div className='row g-9 mb-5'>
              <div className='col-12'>
                <TextAreaField name={note.name} label={note.label} />
              </div>
            </div>
            <div className='row g-9 mb-5'>
              <div className='col-md-12'>
                <SelectField
                  name={cashoutMethodId.name}
                  label={cashoutMethodId.label}
                  data={accountCashoutMethodsOptions}
                  required
                />
              </div>
            </div>
            <div className='separator separator-content my-14'>
              <span className='w-250px text-gray-500 fw-semibold fs-7'>
                Or with New Cashout Method
              </span>
            </div>
            <div className='row g-9 mb-5'>
              <div className='col-md-6'>
                <SelectField
                  name={method.name}
                  label={method.label}
                  data={cashoutMethodsOptions}
                  required
                />
              </div>
              <div className='col-md-6'>
                <InputField name={others.name} label={others.label} />
              </div>
            </div>
            <div className='row g-9 mb-5'>
              <div className='col-md-6'>
                <InputField name={accountName.name} label={accountName.label} required />
              </div>
              <div className='col-md-6'>
                <InputField name={accountNumber.name} label={accountNumber.label} required />
              </div>
            </div>
          </div>
          <div className='d-flex align-items-stretch justify-content-between pt-15'>
            <button
              type='reset'
              onClick={() => toggleModal()}
              className='btn btn-light me-3'
              disabled={actions.isSubmitting}
            >
              Cancel
            </button>
            <button
              type='submit'
              className='btn btn-primary'
              disabled={actions.isSubmitting || !actions.isValid || !actions.touched}
            >
              <span className='indicator-label'>Request</span>
              {actions.isSubmitting && (
                <span className='indicator-progress'>
                  Please wait...{' '}
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              )}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

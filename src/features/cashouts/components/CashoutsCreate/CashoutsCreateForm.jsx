import {useEffect, useMemo, useState, useCallback} from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import {useWallet} from '@/features/wallets/stores/WalletProvider'
import {toast} from 'react-toastify'
import {requestCashout} from '../../api'
import {useIntl} from 'react-intl'
import {useAccount} from '@/providers/AccountProvider'
import {useCashoutsListQueryContext} from '../../stores/CashoutsListQueryProvider'
import {useCashouts} from '../../stores/CashoutsProvider'
import {useModalContext} from '@/components/elements/Modal/CustomModal'
import InputField from '@/components/elements/Input/InputField'
import InputGroupField from '@/components/elements/Input/InputGroupField'
import DependentInputGroupField from '@/components/elements/Input/DependentInputGroupField'
import SelectField from '@/components/elements/Input/SelectField'
import TextAreaField from '@/components/elements/Input/TextAreaField'
import {arrayObjectToSelectOptions, arrayToSelectOptions} from '@/utils/arrayToSelectOptions'
import cashoutSchema from '../../models/cashoutSchema'
import cashoutFormModel from '../../models/cashoutFormModel'
import cashoutInitialValues from '../../models/cashoutInitialValues'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {CustomSVG} from '@/components/elements/SVG/CustomSVG'

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
  {
    value: 'GC_WALLET',
    label: 'Gift Certificate Wallet',
  },
]

export const CashoutsCreateForm = () => {
  const intl = useIntl()
  const {toggleModal} = useModalContext()
  const {wallets} = useWallet()
  const {refetch} = useCashoutsListQueryContext()
  const {currentAccount} = useAccount()
  const {cashout, cashoutMethods, accountCashoutMethods, cashoutTotalFee, cashoutSchedules} =
    useCashouts()
  const [initialCashout, setInitialCashout] = useState(cashoutInitialValues)
  const [cashoutMethodsOptions, setCashoutMethodsOptions] = useState([])
  const [accountCashoutMethodsOptions, setAccountCashoutMethodsOptions] = useState([])
  const swal = withReactContent(Swal)

  const {
    formId,
    formField: {
      activityAmount,
      activityAdminFee,
      activityTotalAmount,
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

  const computeTotalAmount = (props) => {
    const totalActivityAmount = props * ((100 - cashoutTotalFee) / 100)
    return totalActivityAmount
  }

  useEffect(() => {
    if (currentAccount) {
      setInitialCashout((prevState) => {
        return {...prevState, accountId: currentAccount.accountId}
      })
    }
  }, [currentAccount])

  useEffect(() => {
    if (cashoutTotalFee) {
      setInitialCashout((prevState) => {
        return {...prevState, activityAdminFee: cashoutTotalFee}
      })
    }
  }, [cashoutTotalFee])

  useEffect(() => {
    if (cashout) {
      setInitialCashout((prevState) => {
        return {...prevState, ...cashout}
      })
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

  const submitForm = async (values, actions) => {
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
    <>
      <div className='notice d-flex align-items-center bg-light-warning rounded border-warning border border-dashed mb-4 p-2'>
        <CustomSVG
          path='/media/icons/general/exclamation.svg'
          className='svg-icon svg-icon-1 svg-icon-primary me-2 ms-2'
        />
        <div className='d-flex flex-stack flex-grow-1'>
          <div className='fw-semibold lh-sm'>
            {cashoutSchedules ? (
              cashoutSchedules.map((schedule) => {
                return Object.keys(schedule).map((key) => {
                  return (
                    <div className='text-gray-700 fw-bold' key={key}>
                      {intl.formatMessage({id: key}) + ` ` + schedule[key]}
                    </div>
                  )
                })
              })
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <Formik
        enableReinitialize
        validateOnChange={false}
        validationSchema={cashoutSchema}
        initialValues={initialCashout}
        onSubmit={submitForm}
      >
        {(actions) => (
          <Form id={formId}>
            <div className='d-flex flex-column scroll-y me-n7 pe-4'>
              <div className='row mb-5'>
                <div className='col-md-6'>
                  <SelectField
                    name={wallet.name}
                    label={wallet.label}
                    data={cashoutWallets}
                    required
                  />
                </div>
                <div className='col-md-6'>
                  <InputGroupField
                    name={activityAmount.name}
                    label={activityAmount.label}
                    labelPrepend='₱'
                  />
                </div>
              </div>
              <div className='row mb-5'>
                <div className='col-md-6'>
                  <InputGroupField
                    name={activityAdminFee.name}
                    label={activityAdminFee.label}
                    labelAppend='%'
                    disabled
                  />
                  <div className='text-muted fs-7'>Admin Fee is required per Cashout</div>
                </div>
                <div className='col-md-6'>
                  <DependentInputGroupField
                    name={activityTotalAmount.name}
                    label={activityTotalAmount.label}
                    fetch={computeTotalAmount}
                    dependency={activityAmount.name}
                    labelPrepend='₱'
                    disabled
                  />
                  <div className='text-muted fs-7'>Total Cashout Amount deducted by Admin Fee</div>
                </div>
              </div>
              <div className='row mb-5'>
                <div className='col-12'>
                  <TextAreaField name={note.name} label={note.label} />
                </div>
              </div>
              <div className='row mb-5'>
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
              <div className='row mb-5'>
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
              <div className='row mb-5'>
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
                onClick={() => cancel()}
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
    </>
  )
}

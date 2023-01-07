import {useEffect, useState} from 'react'
import {Formik, Form} from 'formik'
import {useIntl} from 'react-intl'
import {useAccount} from '@/providers/AccountProvider'
import {useCashouts} from '@/features/cashouts/stores/CashoutsProvider'
import requestCashoutSchema from '@/features/cashouts/models/requestCashoutSchema'
import cashoutFormModel from '@/features/cashouts/models/cashoutFormModel'
import cashoutInitialValues from '@/features/cashouts/models/cashoutInitialValues'
import FloatingInputField from '@/components/elements/Input/Floating/FloatingInputField'
import FloatingSelectField from '@/components/elements/Input/Floating/FloatingSelectField'
import {CashoutsCreateModal} from '@/features/cashouts/components/CashoutsCreate/CashoutsCreateModal'
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
]

export const RequestCashout = () => {
  const intl = useIntl()
  const {setCashout, cashoutSchedules, cashoutTotalFee} = useCashouts()
  const {currentAccount} = useAccount()
  const [initialCashout, setInitialCashout] = useState(cashoutInitialValues)
  const [isModalOpen, setIsModalOpen] = useState(false)

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

  const {
    formField: {
      activityAmount,
      wallet,
      note,
      cashoutMethod: {accountName, accountNumber, method, others},
    },
  } = cashoutFormModel

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  const submitForm = async (values, actions) => {
    setCashout(values)
    toggleModal()
  }

  return (
    <div className='card h-xl-100'>
      <div className='card-body'>
        <div className='notice d-flex align-items-center bg-light-warning rounded border-warning border border-dashed mb-4 p-2'>
          <CustomSVG
            path='/public/media/icons/general/exclamation.svg'
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
          validateOnMount={false}
          validationSchema={requestCashoutSchema}
          initialValues={initialCashout}
          onSubmit={submitForm}
        >
          {(actions) => (
            <Form>
              <div className='row mb-5'>
                <div className='col-12'>
                  <FloatingSelectField
                    id={wallet.name}
                    name={wallet.name}
                    label={wallet.label}
                    data={cashoutWallets}
                    required
                  />
                </div>
              </div>
              <div className='row mb-5'>
                <div className='col-12'>
                  <FloatingInputField
                    id={activityAmount.name}
                    name={activityAmount.name}
                    label={activityAmount.label}
                    required
                  />
                </div>
              </div>
              <div className='d-flex align-items-end'>
                <button
                  type='submit'
                  className='btn btn-primary fs-4 w-100'
                  disabled={actions.isSubmitting || !actions.isValid || !actions.touched}
                >
                  <span className='indicator-label'>Create Cashout</span>
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
      </div>
      {isModalOpen && <CashoutsCreateModal isModalOpen={isModalOpen} toggleModal={toggleModal} />}
    </div>
  )
}

import {useEffect, useState} from 'react'
import {Formik, Form} from 'formik'
import {useAccount} from '@/providers/AccountProvider'
import {useCashouts} from '@/features/cashouts/stores/CashoutsProvider'
import requestCashoutSchema from '@/features/cashouts/models/requestCashoutSchema'
import cashoutFormModel from '@/features/cashouts/models/cashoutFormModel'
import cashoutInitialValues from '@/features/cashouts/models/cashoutInitialValues'
import FloatingInputField from '@/components/elements/Input/Floating/FloatingInputField'
import FloatingSelectField from '@/components/elements/Input/Floating/FloatingSelectField'
import {CashoutsCreate} from '@/features/cashouts/components/CashoutsCreate/CashoutsCreate'

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
  const {setCashout} = useCashouts()
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

  const submitStep = async (values, actions) => {
    setCashout(values)
    toggleModal()
  }

  return (
    <div className='card h-xl-100'>
      <div className='card-body'>
        <Formik
          enableReinitialize
          validateOnChange={false}
          validateOnMount={false}
          validateOnBlur={false}
          validationSchema={requestCashoutSchema}
          initialValues={initialCashout}
          onSubmit={submitStep}
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
                  className='btn btn-primary  fs-3 w-100'
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
      {isModalOpen && <CashoutsCreate isModalOpen={isModalOpen} toggleModal={toggleModal} />}
    </div>
  )
}

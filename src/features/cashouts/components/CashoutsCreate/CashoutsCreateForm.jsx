import {useEffect, useMemo, useState} from 'react'
import {string, object, boolean, number, array, ref, date} from 'yup'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import {useWallet} from '@/features/wallets/store/WalletProvider'
import {toast} from 'react-toastify'
import {requestCashout} from '../../api'
import {useAccount} from '@/providers/AccountProvider'
import {useCashoutsListQueryContext} from '../CashoutsList/CashoutsListQueryProvider'

const cashoutSchema = object().shape({
  activityAmount: number().required().label('Amount'),
  wallet: string().required().label('Wallet'),
  note: string().label('Note'),
})

export const CashoutsCreateForm = ({handleClick}) => {
  const {wallets} = useWallet()
  const {refetch} = useCashoutsListQueryContext()
  const {currentAccount} = useAccount()

  const cancel = (withRefresh) => {
    if (withRefresh) {
      refetch()
    }
    handleClick()
  }

  const [initialCashout, setInitialCashout] = useState({
    accountId: currentAccount.accountId,
    activityAmount: 0,
    wallet: '',
    note: '',
  })

  return (
    <Formik
      validateOnChange={false}
      validateOnBlur={true}
      validationSchema={cashoutSchema}
      initialValues={initialCashout}
      onSubmit={async (values, {setSubmitting}) => {
        setSubmitting(true)
        try {
          const {data: response} = await requestCashout(values)
          toast.success(response.message)
        } catch (ex) {
          toast.error(ex.message)
        } finally {
          setSubmitting(true)
          cancel(true)
        }
      }}
    >
      {(actions) => (
        <Form>
          <div className='row gx-10 mb-5'>
            <div className='col-lg-12'>
              <div className='mb-5'>
                <Field
                  type='number'
                  className='form-control form-control-solid'
                  placeholder='Amount'
                  name='activityAmount'
                />
                <div className='text-danger mt-2'>
                  <ErrorMessage name='activityAmount' />
                </div>
              </div>
              <div className='mb-5'>
                <Field
                  as='select'
                  className='form-select form-control form-control-solid'
                  name='wallet'
                >
                  <option>Select Wallet</option>
                  <option value='B_WALLET'>Binary Wallet</option>
                  <option value='F_WALLET'>Franchise Wallet</option>
                </Field>
                <div className='text-danger mt-2'>
                  <ErrorMessage name='wallet' />
                </div>
              </div>
              <div className='mb-5'>
                <Field
                  className='form-control form-control-solid'
                  rows={3}
                  placeholder='Payment Details? Method?'
                  name='note'
                />
                <div className='text-danger mt-2'>
                  <ErrorMessage name='note' />
                </div>
              </div>
            </div>
          </div>
          <div className='d-flex align-items-stretch justify-content-between pt-15'>
            <button
              type='reset'
              onClick={() => handleClick()}
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

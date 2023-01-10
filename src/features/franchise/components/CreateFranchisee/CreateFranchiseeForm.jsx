import {useVerificationContext} from '../../stores/VerificationProvider'
import {Formik, Form} from 'formik'
import {useAccount} from '@/providers/AccountProvider'
import clsx from 'clsx'
import {useIntl} from 'react-intl'
import {useModalContext} from '@/components/elements/Modal/CustomModal'
import {CustomSVG} from '@/components/elements/SVG/CustomSVG'
import InputField from '@/components/elements/Input/InputField'
import SelectField from '@/components/elements/Input/SelectField'
import franchiseeCreateSchema from '../../models/Registration/franchiseeCreateSchema'
import franchiseeCreateFormModel from '../../models/Registration/franchiseeCreateFormModel'
import franchiseeCreateInitialValues from '../../models/Registration/franchiseeCreateInitialValues'
import {toCurrency} from '@/utils/toCurrency'
import {toast} from 'react-toastify'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {useEffect, useState} from 'react'
import {createFranchisee} from '../../api'
import {useStateProviderContext} from '@/providers/StateProvider'

const genders = [
  {
    value: null,
    label: 'Select Gender',
  },
  {
    value: 'MALE',
    label: 'Male',
  },
  {
    value: 'FEMALE',
    label: 'Female',
  },
]

export const CreateFranchiseeForm = () => {
  const {refresh} = useStateProviderContext()
  const {toggleModal} = useModalContext()
  const intl = useIntl()
  const {packagePlan, activationCode} = useVerificationContext()
  const swal = withReactContent(Swal)
  const {currentAccount} = useAccount()
  const [initialFranchisee, setInitialFranchisee] = useState(franchiseeCreateInitialValues)
  const {
    formId,
    formField: {
      sponsorAccountId,
      sponsorAccountName,
      firstName,
      middleName,
      lastName,
      gender,
      contactNumber,
      emailAddress,
      street,
      city,
      state,
    },
  } = franchiseeCreateFormModel

  useEffect(() => {
    if (currentAccount) {
      setInitialFranchisee((prevState) => {
        return {...prevState, sponsorAccountId: currentAccount.accountNumber}
      })
    }
  }, [currentAccount])

  useEffect(() => {
    if (activationCode) {
      setInitialFranchisee((prevState) => {
        return {...prevState, activationCode: activationCode}
      })
    }
  }, [activationCode])

  const refreshPage = () => {
    refresh()
    toggleModal()
  }

  const submitForm = async (values, actions) => {
    swal
      .fire({
        title: 'Register Franchisee?',
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
            const {data: response} = await createFranchisee(values)
            swal.fire('Franchisee Registered!', 'Franchisee has been registered', 'success')
            toast.success(response.message)
          } catch (ex) {
            toast.error(ex.message)
          } finally {
            actions.setSubmitting(true)
            refreshPage()
          }
        }
      })
  }

  return (
    <Formik
      enableReinitialize
      validateOnChange={false}
      validationSchema={franchiseeCreateSchema}
      initialValues={initialFranchisee}
      onSubmit={submitForm}
    >
      {(actions) => {
        return (
          <Form id={formId}>
            <div className='notice d-flex bg-light-warning rounded border-warning border border-dashed mb-9 p-6'>
              <CustomSVG
                path='/media/icons/ecommerce/cart.svg'
                className='svg-icon svg-icon-2tx svg-icon-warning me-6'
              />
              <div className='d-flex flex-stack flex-grow-1'>
                <div className='fw-semibold'>
                  <div className='d-flex align-items-center mb-2'>
                    <h4 className='text-gray-900 fw-bold'>{packagePlan.packageName}</h4>
                    {packagePlan.codeType ? (
                      <span className='badge badge-light-warning badge-lg mt-n2 mx-2'>
                        {intl.formatMessage({id: packagePlan.codeType})}
                      </span>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className='fs-6 text-gray-800'>{toCurrency(packagePlan.packageAmount)}</div>
                </div>
              </div>
            </div>
            <div className='row g-9 mb-5'>
              <div className='col-md-4'>
                <InputField name={firstName.name} label={firstName.label} />
              </div>
              <div className='col-md-4'>
                <InputField name={lastName.name} label={lastName.label} />
              </div>
              <div className='col-md-4'>
                <InputField name={middleName.name} label={middleName.label} />
              </div>
            </div>
            <div className='row g-9 mb-5'>
              <div className='col-md-4'>
                <SelectField name={gender.name} label={gender.label} data={genders} required />
              </div>
              <div className='col-md-4'>
                <InputField name={contactNumber.name} label={contactNumber.label} />
              </div>
              <div className='col-md-4'>
                <InputField name={emailAddress.name} label={emailAddress.label} />
              </div>
            </div>
            <div className='row g-9 mb-5'>
              <div className='col-md-12'>
                <InputField name={street.name} label={street.label} />
              </div>
            </div>
            <div className='row g-9 mb-5'>
              <div className='col-md-6'>
                <InputField name={city.name} label={city.label} />
              </div>
              <div className='col-md-6'>
                <InputField name={state.name} label={state.label} />
              </div>
            </div>
            <div className='d-flex align-items-stretch justify-content-between pt-10'>
              <button
                type='reset'
                onClick={() => refreshPage()}
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
                <span className='indicator-label'>Register</span>
                {actions.isSubmitting && (
                  <span className='indicator-progress'>
                    Please wait...{' '}
                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                  </span>
                )}
              </button>
            </div>
          </Form>
        )
      }}
    </Formik>
  )
}

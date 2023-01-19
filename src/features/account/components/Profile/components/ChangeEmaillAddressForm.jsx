import {useEffect, useState} from 'react'
import clsx from 'clsx'
import {Formik, Form} from 'formik'
import {toast} from 'react-toastify'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {useStateProviderContext} from '@/providers/StateProvider'
import {useAuth} from '@/providers/AuthProvider'
import InputField from '@/components/elements/Input/InputField'
import PasswordField from '@/components/elements/Input/PasswordField'
import {changeEmailAddress} from '@/features/account/api'

import profileFormModel from '@/features/account/models/Profile/profileFormModel'
import changeEmailAddressSchema from '@/features/account/models/Profile/changeEmailAddressSchema'

export const ChangeEmailAddressForm = () => {
  const {currentUser, logout} = useAuth()
  const {refresh} = useStateProviderContext()
  const swal = withReactContent(Swal)

  const {
    formField: {
      user: {emailAddress, confirmPassword},
    },
  } = profileFormModel

  const [initialEmailAddress, setInitialEmailAddress] = useState({
    user: {
      emailAddress: '',
      confirmPassword: '',
    },
  })

  const [editEmailAddress, setEditEmailAddress] = useState(false)
  const handleClickEditEmailAddress = () => [setEditEmailAddress(!editEmailAddress)]

  const submit = async (values, actions) => {
    actions.setSubmitting(true)
    try {
      const {data: response} = await changeEmailAddress(values.user)
      swal.fire('Email Address updated!', response.message, 'success')
    } catch (ex) {
      toast.error(ex.response.data.message)
    } finally {
      actions.setSubmitting(true)
      actions.resetForm()
      handleClickEditEmailAddress()
      refresh()
    }
  }

  useEffect(() => {
    const {user} = initialEmailAddress
    user.emailAddress = currentUser.emailAddress
    setInitialEmailAddress({user})
  }, [currentUser])

  return (
    <div className='d-flex flex-wrap align-items-center'>
      <div
        className={clsx({
          'd-none': editEmailAddress == true,
        })}
      >
        <div className='fs-6 fw-bold mb-1'>Email Address</div>
        <div className='fw-semibold text-gray-600'>{currentUser?.emailAddress}</div>
      </div>
      <div
        className={clsx('flex-row-fluid', {
          'd-none': editEmailAddress == false,
        })}
      >
        <Formik
          enableReinitialize
          validateOnChange={false}
          validationSchema={changeEmailAddressSchema}
          initialValues={initialEmailAddress}
          onSubmit={submit}
        >
          {(actions) => (
            <Form className='form'>
              <div className='row mb-6'>
                <div className='col-lg-6 mb-4 mb-lg-0'>
                  <InputField name={emailAddress.name} label={emailAddress.label} required />
                </div>
                <div className='col-lg-6'>
                  <PasswordField
                    name={confirmPassword.name}
                    label={confirmPassword.label}
                    required
                  />
                </div>
              </div>
              <div className='d-flex'>
                <button
                  type='submit'
                  className='btn btn-primary  me-2 px-6'
                  disabled={actions.isSubmitting || !actions.isValid}
                >
                  {!actions.isSubmitting && (
                    <span className='indicator-label'>Update Email Address</span>
                  )}
                  {actions.isSubmitting && (
                    <span className='indicator-progress' style={{display: 'block'}}>
                      Please wait...
                      <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                    </span>
                  )}
                </button>
                <button
                  type='button'
                  className='btn btn-color-gray-400 btn-active-light-primary px-6'
                  onClick={handleClickEditEmailAddress}
                >
                  Cancel
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <div
        className={clsx('ms-auto', {
          'd-none': editEmailAddress == true,
        })}
      >
        <button
          className='btn btn-light btn-active-light-primary'
          onClick={handleClickEditEmailAddress}
        >
          Change Email Address
        </button>
      </div>
    </div>
  )
}

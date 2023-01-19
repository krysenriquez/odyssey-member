import {useEffect, useState} from 'react'
import clsx from 'clsx'
import {Formik, Form} from 'formik'
import {toast} from 'react-toastify'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {useStateProviderContext} from '@/providers/StateProvider'
import {useAuth} from '@/providers/AuthProvider'
import PasswordField from '@/components/elements/Input/PasswordField'
import {changePassword} from '@/features/account/api'

import profileFormModel from '@/features/account/models/Profile/profileFormModel'
import changePasswordSchema from '@/features/account/models/Profile/changePasswordSchema'

export const ChangePasswordForm = () => {
  const {logout} = useAuth()
  const {refresh} = useStateProviderContext()
  const swal = withReactContent(Swal)

  const {
    formField: {
      user: {currentPassword, newPassword, confirmNewPassword},
    },
  } = profileFormModel

  const [initialPassword, setInitialPassword] = useState({
    user: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  })

  const [editPassword, setEditPassword] = useState(false)
  const handleClickEditPassword = () => [setEditPassword(!editPassword)]

  const submit = async (values, actions) => {
    actions.setSubmitting(true)
    try {
      const {data: response} = await changePassword(values.user)
      swal.fire('Password Updated!', response.message, 'success')
    } catch (ex) {
      toast.error(ex.response.data.message)
    } finally {
      actions.setSubmitting(true)
      actions.resetForm()
      handleClickEditPassword()
      refresh()
    }
  }

  return (
    <div className='d-flex flex-wrap align-items-center'>
      <div
        className={clsx({
          'd-none': editPassword == true,
        })}
      >
        <div className='fs-6 fw-bold mb-1'>Password</div>
        <div className='fw-semibold text-gray-600'>************</div>
      </div>
      <div
        className={clsx('flex-row-fluid', {
          'd-none': editPassword == false,
        })}
      >
        <Formik
          enableReinitialize
          validateOnChange={false}
          validationSchema={changePasswordSchema}
          initialValues={initialPassword}
          onSubmit={submit}
        >
          {(actions) => (
            <Form className='form'>
              <div className='row mb-6'>
                <div className='col-lg-4 mb-4 mb-lg-0'>
                  <PasswordField
                    name={currentPassword.name}
                    label={currentPassword.label}
                    required
                  />
                </div>
                <div className='col-lg-4 mb-4 mb-lg-0'>
                  <PasswordField name={newPassword.name} label={newPassword.label} required />
                </div>
                <div className='col-lg-4 mb-4 mb-lg-0'>
                  <PasswordField
                    name={confirmNewPassword.name}
                    label={confirmNewPassword.label}
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
                    <span className='indicator-label'>Update Password</span>
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
                  onClick={handleClickEditPassword}
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
          'd-none': editPassword == true,
        })}
      >
        <button
          className='btn btn-light btn-active-light-primary'
          onClick={handleClickEditPassword}
        >
          Change Password
        </button>
      </div>
    </div>
  )
}

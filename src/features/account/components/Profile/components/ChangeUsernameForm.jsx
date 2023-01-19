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
import {changeUsername} from '@/features/account/api'

import profileFormModel from '@/features/account/models/Profile/profileFormModel'
import changeUsernameSchema from '@/features/account/models/Profile/changeUsernameSchema'

export const ChangeUsernameForm = () => {
  const {currentUser, logout} = useAuth()
  const {refresh} = useStateProviderContext()
  const swal = withReactContent(Swal)

  const {
    formField: {
      user: {username, confirmPassword},
    },
  } = profileFormModel

  const [initialUsername, setInitialUsername] = useState({
    user: {
      username: '',
      confirmPassword: '',
    },
  })

  const [editUsername, setEditUsername] = useState(false)
  const handleClickEditUsername = () => [setEditUsername(!editUsername)]

  const submit = async (values, actions) => {
    actions.setSubmitting(true)
    try {
      const {data: response} = await changeUsername(values.user)
      swal.fire('Username Updated!', response.message, 'success')
    } catch (ex) {
      toast.error(ex.response.data.message)
    } finally {
      actions.setSubmitting(true)
      actions.resetForm()
      handleClickEditUsername()
      refresh()
    }
  }

  useEffect(() => {
    const {user} = initialUsername
    user.username = currentUser.username
    setInitialUsername({user})
  }, [currentUser])

  return (
    <div className='d-flex flex-wrap align-items-center'>
      <div
        className={clsx({
          'd-none': editUsername == true,
        })}
      >
        <div className='fs-6 fw-bold mb-1'>Username</div>
        <div className='fw-semibold text-gray-600'>{currentUser?.username}</div>
      </div>
      <div
        className={clsx('flex-row-fluid', {
          'd-none': editUsername == false,
        })}
      >
        <Formik
          enableReinitialize
          validateOnChange={false}
          validationSchema={changeUsernameSchema}
          initialValues={initialUsername}
          onSubmit={submit}
        >
          {(actions) => (
            <Form className='form'>
              <div className='row mb-6'>
                <div className='col-lg-6 mb-4 mb-lg-0'>
                  <InputField name={username.name} label={username.label} required />
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
                  className='btn btn-primary me-2 px-6'
                  disabled={actions.isSubmitting || !actions.isValid}
                >
                  {!actions.isSubmitting && (
                    <span className='indicator-label'>Update Username</span>
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
                  onClick={handleClickEditUsername}
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
          'd-none': editUsername == true,
        })}
      >
        <button
          className='btn btn-light btn-active-light-primary'
          onClick={handleClickEditUsername}
        >
          Change Username
        </button>
      </div>
    </div>
  )
}

import {useState, useRef} from 'react'
import clsx from 'clsx'
import {Field, ErrorMessage, useFormikContext} from 'formik'
import {verifyUsername, verifyEmailAddress} from '../../../api'

export const StepUser = () => {
  const formikProps = useFormikContext()
  const {setFieldValue, validateField, validateForm, getFieldProps, errors, touched} = formikProps
  const [showPassword, setShowPassword] = useState(false)
  const passwordRef = useRef(null)

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const validateUsername = async (value) => {
    var error
    await verifyUsername(value)
      .then((response) => {})
      .catch((err) => {
        error = err.response.data.message
      })
    return error
  }

  const validateEmailAddress = async (value) => {
    var error
    await verifyEmailAddress(value)
      .then((response) => {})
      .catch((err) => {
        error = err.response.data.message
      })
    return error
  }

  return (
    <div className='w-100'>
      <div className='mb-5 row fv-plugins-icon-container'>
        <div className='col-12'>
          <label className='form-label mb-3'>
            <span className='required'>Username</span>
          </label>
          <Field
            type='text'
            className='form-control form-control-solid'
            name='user.username'
            validate={validateUsername}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='user.username' />
          </div>
        </div>
      </div>
      <div className='mb-5 row fv-plugins-icon-container'>
        <div className='col-12'>
          <label className='form-label mb-3'>
            <span className='required'>Email Address</span>
          </label>
          <Field
            type='text'
            className='form-control form-control-solid'
            name='user.emailAddress'
            validate={validateEmailAddress}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='user.emailAddress' />
          </div>
        </div>
      </div>
      <div className='mb-5 row fv-plugins-icon-container'>
        <div className='col-12'>
          <label className='form-label mb-3'>
            <span className='required'>Password</span>
          </label>
          <div className='position-relative mb-3'>
            <Field
              className='form-control form-control-solid'
              type={showPassword ? 'text' : 'password'}
              name='user.password'
            />
            <span
              className='btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2'
              onClick={handleClickShowPassword}
            >
              <i
                className={clsx('bi fs-2', {
                  'bi-eye-slash': !showPassword,
                  'bi bi-eye': showPassword,
                })}
              ></i>
            </span>
          </div>
          <div className='text-danger mt-2'>
            <ErrorMessage name='user.password' />
          </div>
        </div>
      </div>
      <div className='mb-5 row fv-plugins-icon-container'>
        <div className='col-12'>
          <label className='form-label mb-3'>
            <span className='required'>Repeat Password</span>
          </label>
          <Field
            type='password'
            className='form-control form-control-solid'
            name='user.repeatPassword'
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='user.repeatPassword' />
          </div>
        </div>
      </div>
    </div>
  )
}

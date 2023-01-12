import {useState} from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {useFormik} from 'formik'
import {useIntl} from 'react-intl'
import {getUserByToken, login} from '../api'
import {useAuth} from '@/providers/AuthProvider'
import {toast} from 'react-toastify'
import {TermsAndConditionsModal} from './TermsAndConditionsModal'

const loginSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Username is required'),
  password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
  toc: Yup.boolean()
    .required('Must agree to Terms and Conditions')
    .oneOf([true], 'Must agree to Terms and Conditions'),
})

const initialValues = {
  username: '',
  password: '',
  toc: false,
}

export const LoginForm = () => {
  const intl = useIntl()
  const [loading, setLoading] = useState(false)
  const {saveAuth, setCurrentUser} = useAuth()
  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      setLoading(true)
      try {
        const {data: auth} = await login(values.username, values.password)
        saveAuth(auth)
        const {data: user} = await getUserByToken(auth.access)
        setCurrentUser(user)
        toast.success('Login Success!')
      } catch (error) {
        saveAuth(undefined)
        setStatus('The login detail is incorrect')
        setSubmitting(false)
        setLoading(false)
        toast.error('Login Failed!')
        formik.resetForm()
      }
    },
  })
  const [isModalOpen, setIsModalOpen] = useState(false)

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  return (
    <>
      <form className='form w-100' onSubmit={formik.handleSubmit} noValidate id='login_form'>
        <div className='text-center mb-10'>
          <h1 className='text-dark mb-3'>{intl.formatMessage({id: 'LOGIN.HEADER'})}</h1>
        </div>
        <div className='fv-row mb-10'>
          <label className='form-label fs-6 fw-bolder text-dark'>Username</label>
          <input
            placeholder='Username'
            {...formik.getFieldProps('username')}
            className={clsx(
              'form-control form-control-lg form-control-solid',
              {'is-invalid': formik.touched.username && formik.errors.username},
              {
                'is-valid': formik.touched.username && !formik.errors.username,
              }
            )}
            type='text'
            name='username'
            autoComplete='off'
          />
          {formik.touched.username && formik.errors.username && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.username}</span>
              </div>
            </div>
          )}
        </div>
        <div className='fv-row mb-2'>
          <div className='d-flex justify-content-between mt-n5'>
            <div className='d-flex flex-stack mb-2'>
              <label className='form-label fw-bolder text-dark fs-6 mb-0'>Password</label>
            </div>
          </div>
          <input
            type='password'
            autoComplete='off'
            {...formik.getFieldProps('password')}
            className={clsx(
              'form-control form-control-lg form-control-solid',
              {
                'is-invalid': formik.touched.password && formik.errors.password,
              },
              {
                'is-valid': formik.touched.password && !formik.errors.password,
              }
            )}
          />
          {formik.touched.password && formik.errors.password && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.password}</span>
              </div>
            </div>
          )}
        </div>
        <div className='d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8'>
          <div></div>
          <Link
            to='/auth/forgot-password'
            className='link-primary fs-6 fw-bolder'
            style={{marginLeft: '5px'}}
          >
            Forgot Password ?
          </Link>
        </div>
        <div className='fv-row mb-8 fv-plugins-icon-container fv-plugins-bootstrap5-row-valid'>
          <label className='form-check form-check-inline'>
            <input
              className='form-check-input'
              type='checkbox'
              name='toc'
              checked={formik.values.toc}
              {...formik.getFieldProps('toc')}
            />
            <span className='form-check-label fw-semibold text-gray-700 fs-base ms-1'>
              I Accept the
              <a href='#' className='ms-1 link-primary' onClick={toggleModal}>
                Terms and Conditions
              </a>
            </span>
          </label>
          {formik.touched.toc && formik.errors.toc && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.toc}</span>
              </div>
            </div>
          )}
        </div>
        <div className='fv-row mb-10'></div>
        <div className='text-center mb-10'>
          <button
            type='submit'
            id='kt_sign_in_submit'
            className='btn btn-lg btn-primary w-100'
            disabled={formik.isSubmitting || !formik.isValid}
          >
            {!loading && <span className='indicator-label'>Continue</span>}
            {loading && (
              <span className='indicator-progress' style={{display: 'block'}}>
                Please wait...
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
        </div>
      </form>
      {isModalOpen && (
        <TermsAndConditionsModal isModalOpen={isModalOpen} toggleModal={toggleModal} />
      )}
    </>
  )
}

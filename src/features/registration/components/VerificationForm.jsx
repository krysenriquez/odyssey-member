import {useState, useRef} from 'react'
import {Field, ErrorMessage, Formik, Form} from 'formik'
import * as Yup from 'yup'
import humps from 'humps'
import InputMask from 'react-input-mask'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {verifycode} from '../api'
import {useVerificationContext} from './VerificationProvider'

const activationCodeSchema = Yup.object().shape({
  activationCode: Yup.string()
    .required()
    .label('Activation Code')
    .test('len', 'Minimum 15 characters', (val) => {
      if (val) {
        const valWithoutMask = val.replace(/-|_/g, '').length
        return valWithoutMask === 15
      }
    }),
})

export const VerificationForm = () => {
  const {setVerified, setPackagePlan} = useVerificationContext()

  const submitRef = useRef(null)
  const swal = withReactContent(Swal)
  const [activationCode, setActivationCode] = useState({
    activationCode: 'A2O4VZIWOL3OCW3',
  })

  return (
    <Formik
      validationSchema={activationCodeSchema}
      initialValues={activationCode}
      onSubmit={async (values, actions) => {
        values.activationCode = values.activationCode.replace(/-|_/g, '')
        submitRef.current?.setAttribute('data-indicator', 'on')
        actions.setSubmitting(true)
        try {
          const {data: response} = await verifycode(values)
          actions.resetForm()
          swal.fire('Code Verified', response.message, 'success').then((result) => {
            if (result.value) {
              setVerified(true)
              setPackagePlan(response.package)
            }
          })
        } catch (error) {
          actions.setStatus('The login detail is incorrect')
          actions.setSubmitting(false)
          actions.resetForm()
          swal.fire('Invalid Code', error.response.data.message, 'error').then((result) => {
            setVerified(false)
          })
        }
        submitRef.current?.removeAttribute('data-indicator')
      }}
    >
      {({isSubmitting, isValid, touched}) => {
        return (
          <Form className='form w-100 mb-13'>
            <div className='text-center mb-10'>
              <h1 className='text-dark mb-3'>Code Verification</h1>
              <div className='text-muted fw-semibold fs-5 mb-5'>
                Enter the activation code provided to you
              </div>
            </div>
            <div className='mb-10'>
              <div className='mb-7'>
                <label className='d-flex align-items-center fs-6 form-label mb-2 fw-bold text-start text-dark ms-1'>
                  <span className='required'>Type your 15 character verification code</span>
                </label>
                <Field
                  as={InputMask}
                  mask='*****-*****-*****'
                  placeholder='XXXXX-XXXXX-XXXXX'
                  className='form-control form-control-solid'
                  name='activationCode'
                />
                <div className='text-danger mt-2'>
                  <ErrorMessage name='activationCode' />
                </div>
              </div>
            </div>
            <div className='d-flex flex-center'>
              <button
                ref={submitRef}
                type='submit'
                className='btn btn-lg btn-primary fw-bold'
                disabled={isSubmitting || !isValid || !touched}
              >
                {!isSubmitting && <span className='indicator-label'>Submit</span>}
                {isSubmitting && (
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

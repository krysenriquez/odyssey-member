import {Field, ErrorMessage, Form} from 'formik'
import InputMask from 'react-input-mask'

export const ActivationCodeForm = (props) => {
  const {actions} = props

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
          type='submit'
          className='btn btn-lg btn-primary fw-bold'
          disabled={actions.isSubmitting || !actions.isValid || !actions.touched}
        >
          {!actions.isSubmitting && <span>Submit</span>}
          {actions.isSubmitting && (
            <span>
              Please wait...{' '}
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
      </div>
    </Form>
  )
}

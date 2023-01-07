import {useField} from 'formik'
import clsx from 'clsx'

export default function InputGroupField(props) {
  const {label, required, errorText, labelPrepend, labelAppend, ...rest} = props
  const [field, meta] = useField(props)
  const {touched, error, value} = meta
  const isError = touched && error && true
  const isValid = touched && !!!error && value

  function renderErrorMessage() {
    if (isError) {
      return error
    }
  }

  return (
    <>
      <label className='form-label mb-3'>
        <span className={clsx({required: required})}>{label}</span>
      </label>
      <div className='input-group input-group-solid '>
        {labelPrepend ? <span className='input-group-text'>{labelPrepend}</span> : <></>}
        <input
          type='text'
          className={clsx('form-control', {
            'is-invalid': isError,
            'is-valid': isValid,
          })}
          {...field}
          {...rest}
        />
        {labelAppend ? <span className='input-group-text'>{labelAppend}</span> : <></>}
      </div>

      <div className='fv-plugins-message-container'>
        <div className='fv-help-block'>
          <span role='alert'>{renderErrorMessage()}</span>
        </div>
      </div>
    </>
  )
}

import {useField} from 'formik'
import clsx from 'clsx'

export default function CheckboxField(props) {
  const {label, required, errorText, children, ...rest} = props
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
      <label className='form-check form-check-inline'>
        <input
          type='checkbox'
          className={clsx('form-check-input', {
            'is-invalid': isError,
            'is-valid': isValid,
          })}
          checked={field.value}
          {...field}
          {...rest}
        />
        {children}
      </label>
      <div className='fv-plugins-message-container'>
        <div className='fv-help-block'>
          <span role='alert'>{renderErrorMessage()}</span>
        </div>
      </div>
    </>
  )
}

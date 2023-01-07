import {useField, useFormikContext} from 'formik'
import clsx from 'clsx'
import {useEffect} from 'react'

export default function DependentInputGroupField(props) {
  const {setFieldValue} = useFormikContext()
  const {label, required, errorText, labelPrepend, labelAppend, fetch, dependency, ...rest} = props
  const [field, meta] = useField(props)
  const {touched, error, value} = meta
  const isError = touched && error && true
  const isValid = touched && !!!error && value

  const [dependencyField, dependencyMeta] = useField(dependency)

  useEffect(() => {
    const response = fetch(dependencyField.value)
    setFieldValue(props.name, response)
  }, [dependencyField.value])

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

import {Field, ErrorMessage, useFormikContext} from 'formik'
import {useEffect} from 'react'
import {verifyParentAccountNumber, verifySponsorAccountNumber, verifyParentSide} from '../../../api'

const cacheTest = (asyncValidate) => {
  let _valid = false
  let _value = ''

  return async (value) => {
    if (value !== _value) {
      const response = await asyncValidate(value)
      _value = value
      _valid = response
      return response
    }
    return _valid
  }
}

export const StepGenealogy = () => {
  const formikProps = useFormikContext()
  const {setFieldValue, getFieldProps, setErrors, errors, touched, isValidating} = formikProps

  const validateSponsorAccountNumber = async () => {
    const sponsorAccountId = getFieldProps('sponsorAccountId').value
    var error
    await verifySponsorAccountNumber(sponsorAccountId)
      .then((response) => {
        setFieldValue('sponsorAccountName', response.data.account)
      })
      .catch((err) => {
        setFieldValue('sponsorAccountName', [])
        error = err.response.data.message
      })
    return error
  }

  const validateParentAccountNumber = async () => {
    const parentAccountId = getFieldProps('parentAccountId').value
    var error
    await verifyParentAccountNumber(parentAccountId)
      .then((response) => {
        setFieldValue('parentAccountName', response.data.account)
      })
      .catch((err) => {
        setFieldValue('parentAccountName', [])
        error = err.response.data.message
      })
    return error
  }

  const validateParentSide = async () => {
    const parentSide = getFieldProps('parentSide').value
    const parentAccountId = getFieldProps('parentAccountId').value
    var error
    await verifyParentSide(parentAccountId, parentSide)
      .then((response) => {})
      .catch((err) => {
        error = err.response.data.message
      })
    return error
  }

  useEffect(() => {
    if (isValidating == true) {
      validateSponsorAccountNumber().then((res) => {
        setErrors({sponsorAccountId: res})
      })
      validateParentAccountNumber().then((res) => {
        setErrors({parentAccountId: res})
      })
      validateParentSide().then((res) => {
        setErrors({parentSide: res})
      })
    }
  }, [isValidating])

  return (
    <div className='w-100'>
      <div className='mb-10 row fv-plugins-icon-container'>
        <div className='col-6'>
          <label className='form-label mb-3'>
            <span className='required'>Sponsor ID</span>
          </label>
          <Field
            type='tel'
            className='form-control form-control-solid'
            pattern='^-?[0-9]\d*\.?\d*$'
            name='sponsorAccountId'
          />
          {errors.sponsorAccountId && touched.sponsorAccountId && (
            <div className='text-danger mt-2'>
              <ErrorMessage name='sponsorAccountId' />
            </div>
          )}
        </div>
        <div className='col-6'>
          <label className='form-label mb-3'>
            <span className='required'>Sponsor Name</span>
          </label>
          <Field
            type='tel'
            className='form-control form-control-solid'
            pattern='^-?[0-9]\d*\.?\d*$'
            name='sponsorAccountName'
            disabled
          />
        </div>
      </div>
      <div className='mb-10 row fv-plugins-icon-container'>
        <div className='col-6'>
          <label className='form-label mb-3'>
            <span className='required'>Parent ID</span>
          </label>
          <Field
            type='tel'
            className='form-control form-control-solid'
            pattern='^-?[0-9]\d*\.?\d*$'
            name='parentAccountId'
          />
          {errors.parentAccountId && touched.parentAccountId && (
            <div className='text-danger mt-2'>
              <ErrorMessage name='parentAccountId' />
            </div>
          )}
        </div>
        <div className='col-6'>
          <label className='form-label mb-3'>
            <span className='required'>Parent Name</span>
          </label>
          <Field
            type='tel'
            className='form-control form-control-solid'
            pattern='^-?[0-9]\d*\.?\d*$'
            name='parentAccountName'
            disabled
          />
        </div>
      </div>
      <div className='mb-10 row fv-plugins-icon-container'>
        <div className='col-12'>
          <label className='form-label mb-3'>
            <span className='required'>Parent Side</span>
          </label>
          <Field as='select' className='form-control form-control-solid' name='parentSide'>
            <option>Select Parent Side</option>
            <option value='LEFT'>Left</option>
            <option value='RIGHT'>Right</option>
          </Field>
          {errors.parentSide && touched.parentSide && (
            <div className='text-danger mt-2'>
              <ErrorMessage name='parentSide' />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

import {useEffect, useState} from 'react'
import DatePicker from 'react-datepicker'
import {Field, ErrorMessage, useFormikContext} from 'formik'
import {verifyAccountName} from '../../../api'
import {FormDatePicker} from '@/components/elements/Input/DatePicker'

export const StepPersonal = () => {
  const formikProps = useFormikContext()
  const {getFieldProps, setErrors, isValidating} = formikProps

  const validateAccountName = async () => {
    const firstName = getFieldProps('firstName').value
    const middleName = getFieldProps('middleName').value
    const lastName = getFieldProps('lastName').value
    const error = {}

    await verifyAccountName(firstName, middleName, lastName)
      .then((response) => {})
      .catch((err) => {
        error.firstName = err.response.data.message
        error.middleName = err.response.data.message
        error.lastName = err.response.data.message
      })

    return error
  }

  useEffect(() => {
    if (isValidating == true) {
      validateAccountName().then((res) => {
        setErrors(res)
      })
    }
  }, [isValidating])

  return (
    <div className='w-100'>
      <div className='mb-5 row fv-plugins-icon-container'>
        <div className='col-4'>
          <label className='form-label mb-3'>
            <span className='required'>First Name</span>
          </label>
          <Field type='text' className='form-control form-control-solid' name='firstName' />
          <div className='text-danger mt-2'>
            <ErrorMessage name='firstName' />
          </div>
        </div>
        <div className='col-4'>
          <label className='form-label mb-3'>
            <span className='required'>Middle Name</span>
          </label>
          <Field type='text' className='form-control form-control-solid' name='middleName' />
          <div className='text-danger mt-2'>
            <ErrorMessage name='middleName' />
          </div>
        </div>
        <div className='col-4'>
          <label className='form-label mb-3'>
            <span className='required'>Last Name</span>
          </label>
          <Field type='text' className='form-control form-control-solid' name='lastName' />
          <div className='text-danger mt-2'>
            <ErrorMessage name='lastName' />
          </div>
        </div>
      </div>
      <div className='mb-5 row fv-plugins-icon-container'>
        <div className='col-6'>
          <label className='form-label mb-3'>
            <span className='required'>Birthdate</span>
          </label>
          <FormDatePicker
            name='personalInfo.birthdate'
            className='form-control form-control-solid'
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='personalInfo.birthdate' />
          </div>
        </div>
        <div className='col-6'>
          <label className='form-label mb-3'>
            <span className='required'>Gender</span>
          </label>
          <Field as='select' className='form-control form-control-solid' name='personalInfo.gender'>
            <option>Select Gender</option>
            <option value='MALE'>Male</option>
            <option value='FEMALE'>Female</option>
          </Field>
          <div className='text-danger mt-2'>
            <ErrorMessage name='personalInfo.gender' />
          </div>
        </div>
      </div>
      <div className='mb-5 row fv-plugins-icon-container'>
        <div className='col-12'>
          <label className='form-label mb-3'>
            <span className='required'>Contact Number</span>
          </label>
          <Field
            type='text'
            className='form-control form-control-solid'
            name='contactInfo.contactNumber'
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='contactInfo.contactNumber' />
          </div>
        </div>
      </div>
      <div className='mb-5 row fv-plugins-icon-container'>
        <div className='col-4'>
          <label className='form-label mb-3'>
            <span className='required'>Street</span>
          </label>
          <Field
            type='text'
            className='form-control form-control-solid'
            name='addressInfo.street'
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='addressInfo.street' />
          </div>
        </div>
        <div className='col-4'>
          <label className='form-label mb-3'>
            <span className='required'>City</span>
          </label>
          <Field type='text' className='form-control form-control-solid' name='addressInfo.city' />
          <div className='text-danger mt-2'>
            <ErrorMessage name='addressInfo.city' />
          </div>
        </div>
        <div className='col-4'>
          <label className='form-label mb-3'>
            <span className='required'>Province</span>
          </label>
          <Field type='text' className='form-control form-control-solid' name='addressInfo.state' />
          <div className='text-danger mt-2'>
            <ErrorMessage name='addressInfo.state' />
          </div>
        </div>
      </div>
    </div>
  )
}

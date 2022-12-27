import {useState} from 'react'
import DatePicker from 'react-datepicker'
import {Field, ErrorMessage} from 'formik'

export const StepPersonal = () => {
  const [startDate, setStartDate] = useState(new Date())
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
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className='form-control form-control-solid'
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='sponsorAccountId' />
          </div>
        </div>
        <div className='col-6'>
          <label className='form-label mb-3'>
            <span className='required'>Gender</span>
          </label>
          <Field
            type='text'
            className='form-control form-control-solid'
            name='personalInfo.gender'
          />
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

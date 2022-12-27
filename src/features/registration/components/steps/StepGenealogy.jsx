import {Field, ErrorMessage} from 'formik'
// import {toast} from 'react-toastify'
// import {verifyAccountNumber} from '../../api'

export const StepGenealogy = () => {
  // const validateSponsorAccountNumber = async (value) => {
  //   await verifyAccountNumber(value)
  //     .then((response) => {
  //       console.log(response)
  //       toast.success(response.data.message)
  //     })
  //     .catch((err) => {
  //       toast.error(err.message)
  //     })
  // }

  // const validateParentAccountNumber = async (value) => {
  //   await verifyAccountNumber(value)
  //     .then((response) => {
  //       console.log(response)
  //       toast.success(response.data.message)
  //     })
  //     .catch((err) => {
  //       toast.error(err.message)
  //     })
  // }

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
          <div className='text-danger mt-2'>
            <ErrorMessage name='sponsorAccountId' />
          </div>
        </div>
        <div className='col-6'>
          <label className='form-label mb-3'>
            <span className='required'>Sponsor Name</span>
          </label>
          <Field
            type='tel'
            className='form-control form-control-transparent'
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
          <div className='text-danger mt-2'>
            <ErrorMessage name='parentAccountId' />
          </div>
        </div>
        <div className='col-6'>
          <label className='form-label mb-3'>
            <span className='required'>Parent Name</span>
          </label>
          <Field
            type='tel'
            className='form-control form-control-transparent'
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
          <Field type='text' className='form-control form-control-solid' name='parentSide' />
          <div className='text-danger mt-2'>
            <ErrorMessage name='parentSide' />
          </div>
        </div>
      </div>
    </div>
  )
}

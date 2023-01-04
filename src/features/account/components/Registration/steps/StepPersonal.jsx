import clsx from 'clsx'
import {useEffect, useState} from 'react'
import DatePicker from 'react-datepicker'
import {Field, ErrorMessage, useFormikContext} from 'formik'
import {verifyAccountName} from '../../../api'
import InputField from '@/components/elements/Input/InputField'
import DatePickerField from '@/components/elements/Input/DatePickerField'
import SelectField from '@/components/elements/Input/SelectField'

const genders = [
  {
    value: null,
    label: 'Select Gender',
  },
  {
    value: 'MALE',
    label: 'Male',
  },
  {
    value: 'FEMALE',
    label: 'Female',
  },
]

export const StepPersonal = (props) => {
  const {
    formField: {
      firstName,
      middleName,
      lastName,
      personalInfo: {birthdate, gender},
      contactInfo: {contactNumber},
      addressInfo: {street, city, state},
    },
  } = props
  return (
    <div className='w-100'>
      <div className='mb-5 row'>
        <div className='col-4'>
          <InputField name={firstName.name} label={firstName.label} required />
        </div>
        <div className='col-4'>
          <InputField name={middleName.name} label={middleName.label} required />
        </div>
        <div className='col-4'>
          <InputField name={lastName.name} label={lastName.label} required />
        </div>
      </div>
      <div className='mb-5 row'>
        <div className='col-6'>
          <DatePickerField name={birthdate.name} label={birthdate.label} required />
        </div>
        <div className='col-6'>
          <SelectField name={gender.name} label={gender.label} data={genders} required />
        </div>
      </div>
      <div className='mb-5 row'>
        <div className='col-12'>
          <InputField name={contactNumber.name} label={contactNumber.label} required />
        </div>
      </div>
      <div className='mb-5 row'>
        <div className='col-4'>
          <InputField name={street.name} label={street.label} required />
        </div>
        <div className='col-4'>
          <InputField name={city.name} label={city.label} required />
        </div>
        <div className='col-4'>
          <InputField name={state.name} label={state.label} required />
        </div>
      </div>
    </div>
  )
}

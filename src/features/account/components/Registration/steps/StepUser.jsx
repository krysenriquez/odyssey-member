import {useState, useRef} from 'react'
import clsx from 'clsx'
import {Field, ErrorMessage, useFormikContext} from 'formik'
import InputField from '@/components/elements/Input/InputField'
import PasswordField from '@/components/elements/Input/PasswordField'

export const StepUser = (props) => {
  const {
    formField: {
      user: {username, emailAddress, password, repeatPassword},
    },
  } = props
  const [showPassword, setShowPassword] = useState(false)
  const passwordRef = useRef(null)

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className='w-100'>
      <div className='mb-5 row fv-plugins-icon-container'>
        <div className='col-12'>
          <InputField name={username.name} label={username.label} required />
        </div>
      </div>
      <div className='mb-5 row fv-plugins-icon-container'>
        <div className='col-12'>
          <InputField name={emailAddress.name} label={emailAddress.label} required />
        </div>
      </div>
      <div className='mb-5 row fv-plugins-icon-container'>
        <div className='col-12'>
          <PasswordField name={password.name} label={password.label} required />
        </div>
      </div>
      <div className='mb-5 row fv-plugins-icon-container'>
        <div className='col-12'>
          <InputField name={repeatPassword.name} label={repeatPassword.label} required />
        </div>
      </div>
    </div>
  )
}

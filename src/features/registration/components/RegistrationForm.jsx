import clsx from 'clsx'
import {useEffect, useState} from 'react'
import {string, object, boolean, number, array, ref, date} from 'yup'
import {Formik, Form} from 'formik'
import {toast} from 'react-toastify'
import {CustomSVG} from '@/components/elements/SVG/CustomSVG'
import {useStepper} from '@/components/elements/Stepper/context'
import {useVerificationContext} from './VerificationProvider'
import {createMember} from '../api'
import {StepPackage} from './steps/StepPackage'
import {StepGenealogy} from './steps/StepGenealogy'
import {StepPersonal} from './steps/StepPersonal'
import {StepUser} from './steps/StepUser'

import {verifyAccountNumber} from '../api'

const memberSchema = [
  object().shape({}),
  object().shape({
    parentAccountId: string()
      .required()
      .label('Parent ID')
      .test('Existing Account', 'Account does not exist', (value, {options: createError}) => {
        return new Promise((resolve) => {
          verifyAccountNumber(value)
            .then((response) => {
              console.log(response)
              resolve(true)
            })
            .catch((err) => {
              console.log(err.message)
              resolve(false)
            })
        })
      }),
    parentSide: string().required().label('Parent Side'),
    sponsorAccountId: string()
      .required()
      .label('Sponsor ID')
      .test('Existing Account', 'Account does not exist', (value) => {
        return new Promise((resolve, reject) => {
          verifyAccountNumber(value)
            .then((response) => {
              console.log(response)
              toast.success(response.data.message)
              resolve(true)
            })
            .catch((err) => {
              toast.error(err.message)
              reject(true)
            })
        })
      }),
  }),
  object().shape({
    firstName: string().required().label('First Name'),
    middleName: string().required().label('Middle Name'),
    lastName: string().required().label('Last Name'),
    personalInfo: object({
      birthdate: date(),
      gender: string().required().label('Gender'),
    }),
    contactInfo: object({
      contactNumber: string().required().label('Contact Number'),
    }),
    addressInfo: object({
      street: string().required().label('Street'),
      city: string().required().label('City'),
      state: string().required().label('Province'),
    }),
  }),
  object().shape({
    user: object({
      username: string().required().label('Username'),
      emailAddress: string().required().label('Email Address'),
      password: string().required().label('Password'),
      repeatPassword: string()
        .required()
        .label('Repeat Password')
        .oneOf([ref('password'), null], 'Passwords must match'),
    }),
  }),
]
export const RegistrationForm = () => {
  const {packagePlan} = useVerificationContext()
  const {incrementCurrentStep, decrementCurrentStep, currentStep, steps, setSteps} = useStepper()
  const [currentSchema, setCurrentSchema] = useState(undefined)

  const [initialMember, setInitialMember] = useState({
    parentAccountId: '',
    parentSide: '',
    activationCode: '',
    sponsorAccountId: '',
    firstName: '',
    middleName: '',
    lastName: '',
    personalInfo: {
      birthdate: '',
      gender: '',
    },
    contactInfo: {
      contactNumber: '',
    },
    addressInfo: {
      street: '',
      city: '',
      state: '',
    },
    avatarInfo: {},
    user: {
      username: '',
      emailAddress: '',
      password: '',
      repeatPassword: '',
    },
  })

  const registrationFormSteps = [
    {
      title: 'Package',
      subTitle: 'Verify your package',
      renderComponent: () => <StepPackage packagePlan={packagePlan} />,
    },
    {
      title: 'Genealogy',
      subTitle: 'Provide  your parent and Sponsor',
      renderComponent: () => <StepGenealogy />,
    },
    {
      title: 'Personal Info',
      subTitle: 'Provide your personal info',
      renderComponent: () => <StepPersonal />,
    },
    {title: 'User', subTitle: 'Setup your user account', renderComponent: () => <StepUser />},
    {title: 'Completed', subTitle: 'Member Account created!', renderComponent: () => <h1>Test</h1>},
  ]

  useEffect(() => {
    setSteps(registrationFormSteps)
  }, [setSteps])

  useEffect(() => {
    setCurrentSchema(memberSchema[currentStep])
  }, [currentStep])

  const prevStep = () => {
    decrementCurrentStep()
  }

  const submitStep = (values, actions) => {
    if (currentStep < steps.length - 1) {
      incrementCurrentStep()
    } else {
      actions.setSubmitting(true)
      try {
        createMember(values).then((response) => {
          toast.success(response.data.message)
        })
      } catch (ex) {
        toast.error(ex.message)
      } finally {
        actions.setSubmitting(true)
      }
    }
  }

  return (
    <div
      className='stepper stepper-pills stepper-column d-flex flex-column flex-xl-row flex-row-fluid'
      id='kt_modal_create_app_stepper'
      data-stepper='true'
    >
      <div className='d-flex justify-content-center justify-content-xl-start flex-row-auto w-100 w-xl-300px mb-10'>
        <div className='stepper-nav ps-lg-10'>
          {steps.map((step, index) => {
            return (
              <div
                className={clsx('stepper-item', {
                  pending: currentStep < index,
                  current: currentStep == index,
                  completed: currentStep > index,
                })}
                data-stepper-element='nav'
                key={index}
              >
                <div className='stepper-wrapper'>
                  <div className='stepper-icon w-40px h-40px'>
                    <i className='stepper-check fas fa-check' />
                    <span className='stepper-number'>{index + 1}</span>
                  </div>
                  <div className='stepper-label'>
                    <h3 className='stepper-title'>{step.title}</h3>
                    <div className='stepper-desc'>{step.subTitle}</div>
                  </div>
                </div>
                {index != steps.length - 1 && <div className='stepper-line h-40px' />}
              </div>
            )
          })}
        </div>
      </div>
      <div className='flex-row-fluid py-lg-5 px-lg-15 mb-10'>
        <Formik
          validateOnChange={false}
          validateOnBlur={true}
          validationSchema={currentSchema}
          initialValues={initialMember}
          onSubmit={submitStep}
        >
          {(actions) => (
            <Form
              className='form fv-plugins-bootstrap5 fv-plugins-framework'
              id='registration_form'
            >
              {steps.map((step, index) => {
                if (index == currentStep) return <div key={index}>{step.renderComponent()}</div>
              })}
              <div className='d-flex flex-stack pt-10'>
                <div className='me-2'>
                  {currentStep > 0 && (
                    <button
                      type='button'
                      className='btn btn-lg btn-light-primary me-3'
                      onClick={prevStep}
                    >
                      <CustomSVG
                        path='/public/media/icons/arrows/left-arrow.svg'
                        className='svg-icon svg-icon-3 me-1'
                      />
                      Back
                    </button>
                  )}
                </div>
                <div>
                  {currentStep == steps.length - 1 && (
                    <button type='submit' className='btn btn-lg btn-primary'>
                      <span className='indicator-label'>
                        Submit
                        <CustomSVG
                          path='/public/media/icons/arrows/right-arrow.svg'
                          className='svg-icon svg-icon-3 me-1'
                        />
                      </span>
                      <span className='indicator-progress'>
                        Please wait...
                        <span className='spinner-border spinner-border-sm align-middle ms-2' />
                      </span>
                    </button>
                  )}
                  {currentStep < steps.length - 1 && (
                    <button type='submit' className='btn btn-lg btn-primary btn-light-primary'>
                      Continue
                      <CustomSVG
                        path='/public/media/icons/arrows/right-arrow.svg'
                        className='svg-icon svg-icon-3 me-1'
                      />
                    </button>
                  )}
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

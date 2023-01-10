import clsx from 'clsx'
import {useEffect, useRef, useState} from 'react'
import {Formik, Form} from 'formik'
import {toast} from 'react-toastify'
import {CustomSVG} from '@/components/elements/SVG/CustomSVG'
import {useStepper} from '@/components/elements/Stepper/context'
import {useStateProviderContext} from '@/providers/StateProvider'
import {useVerificationContext} from '../../stores/VerificationProvider'
import {useRegistrationContext} from '../../stores/RegistrationProvider'
import {useModalContext} from '@/components/elements/Modal/CustomModal'
import {useAccount} from '@/providers/AccountProvider'
import {createMember} from '../../api'
import {StepPackage} from './steps/StepPackage'
import {StepGenealogy} from './steps/StepGenealogy'
import {StepPersonal} from './steps/StepPersonal'
import {StepUser} from './steps/StepUser'
import {StepCompleted} from './steps/StepCompleted'

import registrationSchema from '../../models/Registration/registrationSchema'
import registrationFormModel from '../../models/Registration/registrationFormModel'
import registrationInitialValues from '../../models/Registration/registrationInitialValues'

export const RegistrationForm = (props) => {
  const {refresh} = useStateProviderContext()
  const {formId, formField} = registrationFormModel
  const {toggleModal} = useModalContext()
  const {node} = useRegistrationContext()
  const {currentAccount} = useAccount()
  const {packagePlan, activationCode} = useVerificationContext()
  const {incrementCurrentStep, decrementCurrentStep, currentStep, steps, setSteps} = useStepper()
  const [currentSchema, setCurrentSchema] = useState(undefined)
  const [initialMember, setInitialMember] = useState(registrationInitialValues)

  const registrationFormSteps = [
    {
      title: 'Package',
      subTitle: 'Verify your package',
      renderComponent: () => <StepPackage packagePlan={packagePlan} />,
    },
    {
      title: 'Genealogy',
      subTitle: 'Provide  your parent and Sponsor',
      renderComponent: () => <StepGenealogy formField={formField} />,
    },
    {
      title: 'Personal Info',
      subTitle: 'Provide your personal info',
      renderComponent: () => <StepPersonal formField={formField} />,
    },
    {
      title: 'User',
      subTitle: 'Setup your user account',
      renderComponent: () => <StepUser formField={formField} />,
    },
    {
      title: 'Completed',
      subTitle: 'Member Account created!',
      renderComponent: () => <StepCompleted />,
    },
  ]

  useEffect(() => {
    setSteps(registrationFormSteps)
  }, [setSteps])

  useEffect(() => {
    setCurrentSchema(registrationSchema[currentStep])
  }, [currentStep])

  useEffect(() => {
    if (activationCode) {
      setInitialMember((prevState) => {
        return {...prevState, activationCode: activationCode}
      })
    }
  }, [activationCode])

  useEffect(() => {
    if (node) {
      setInitialMember((prevState) => {
        return {
          ...prevState,
          parentAccountId: node.parentAccountNumber,
          parentAccountName: node.parentName,
          parentSide: node.parentSide,
          sponsorAccountId: currentAccount.accountNumber,
          sponsorAccountName: currentAccount.accountName,
        }
      })
    }
  }, [node])

  const prevStep = () => {
    decrementCurrentStep()
  }

  const convertDate = (date) => {
    var convertedDate =
      date.getFullYear() +
      '-' +
      ('0' + (date.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + date.getDate()).slice(-2)
    return convertedDate
  }

  const refreshPage = () => {
    refresh()
    toggleModal()
  }

  const submitStep = (values, actions) => {
    if (currentStep < steps.length - 1) {
      incrementCurrentStep()
    } else {
      actions.setSubmitting(true)
      try {
        values.personalInfo.birthdate = convertDate(values.personalInfo.birthdate)
        createMember(values).then((response) => {
          toast.success(response.data.message)
          refreshPage()
        })
      } catch (ex) {
        values.personalInfo.birthdate = new Date(values.personalInfo.birthdate)
        toast.error(ex.message)
      } finally {
        actions.setSubmitting(true)
        refreshPage()
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
          enableReinitialize
          validateOnChange={false}
          validationSchema={currentSchema}
          initialValues={initialMember}
          onSubmit={submitStep}
        >
          {({handleSubmit, handleChange, handleBlur, values, errors}) => (
            <Form className='form' id={formId}>
              {steps.map((step, index) => {
                if (index == currentStep) return <div key={index}>{step.renderComponent()}</div>
              })}
              <div className='d-flex flex-stack pt-10'>
                <div className='me-2'>
                  {currentStep == 0 && (
                    <button
                      type='button'
                      className='btn btn-lg btn-light-primary me-3'
                      onClick={() => refreshPage()}
                    >
                      <CustomSVG
                        path='/media/icons/arrows/left-arrow.svg'
                        className='svg-icon svg-icon-3 me-1'
                      />
                      Discard
                    </button>
                  )}
                  {currentStep > 0 && (
                    <button
                      type='button'
                      className='btn btn-lg btn-light-primary me-3'
                      onClick={prevStep}
                    >
                      <CustomSVG
                        path='/media/icons/arrows/left-arrow.svg'
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
                          path='/media/icons/arrows/right-arrow.svg'
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
                        path='/media/icons/arrows/right-arrow.svg'
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

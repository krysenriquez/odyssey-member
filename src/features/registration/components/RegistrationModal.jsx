import {Modal} from 'react-bootstrap'
import {VerificationForm} from './VerificationForm'
import {RegistrationForm} from './RegistrationForm'
import {StepperProvider} from '@/components/elements/Stepper/context'
import {VerificationProvider, useVerificationContext} from './VerificationProvider'
import {useEffect} from 'react'

const Form = () => {
  const {verified, packagePlan} = useVerificationContext()
  return verified ? (
    <StepperProvider>
      <RegistrationForm />
    </StepperProvider>
  ) : (
    <VerificationForm />
  )
}

export const RegistrationModal = ({isModalOpen, toggleModal}) => {
  return (
    <Modal show={isModalOpen} onHide={toggleModal} centered dialogClassName='mw-900px'>
      <Modal.Header closeButton>
        <Modal.Title>Registration</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <VerificationProvider>
          <Form />
        </VerificationProvider>
      </Modal.Body>
    </Modal>
  )
}

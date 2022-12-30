import {Modal} from 'react-bootstrap'
import {VerificationForm} from '../Verification/VerificationForm'
import {RegistrationForm} from './RegistrationForm'
import {StepperProvider} from '@/components/elements/Stepper/context'
import {VerificationProvider, useVerificationContext} from '../Verification/VerificationProvider'
import {useEffect} from 'react'

const Form = (props) => {
  const {verified, packagePlan} = useVerificationContext()
  const {toggleModal} = props

  return verified ? (
    <StepperProvider>
      <RegistrationForm handleClick={toggleModal} />
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
          <Form toggleModal={toggleModal} />
        </VerificationProvider>
      </Modal.Body>
    </Modal>
  )
}

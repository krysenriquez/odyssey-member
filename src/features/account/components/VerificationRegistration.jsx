import {VerificationForm} from './Verification/VerificationForm'
import {RegistrationForm} from './Registration/RegistrationForm'
import {StepperProvider} from '@/components/elements/Stepper/context'
import {VerificationProvider, useVerificationContext} from '../stores/VerificationProvider'

const VerificationRegistrationForm = (props) => {
  const {verified, packagePlan} = useVerificationContext()

  return verified ? (
    <StepperProvider>
      <RegistrationForm {...props} />
    </StepperProvider>
  ) : (
    <VerificationForm />
  )
}

export const VerificationRegistration = () => {
  return (
    <VerificationProvider>
      <VerificationRegistrationForm />
    </VerificationProvider>
  )
}

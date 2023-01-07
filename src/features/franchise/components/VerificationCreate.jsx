import {VerificationForm} from './Verification/VerificationForm'
import {StepperProvider} from '@/components/elements/Stepper/context'
import {VerificationProvider, useVerificationContext} from '../stores/VerificationProvider'
import {CreateFranchiseeForm} from './CreateFranchisee/CreateFranchiseeForm'

const VerificationCreateForm = (props) => {
  const {verified, packagePlan} = useVerificationContext()
  return verified ? <CreateFranchiseeForm /> : <VerificationForm />
}

export const VerificationCreate = () => {
  return (
    <VerificationProvider>
      <VerificationCreateForm />
    </VerificationProvider>
  )
}

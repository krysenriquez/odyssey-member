import {useEffect} from 'react'
import {VerificationRegistration} from '@/features/account/components/VerificationRegistration'
import {
  RegistrationProvider,
  useRegistrationContext,
} from '@/features/account/stores/RegistrationProvider'
import {CustomModal} from '@/components/elements/Modal/CustomModal'

const GenealogyCreateForm = (prop) => {
  const {node} = prop
  const {setNode} = useRegistrationContext()

  useEffect(() => {
    setNode(node)
  }, [node])

  return <VerificationRegistration />
}

export const GenealogyCreate = (prop) => {
  const {isModalOpen, toggleModal, node} = prop

  const value = {
    isModalOpen: isModalOpen,
    toggleModal: toggleModal,
    dialogClassName: 'mw-900px',
    title: 'Register',
  }

  return (
    <CustomModal {...value}>
      <RegistrationProvider>
        <GenealogyCreateForm node={node} />
      </RegistrationProvider>
    </CustomModal>
  )
}

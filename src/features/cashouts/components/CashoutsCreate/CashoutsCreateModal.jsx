import {CashoutsCreateForm} from './CashoutsCreateForm'
import {CustomModal} from '@/components/elements/Modal/CustomModal'

export const CashoutsCreateModal = (prop) => {
  const {isModalOpen, toggleModal} = prop

  const value = {
    isModalOpen: isModalOpen,
    toggleModal: toggleModal,
    dialogClassName: 'mw-600px',
    title: 'Request Cashout',
  }

  return (
    <CustomModal {...value}>
      <CashoutsCreateForm />
    </CustomModal>
  )
}

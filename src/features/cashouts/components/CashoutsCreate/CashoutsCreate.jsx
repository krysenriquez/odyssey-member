import {CashoutsCreateForm} from './CashoutsCreateForm'
import {CustomModal} from '@/components/elements/Modal/CustomModal'
import {CashoutsProvider} from '../../stores/CashoutsProvider'

export const CashoutsCreate = (prop) => {
  const {isModalOpen, toggleModal} = prop

  const value = {
    isModalOpen: isModalOpen,
    toggleModal: toggleModal,
    dialogClassName: 'mw-900px',
    title: 'Request Cashout',
  }

  return (
    <CustomModal {...value}>
      <CashoutsCreateForm />
    </CustomModal>
  )
}

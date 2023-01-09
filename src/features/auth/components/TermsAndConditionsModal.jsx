import {CustomModal} from '@/components/elements/Modal/CustomModal'

export const TermsAndConditionsModal = (prop) => {
  const {isModalOpen, toggleModal} = prop

  const value = {
    isModalOpen: isModalOpen,
    toggleModal: toggleModal,
    dialogClassName: 'mw-900px',
    title: 'Terms and Conditions',
  }

  return (
    <CustomModal {...value}>
      <></>
    </CustomModal>
  )
}

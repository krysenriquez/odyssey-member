import {CustomSVG} from '@/components/elements/SVG/CustomSVG'
import {useState} from 'react'
import {CustomModal} from '@/components/elements/Modal/CustomModal'
import {VerificationCreate} from '@/features/franchise/components/VerificationCreate'

const CreateFranchiseeModal = (prop) => {
  const {isModalOpen, toggleModal} = prop
  const value = {
    isModalOpen: isModalOpen,
    toggleModal: toggleModal,
    dialogClassName: 'mw-650px',
    title: 'Create Franchise',
  }
  return (
    <CustomModal {...value}>
      <VerificationCreate />
    </CustomModal>
  )
}

const AsideMenuFranchise = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  return (
    <>
      <div className='d-flex align-items-center flex-column w-100 mt-8 mt-lg-10'>
        <button
          className='btn btn-light-warning w-100'
          onClick={() => {
            toggleModal()
          }}
        >
          <CustomSVG
            path='/media/icons/ecommerce/cart.svg'
            className='svg-icon-1 svg-icon-2x svg-icon-primary'
          />
          Register Franchise
        </button>
      </div>
      {isModalOpen && <CreateFranchiseeModal isModalOpen={isModalOpen} toggleModal={toggleModal} />}
    </>
  )
}

export {AsideMenuFranchise}

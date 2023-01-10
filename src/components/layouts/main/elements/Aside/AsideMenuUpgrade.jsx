import {CustomSVG} from '@/components/elements/SVG/CustomSVG'
import {useState} from 'react'
import {CustomModal} from '@/components/elements/Modal/CustomModal'
import {UpgradeForm} from '@/features/account/components/Upgrade/UpgradeForm'

const UpgradeModal = (prop) => {
  const {isModalOpen, toggleModal} = prop
  const value = {
    isModalOpen: isModalOpen,
    toggleModal: toggleModal,
    dialogClassName: 'mw-900px',
    title: 'Upgrade',
  }
  return (
    <CustomModal {...value}>
      <UpgradeForm />
    </CustomModal>
  )
}

const AsideMenuUpgrade = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  return (
    <>
      <div className='d-flex align-items-center flex-column w-100 mb-8 mb-lg-10'>
        <button
          className='btn btn-light-primary w-100'
          onClick={() => {
            toggleModal()
          }}
        >
          <CustomSVG
            path='/media/icons/arrows/double-caret-up.svg'
            className='svg-icon-1 svg-icon-2x svg-icon-primary'
          />
          Upgrade Account
        </button>
      </div>
      {isModalOpen && <UpgradeModal isModalOpen={isModalOpen} toggleModal={toggleModal} />}
    </>
  )
}

export {AsideMenuUpgrade}

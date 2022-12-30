import {CustomSVG} from '@/components/elements/SVG/CustomSVG'
import {useState} from 'react'
import {Modal} from 'react-bootstrap'
import {UpgradeForm} from '@/features/account/components/Upgrade/UpgradeForm'

const RegistrationModal = ({isModalOpen, toggleModal}) => {
  return (
    <Modal show={isModalOpen} onHide={toggleModal} centered dialogClassName='mw-900px'>
      <Modal.Header closeButton>
        <Modal.Title>Upgrade</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <UpgradeForm handleClick={toggleModal} />
      </Modal.Body>
    </Modal>
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
            path='/public/media/icons/general/small-star.svg'
            className='svg-icon-1 svg-icon-2x svg-icon-primary'
          />
          Upgrade Account
        </button>
      </div>
      {isModalOpen && <RegistrationModal isModalOpen={isModalOpen} toggleModal={toggleModal} />}
    </>
  )
}

export {AsideMenuUpgrade}

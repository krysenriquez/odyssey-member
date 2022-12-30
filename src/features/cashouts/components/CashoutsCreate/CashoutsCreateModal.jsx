import {Modal} from 'react-bootstrap'
import {useWallet, WalletProvider} from '@/features/wallets/store/WalletProvider'
import {useEffect, useMemo} from 'react'
import {CustomCard} from '@/components/elements/Card'
import {CashoutsCreateForm} from './CashoutsCreateForm'

export const CashoutsCreateModal = ({isModalOpen, toggleModal}) => {
  return (
    <Modal show={isModalOpen} onHide={toggleModal} centered dialogClassName='mw-900px'>
      <Modal.Header closeButton>
        <Modal.Title>Request Cashout</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <WalletProvider>
          <CustomCard resetSidePaddings={true}>
            <CashoutsCreateForm handleClick={toggleModal} />
          </CustomCard>
        </WalletProvider>
      </Modal.Body>
    </Modal>
  )
}

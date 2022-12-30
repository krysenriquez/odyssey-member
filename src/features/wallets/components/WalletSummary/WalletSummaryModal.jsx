import {Modal} from 'react-bootstrap'
import {useWallet} from '@/features/wallets/store/WalletProvider'
import {useEffect, useMemo} from 'react'
import {walletSummaryColumn} from './WalletSummaryColumn'
import {CustomCard} from '@/components/elements/Card'
import {CustomTable} from '@/components/elements/Table/CustomTable'
import {TableLoading} from '@/components/elements/Table/TableLoading'

const WalletSummary = () => {
  const {walletSummary} = useWallet()

  const tableData = useMemo(() => walletSummary, [walletSummary])
  const tableColumns = useMemo(() => walletSummaryColumn, [])
  return (
    <>
      <CustomCard resetSidePaddings={true}>
        <CustomTable
          {...{
            data: tableData,
            columns: tableColumns,
          }}
        />
        {!tableData && <TableLoading />}
      </CustomCard>
    </>
  )
}

export const WalletSummaryModal = ({isModalOpen, toggleModal}) => {
  return (
    <Modal show={isModalOpen} onHide={toggleModal} centered dialogClassName='mw-900px'>
      <Modal.Header closeButton>
        <Modal.Title>Wallet Summary</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <WalletSummary />
      </Modal.Body>
    </Modal>
  )
}

import {useWallet} from '@/features/wallets/stores/WalletProvider'
import {useEffect, useMemo} from 'react'
import {walletSummaryColumn} from './WalletSummaryColumn'
import {CustomModal} from '@/components/elements/Modal/CustomModal'
import {CustomCard} from '@/components/elements/Card'
import {CustomTable2} from '@/components/elements/Table/CustomTable2'
import {TableLoading} from '@/components/elements/Table/TableLoading'
import {toPointValue} from '@/utils/toCurrency'

export const WalletSummary = () => {
  const {walletSummary} = useWallet()

  const tableData = useMemo(() => walletSummary, [walletSummary])
  const tableColumns = useMemo(() => walletSummaryColumn, [])
  return (
    <>
      <CustomCard resetSidePaddings={true}>
        <CustomTable2
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

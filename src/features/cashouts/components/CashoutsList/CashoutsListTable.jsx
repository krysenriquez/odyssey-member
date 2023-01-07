import {useState, useMemo} from 'react'
import {CustomCard} from '@/components/elements/Card'
import {CustomTable2} from '@/components/elements/Table/CustomTable2'
import {TableLoading} from '@/components/elements/Table/TableLoading'
import {
  useCashoutsListQueryData,
  useCashoutsListQueryLoading,
} from '../../stores/CashoutsListQueryProvider'
import {cashoutsColumn} from './CashoutsColumn'
import {CashoutsProvider} from '@/features/cashouts/stores/CashoutsProvider'
import {CashoutsCreateModal} from '../CashoutsCreate/CashoutsCreateModal'

export const CashoutsListTable = () => {
  const cashouts = useCashoutsListQueryData()
  const isLoading = useCashoutsListQueryLoading()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const tableData = useMemo(() => cashouts, [cashouts])
  const tableColumns = useMemo(() => cashoutsColumn, [])

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  return (
    <>
      <CustomCard>
        <CustomTable2
          {...{
            data: tableData,
            columns: tableColumns,
            hasToolbar: true,
            toolbarButtonName: 'Request Cashout',
            handletoolbarButtonClick: toggleModal,
          }}
        />
        {isLoading && <TableLoading />}
        {isModalOpen && (
          <CashoutsProvider>
            <CashoutsCreateModal isModalOpen={isModalOpen} toggleModal={toggleModal} />
          </CashoutsProvider>
        )}
      </CustomCard>
    </>
  )
}

import {useState, useMemo} from 'react'
import {useNavigate} from 'react-router-dom'
import {PageTitle} from '@/providers/PageDataProvider'
import {CustomCard} from '@/components/elements/Card'
import {CustomTable} from '@/components/elements/Table/CustomTable'
import {TableLoading} from '@/components/elements/Table/TableLoading'
import {
  CashoutsListQueryProvider,
  useCashoutsListQueryData,
  useCashoutsListQueryLoading,
} from './CashoutsListQueryProvider'
import {cashoutsColumn} from './CashoutsColumn'
import {CashoutsCreateModal} from '../CashoutsCreate/CashoutsCreateModal'

const CodesListPage = () => {
  const navigate = useNavigate()
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
        <CustomTable
          {...{
            data: tableData,
            columns: tableColumns,
            hasToolbar: true,
            toolbarButtonName: 'Request Cashout',
            handletoolbarButtonClick: toggleModal,
          }}
        />
        {isLoading && <TableLoading />}
        {isModalOpen && <CashoutsCreateModal isModalOpen={isModalOpen} toggleModal={toggleModal} />}
      </CustomCard>
    </>
  )
}

const CodesListWrapper = () => {
  return (
    <>
      <CashoutsListQueryProvider>
        <CodesListPage />
      </CashoutsListQueryProvider>
    </>
  )
}

export {CodesListWrapper}

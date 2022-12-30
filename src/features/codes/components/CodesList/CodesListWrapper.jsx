import {useState, useMemo} from 'react'
import {useNavigate} from 'react-router-dom'
import {PageTitle} from '@/providers/PageDataProvider'
import {CustomCard} from '@/components/elements/Card'
import {CustomTable} from '@/components/elements/Table/CustomTable'
import {TableLoading} from '@/components/elements/Table/TableLoading'
import {
  CodesListQueryProvider,
  useCodesListQueryData,
  useCodesListQueryLoading,
} from './CodesListQueryProvider'
import {codesColumn} from './CodesColumn'

const CodesListPage = () => {
  const navigate = useNavigate()
  const codes = useCodesListQueryData()
  const isLoading = useCodesListQueryLoading()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const tableData = useMemo(() => codes, [codes])
  const tableColumns = useMemo(() => codesColumn, [])

  return (
    <>
      <CustomCard>
        <CustomTable
          {...{
            data: tableData,
            columns: tableColumns,
          }}
        />
        {isLoading && <TableLoading />}
      </CustomCard>
    </>
  )
}

const CodesListWrapper = () => {
  return (
    <>
      <CodesListQueryProvider>
        <CodesListPage />
      </CodesListQueryProvider>
    </>
  )
}

export {CodesListWrapper}

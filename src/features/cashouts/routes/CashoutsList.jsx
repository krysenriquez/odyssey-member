import {useAccount} from '@/providers/AccountProvider'
import {CashoutsListQueryProvider} from '../stores/CashoutsListQueryProvider'
import {CashoutsListTable} from '../components/CashoutsList/CashoutsListTable'

export const CashoutsList = () => {
  const {currentAccount} = useAccount()

  if (!currentAccount) return null

  return (
    <CashoutsListQueryProvider>
      <CashoutsListTable />
    </CashoutsListQueryProvider>
  )
}

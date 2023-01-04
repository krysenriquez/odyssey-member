import {useAccount} from '@/providers/AccountProvider'
import {CodesListQueryProvider} from '../stores/CodesListQueryProvider'
import {CodesListTable} from '../components/CodesList/CodesListTable'

export const CodesList = () => {
  const {currentAccount} = useAccount()

  if (!currentAccount) return null

  return (
    <CodesListQueryProvider>
      <CodesListTable />
    </CodesListQueryProvider>
  )
}

import {useAccount} from '@/providers/AccountProvider'
import {GenealogyRequestProvider} from '../stores/GenealogyRequestProvider'
import {GenealogyQueryProvider} from '../stores/GenealogyQueryProvider'
import {GenealogyTree} from '../components/Genealogy'

export const Genealogy = () => {
  const {currentAccount} = useAccount()

  if (!currentAccount) return null

  return (
    <GenealogyRequestProvider>
      <GenealogyQueryProvider>
        <GenealogyTree />
      </GenealogyQueryProvider>
    </GenealogyRequestProvider>
  )
}

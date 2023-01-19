import {useAccount} from '@/providers/AccountProvider'
import {GenealogyRequestProvider} from '../stores/GenealogyRequestProvider'
import {GenealogyQueryProvider} from '../stores/GenealogyQueryProvider'
import {GenealogyTree} from '../components/Genealogy'
import {GenealogyDeeTree} from '../components/GenealogyD3'

export const Genealogy = () => {
  const {currentAccount} = useAccount()

  if (!currentAccount) return null

  return (
    <GenealogyRequestProvider>
      <GenealogyQueryProvider>
        <GenealogyDeeTree />
      </GenealogyQueryProvider>
    </GenealogyRequestProvider>
  )
}

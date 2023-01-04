import {CashoutsProvider} from '@/features/cashouts/stores/CashoutsProvider'
import {RequestCashout} from '@/features/cashouts/components/CashoutsCreate/RequestCashout'

export const Cashout = () => {
  return (
    <CashoutsProvider>
      <RequestCashout />
    </CashoutsProvider>
  )
}

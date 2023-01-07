import {ActivityProvider} from '@/features/activities/stores/ActivityProvider'
import {WalletProvider} from '@/features/wallets/stores/WalletProvider'
import {ActivitySummaryTotal} from './widgets/ActivitySummaryTotal'
import {ActivitySummaryCount} from './widgets/ActivitySummaryCount'
import {PointValueWallets} from './widgets/PointValueWallets'
import {PrimaryWallets} from './widgets/PrimaryWallets'
import {Cashout} from './widgets/Cashout'

const DashboardPage = () => {
  return (
    <>
      <WalletProvider>
        <ActivityProvider>
          <div className='card-deck'>
            <div className='row g-5 g-xl-10 mb-5 mb-xl-10'>
              <div className='col-xxl-8'>
                <PrimaryWallets />
              </div>
              <div className='col-xxl-4'>
                <Cashout />
              </div>
            </div>
          </div>
          <div className='row g-5 g-xl-8 mb-5 mb-xl-10'>
            <div className='col-xl-4'>
              <PointValueWallets />
            </div>
            <div className='col-xl-4'>
              <ActivitySummaryCount />
            </div>
            <div className='col-xl-4'>
              <ActivitySummaryTotal />
            </div>
          </div>
        </ActivityProvider>
      </WalletProvider>
    </>
  )
}

const DashboardWrapper = () => {
  return (
    <>
      <DashboardPage />
    </>
  )
}

export {DashboardWrapper}

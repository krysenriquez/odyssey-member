import {useEffect} from 'react'
import {useIntl} from 'react-intl'
import {ActivityTotalAmount} from './widgets/ActivityTotalAmount'
import {ActivityProvider} from '@/features/activities/store/ActivityProvider'
import {PointValueWallets} from './widgets/PointValueWallets'
import {PrimaryWallets} from './widgets/PrimaryWallets'
import {WalletProvider} from '@/features/wallets/store/WalletProvider'
import {RequestCashout} from './widgets/RequestCashout'
const DashboardPage = () => {
  return (
    <>
      <WalletProvider>
        <div className='row g-5 g-xl-10 mb-5 mb-xl-10'>
          <div className='col-xxl-12'>
            <PrimaryWallets />
          </div>
          {/* <div className='col-xxl-4'>
            <RequestCashout />
          </div> */}
        </div>
        <PointValueWallets />
      </WalletProvider>
      <div className='row gx-5 gx-xl-10'>
        <div className='col-xl-5 mb-5 mb-xl-0'>
          <ActivityProvider>
            <ActivityTotalAmount />
          </ActivityProvider>
        </div>
      </div>
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

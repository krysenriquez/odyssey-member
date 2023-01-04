import clsx from 'clsx'
import {useIntl} from 'react-intl'
import {useWallet} from '@/features/wallets/stores/WalletProvider'
import {toPointValue} from '@/utils/toCurrency'

const AsideMenuStats = () => {
  const intl = useIntl()
  const {pvWallets} = useWallet()
  return (
    <>
      <div className='d-flex mb-8 mb-lg-10 gap-3'>
        {pvWallets ? (
          pvWallets
            .filter((pvWallet) => pvWallet.wallet !== 'PV_TOTAL_WALLET')
            .map((pvWallet) => {
              return (
                <div
                  className='border border-gray-300 border-dashed rounded  min-w-100px w-100 py-2 px-4'
                  key={pvWallet.wallet}
                >
                  <span className='fs-6 text-gray-500 fw-bold'>
                    {intl.formatMessage({id: pvWallet.walletDisplay})}
                  </span>
                  <div className={clsx('fs-4 fw-bold text-success')}>
                    {toPointValue(pvWallet.total)}
                  </div>
                </div>
              )
            })
        ) : (
          <></>
        )}
      </div>
    </>
  )
}

export {AsideMenuStats}
